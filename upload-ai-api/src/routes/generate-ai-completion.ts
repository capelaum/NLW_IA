import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { openai } from '../lib/openai'
import { prisma } from '../lib/prisma'

export async function generateAICompletionRoute(app: FastifyInstance) {
  app.post('/ai/completion', async (request, reply) => {
    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    try {
      const { videoId, template, temperature } = bodySchema.parse(request.body)

      const video = await prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
      })

      if (!video.transcription) {
        return reply.status(400).send({
          error: 'Video transcription was not generated yet.',
        })
      }

      const promptMessage = template.replace(
        '{transcription}',
        video.transcription
      )

      const response = openai.chat.completions.create({
        model: 'gpt-3.5-turbo-16k',
        temperature,
        messages: [
          {
            role: 'user',
            content: promptMessage,
          },
        ],
      })

      return response
    } catch (error) {
      return reply.status(500).send({
        error: error.message,
        message: 'Could not generate AI completion prompt',
      })
    }
  })
}
