import { useForm } from '@/contexts/form-context'
import { api } from '@/lib/axios'
import { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

interface Prompt {
  id: string
  title: string
  template: string
}

export function PromptSelect() {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  const { setInput } = useForm()

  useEffect(() => {
    api.get('/prompts').then((response) => setPrompts(response.data))
  }, [])

  function handlePromptSelectd(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId)

    if (!selectedPrompt) {
      return
    }

    setInput(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelectd}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
