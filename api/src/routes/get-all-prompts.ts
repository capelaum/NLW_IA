import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function getAllPromptsRoute(app: FastifyInstance) {
  app.get('/prompts', async (req, reply) => {
    try {
      const prompts = await prisma.prompt.findMany()

      return prompts
    } catch (error) {
      return reply.status(500).send({
        error: error.message,
        message: 'Could not fetch prompts',
      })
    }
  })
}
