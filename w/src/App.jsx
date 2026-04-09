import React from 'react'
import Mainroute from './routes/Mainroute'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  // tanstack query get => useQuery
  // tanstack query post, delete, put => useMutation
  const {theme} = useThemeStore()
  return (
    <div data-theme={theme} >
      <Mainroute/>
    </div>
  )
}

export default App