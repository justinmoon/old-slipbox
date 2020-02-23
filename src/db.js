import PouchDB from 'pouchdb-browser'
import { writable } from 'svelte/store';

export let db = new PouchDB('db')
export let notes = writable([])

export const replication = PouchDB.sync('db', 'http://localhost:5984/slipbox', {
  live: true,
  retry: true
}).on('change', async function (info) {
  await updateNotes()
}).on('error', function (err) {
  console.log('Replication error:', err)
})

export async function updateNotes() {
  const allDocs = await db.allDocs({
    include_docs: true
  })
  notes.update(n => allDocs.rows.map(row => row.doc))
}

export async function addNote(text) {
  const note = {
    text,
    createdAt: new Date().toISOString()
  }
  const addition = await db.post(note)
  if (addition.ok) {
    await updateNotes()
  }
}
