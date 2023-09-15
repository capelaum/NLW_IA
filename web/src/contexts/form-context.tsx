import { useCompletion } from 'ai/react'
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

interface FormProviderProps {
  children: ReactNode
}

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'

const pendingStatus = ['converting', 'uploading', 'generating']

interface FormContextData {
  videoId: string | null
  setVideoId: Dispatch<SetStateAction<string | null>>
  temperature: number
  setTemperature: Dispatch<SetStateAction<number>>
  videoFile: File | null
  setVideoFile: Dispatch<SetStateAction<File | null>>
  transcriptionPrompt: string
  setTranscriptionPrompt: Dispatch<SetStateAction<string>>
  status: Status
  setStatus: Dispatch<SetStateAction<Status>>
  isVideouploadButtonDisabled: boolean
  isGeneratePromptButtonDisabled: boolean
  input: string
  setInput: Dispatch<SetStateAction<string>>
  handleInputChange: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  completion: string
  isAICompletionLoading: boolean
}

const FormContext = createContext<FormContextData>({} as FormContextData)

export function FormProvider({ children }: FormProviderProps) {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState(0.5)

  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [transcriptionPrompt, setTranscriptionPrompt] = useState('')
  const [status, setStatus] = useState<Status>('waiting')

  const isVideouploadButtonDisabled =
    !videoFile || !transcriptionPrompt || pendingStatus.includes(status)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading: isAICompletionLoading
  } = useCompletion({
    api: 'http://localhost:3333/ai/completion',
    body: {
      videoId,
      temperature
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const isGeneratePromptButtonDisabled =
    isVideouploadButtonDisabled || !videoId || isAICompletionLoading

  return (
    <FormContext.Provider
      value={{
        input,
        setInput,
        handleInputChange,
        handleSubmit,
        completion,
        videoId,
        setVideoId,
        temperature,
        setTemperature,
        videoFile,
        setVideoFile,
        transcriptionPrompt,
        setTranscriptionPrompt,
        status,
        setStatus,
        isVideouploadButtonDisabled,
        isGeneratePromptButtonDisabled,
        isAICompletionLoading
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useForm = (): FormContextData => useContext(FormContext)
