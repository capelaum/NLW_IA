import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAICompletionRoute } from './routes/generate-ai-completion'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

const app = fastify()
const port = 3333

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAICompletionRoute)

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`HTTP Server is running on port ${port}!`)
  })
