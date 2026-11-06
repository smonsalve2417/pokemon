import { useState, type FormEvent } from 'react'
import type { Notify } from '../types'
import ConfirmDialog from './ConfirmDialog'

interface Values { name: string; email: string; message: string }
const empty: Values = { name: '', email: '', message: '' }

function validate(v: Values): Partial<Values> {
  const e: Partial<Values> = {}
  if (v.name.trim().length < 2) e.name = 'El nombre debe tener al menos 2 caracteres'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Ingresa un email válido (debe contener @ y .)'
  if (v.message.trim().length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres'
  return e
}

export default function ContactForm({ onNotify }: { onNotify: Notify }) {
  const [values, setValues] = useState<Values>(empty)
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [confirming, setConfirming] = useState(false)
  const errors = validate(values)
  const invalid = Object.keys(errors).length > 0

  const field = (k: keyof Values) => ({
    id: k,
    name: k,
    value: values[k],
    onChange: (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    'aria-invalid': !!(touched[k] && errors[k]),
    'aria-describedby': `${k}-err`,
    className: `w-full rounded-md border bg-slate-50 px-3 py-2 text-sm ${touched[k] && errors[k] ? 'border-red-600' : 'border-slate-300'}`,
  })
  const label = (k: keyof Values, text: string) => <label htmlFor={k} className="mb-1 block text-xs font-medium">{text}</label>
  const err = (k: keyof Values) => <p id={`${k}-err`} className="mt-1 min-h-4 text-[11px] text-red-600">{touched[k] ? errors[k] : ''}</p>

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!invalid) setConfirming(true)
  }

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-2 rounded-xl bg-white p-6 shadow">
        <div>{label('name', 'Nombre')}<input type="text" {...field('name')} />{err('name')}</div>
        <div>{label('email', 'Email')}<input type="email" placeholder="tu@correo.com" {...field('email')} />{err('email')}</div>
        <div>{label('message', 'Mensaje')}<textarea rows={4} placeholder="Escribe tu mensaje aquí..." {...field('message')} />{err('message')}</div>
        <button type="submit" disabled={invalid} className="w-full rounded-md bg-red-500 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
          Enviar mensaje
        </button>
      </form>
      <ConfirmDialog
        open={confirming}
        title="¿Enviar el mensaje?"
        message={<>Se enviará como <strong>{values.name}</strong> ({values.email}).</>}
        confirmText="Enviar"
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false)
          setValues(empty)
          setTouched({})
          onNotify('success', 'Mensaje enviado correctamente')
        }}
      />
    </>
  )
}
