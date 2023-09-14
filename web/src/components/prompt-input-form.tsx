import { Wand2 } from 'lucide-react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Separator } from './ui/separator'
import { Slider } from './ui/slider'

export function PromptInputForm() {
  return (
    <form className="space-y-5">
      <div className="space-y-2">
        <Label>Prompt</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="title">Título do Youtube</SelectItem>
            <SelectItem value="description">Descrição do Youtube</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Modelo</Label>
        <Select defaultValue="gpt-3.5" disabled>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="gpt-3.5">GPT 3.5-turbo 16k</SelectItem>
          </SelectContent>
        </Select>

        <span className="block text-xs italic text-muted-foreground">
          Você poderá customizar essa opção em breve
        </span>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Temperatura</Label>

        <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />

        <span className="block text-xs italic leading-relaxed text-muted-foreground">
          Valores mais altos tendem a deixar o resultado mais criativo, porém
          com mais chances de erros
        </span>
      </div>

      <Separator />

      <Button type="submit" className="w-full">
        <Wand2 className="mr-2 h-4 w-4" />
        Executar
      </Button>
    </form>
  )
}
