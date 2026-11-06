import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ToastContainer from './components/ToastContainer'
import type { Notify, PokemonSummary, Toast } from './types'
import Contact from './pages/Contact'
import Detail from './pages/Detail'
import Explore from './pages/Explore'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { capitalize } from './utils'

// App está por encima de <Routes>: su estado NO se pierde al cambiar de ruta.
export default function App() {
  const [favorites, setFavorites] = useState<PokemonSummary[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = (id: number) => setToasts((t) => t.filter((x) => x.id !== id))

  const notify: Notify = (type, message) => {
    const id = Date.now() + Math.random()
    setToasts((t) => [...t, { id, type, message }])
    setTimeout(() => dismiss(id), 3000) // auto-dismiss
  }

  const onAdd = (p: PokemonSummary) => {
    setFavorites((prev) => (prev.some((f) => f.id === p.id) ? prev : [...prev, p]))
    notify('success', `${capitalize(p.name)} agregado a favoritos`)
  }

  const onRemove = (p: PokemonSummary) => {
    setFavorites((prev) => prev.filter((f) => f.id !== p.id))
    notify('info', `${capitalize(p.name)} quitado de favoritos`)
  }

  const fav = { favorites, onAdd, onRemove }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar favoritesCount={favorites.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home onNotify={notify} />} />
          <Route path="/explorar" element={<Explore {...fav} />} />
          <Route path="/explorar/:id" element={<Detail {...fav} />} />
          <Route path="/favoritos" element={<Favorites {...fav} />} />
          <Route path="/contacto" element={<Contact onNotify={notify} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
