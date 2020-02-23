<script>
  import { onMount } from 'svelte'
  import PouchDB from 'pouchdb-browser'

  let db = new PouchDB('db')
  let text = ''
  let notes = []

  async function updateNotes() {
    const allDocs = await db.allDocs({
      include_docs: true
    })
    notes = allDocs.rows.map(row => row.doc)
  }
  async function addNote(event) {
    const note = {
      text,
      createdAt: new Date().toISOString()
    }
    const addition = await db.post(note)
    if (addition.ok) {
      await updateNotes()
    }
    text = ''
  }
  onMount(async () => {
    await updateNotes()
  })
</script>

<main>
	<p># Notes: {notes.length}</p>
	<form on:submit|preventDefault={addNote}>
		<textarea bind:value={text} cols="80" rows="30"></textarea>
		<button type='submit'>➕ Create Note</button>
	</form>
</main>

<style>
	main {
		text-align: center;
		margin: 0 auto;
	}
	textarea {
		margin: 35px 35px 35px 35px;
	}
</style>