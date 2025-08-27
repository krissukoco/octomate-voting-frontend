import { AuthContextProvider } from './context/auth'
import AppRoutes from './routes'

import './App.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <AuthContextProvider>
      <Toaster />
      <AppRoutes />
    </AuthContextProvider>
  )
}

export default App
