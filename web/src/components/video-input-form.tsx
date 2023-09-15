import { loadFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { FileVideo, Upload } from 'lucide-react'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  async function convertVideoToAudio(video: File) {
    console.log('Convert Started')

    const videoName = video.name.split('.')[0]

    const ffmpeg = await loadFFmpeg()
    await ffmpeg.writeFile(video.name, await fetchFile(video))

    /* ffmpeg.on('log', (log) => {
      console.log(log)
    }) */

    ffmpeg.on('progress', (progress) => {
      console.log('Convert progress:', Math.round(progress.progress) * 100)
    })

    const audioOutput = 'output.mp3'

    await ffmpeg.exec([
      '-i',
      video.name,
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      audioOutput
    ])

    const data = await ffmpeg.readFile(audioOutput)

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], `${videoName}.mp3`, {
      type: 'audio/mpeg'
    })

    console.log('Conversion Finished!')

    return audioFile
  }

  async function handleUploadVideo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!videoFile || !prompt) {
      return
    }

    const audioFile = await convertVideoToAudio(videoFile)

    console.log(audioFile, prompt)
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <form className="space-y-5" onSubmit={handleUploadVideo}>
      <label
        htmlFor="video"
        title="Carregar vídeo"
        className="relative flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground transition-all duration-200 hover:cursor-pointer hover:border-rose-400 hover:bg-primary/5 hover:text-rose-400"
      >
        {previewUrl ? (
          <video
            src={previewUrl}
            controls={false}
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        ) : (
          <>
            <FileVideo className="h-4 w-4" />
            Seleciona um vídeo
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          id="transcription_prompt"
          className="max-h-[200px] min-h-[100px] text-sm leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!videoFile || !prompt}
        title="Carregar vídeo"
      >
        <Upload className="mr-2 h-4 w-4" />
        Carregar vídeo
      </Button>
    </form>
  )
}
