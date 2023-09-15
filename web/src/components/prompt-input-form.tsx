import { useForm } from '@/contexts/form-context'
import { Loader2, Wand2 } from 'lucide-react'
import { PromptSelect } from './prompt-select'
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
  const {
    temperature,
    setTemperature,
    isGeneratePromptButtonDisabled,
    handleSubmit,
    isAICompletionLoading
  } = useForm()

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label>Prompt</Label>
        <PromptSelect />
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

      <div className="relative space-y-4">
        <Label className="flex justify-between">
          Temperatura
          <span className="text-sm font-semibold text-muted-foreground">
            {temperature}
          </span>
        </Label>

        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => setTemperature(value[0])}
        />

        <span className="block text-xs italic leading-relaxed text-muted-foreground">
          Valores mais altos tendem a deixar o resultado mais criativo, porém
          com mais chances de erros
        </span>
      </div>

      <Separator />

      <Button
        type="submit"
        className="w-full"
        disabled={isGeneratePromptButtonDisabled}
      >
        {isAICompletionLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Executar
      </Button>
    </form>
  )
}
