import { Routes, Route, Link } from 'react-router-dom'
import Recipes from './pages/Recipes'
import Create from './pages/Create'
import { Cook } from './pages/Cook'
import NotFound from './pages/NoteFound'
import { Box } from '@mui/material'


function App() {
  return (
    <Box >
      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/create" element={<Create />} />
        <Route path="/cook/:id" element={<Cook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  )
}

export default App
