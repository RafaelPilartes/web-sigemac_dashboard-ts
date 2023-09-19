import { AppProvider } from './provider/AppProvider'
import { Router } from './routes/Routes'

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}

export default App
