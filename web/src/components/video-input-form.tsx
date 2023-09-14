import { FileVideo, Upload } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Separator } from './ui/separator'
import { Textarea } from './ui/textarea'

export function VideoInputForm() {
  return (
    <form className="space-y-5">
      <label
        htmlFor="video"
        title="Carregar vídeo"
        className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed text-sm text-muted-foreground transition-all duration-200 hover:cursor-pointer hover:border-rose-400 hover:bg-primary/5 hover:text-rose-400"
      >
        <FileVideo className="h-4 w-4" />
        Seleciona um vídeo
      </label>

      <input type="file" id="video" accept="video/mp4" className="sr-only" />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

        <Textarea
          id="transcription_prompt"
          className="max-h-[200px] min-h-[100px] text-sm leading-relaxed"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button type="submit" className="w-full">
        <Upload className="mr-2 h-4 w-4" />
        Carregar vídeo
      </Button>
    </form>
  )
}
