const API_BASE = '/api/notes'

export interface Note {
  id?: string
  title: string
  content: string
  category: string
  updatedAt?: string
}

// PUBLIC_INTERFACE
export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE}`)
  if (!res.ok) return []
  return await res.json()
}

// PUBLIC_INTERFACE
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/categories`)
  if (!res.ok) return []
  return await res.json()
}

// PUBLIC_INTERFACE
export async function createNote(note: Note): Promise<Note | null> {
  const res = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
  if (res.ok) return await res.json()
  return null
}

// PUBLIC_INTERFACE
export async function updateNote(note: Note): Promise<Note | null> {
  if (!note.id) throw new Error('Note must have id for update')
  const res = await fetch(`${API_BASE}/${note.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })
  if (res.ok) return await res.json()
  return null
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  })
  return res.ok
}
