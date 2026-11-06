import ContactForm from '../components/ContactForm'
import type { Notify } from '../types'

export default function Contact({ onNotify }: { onNotify: Notify }) {
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-extrabold">Contacto</h1>
      <p className="mb-6 mt-1 text-xs text-slate-500">¿Tienes preguntas o sugerencias? Envíanos un mensaje.</p>
      <ContactForm onNotify={onNotify} />
    </div>
  )
}
