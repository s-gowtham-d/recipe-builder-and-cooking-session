import { Routes, Route, Link } from 'react-router-dom'
import Recipes from './pages/Recipes'
import { Create } from './pages/Create'
import { Cook } from './pages/Cook'
import NotFound from './pages/NoteFound'


function App() {
  return (
    <div>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '10px',
          background: '#f0f0f0',
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/create">create</Link>
        <Link to="/cook/:id">Cook</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Recipes />} />
        <Route path="/create" element={<Create />} />
        <Route path="/cook/:id" element={<Cook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
