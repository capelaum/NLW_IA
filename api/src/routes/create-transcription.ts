import { FastifyInstance } from 'fastify'
import { createReadStream } from 'node:fs'
import { z } from 'zod'
import { openai } from '../lib/openai'
import { prisma } from '../lib/prisma'

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post('/videos/:videoId/transcription', async (request, reply) => {
    const paramsSchema = z.object({
      videoId: z.string().uuid(),
    })

    const bodySchema = z.object({
      prompt: z.string(),
    })

    try {
      const { videoId } = paramsSchema.parse(request.params)
      const { prompt } = bodySchema.parse(request.body)

      const video = await prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
      })

      const videoPath = video.path
      const audioReadStream = createReadStream(videoPath)

      const response = await openai.audio.transcriptions.create({
        file: audioReadStream,
        model: 'whisper-1',
        language: 'pt',
        response_format: 'json',
        temperature: 0.5,
        prompt,
      })

      const transcription = response.text

      await prisma.video.update({
        where: {
          id: videoId,
        },
        data: {
          transcription,
        },
      })

      return { transcription }
    } catch (error) {
      return reply.status(500).send({
        error: error.message,
        message: 'Could not generate transcription for video file',
      })
    }
  })
}
