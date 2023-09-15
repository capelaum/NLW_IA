import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import { FormProvider } from './contexts/form-context.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FormProvider>
      <App />
    </FormProvider>
  </React.StrictMode>
)
