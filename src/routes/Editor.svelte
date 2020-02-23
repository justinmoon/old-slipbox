<script>
  import { addNote } from '../db.js'

  let text = ''

  async function addNoteAndReset() {
      await addNote(text)
      text = ''
  }
</script>

<main>
	<form on:submit|preventDefault={addNoteAndReset}>
		<textarea bind:value={text} cols="80" rows="30"></textarea>
		<button type='submit'>➕ Create Note</button>
	</form>
</main>

<style>
	textarea {
		margin: 35px 35px 35px 35px;
	}
</style>