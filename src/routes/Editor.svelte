<script>
  import { addNote } from '../db.js'
  import { insertAtCursor, getId } from '../utils.js'
  import { onMount } from 'svelte'
  import Search from '../components/Search.svelte'
  import { navigate } from "svelte-routing";

  let textarea
  let text = ''
  let prevChar = ''
  let cursorPosition = 0
  let searching = false

  async function addNoteAndReset() {
      await addNote(text)
      text = ''
  }

  onMount(async () => {
    textarea = document.getElementById ("editor");
    textarea.addEventListener ("keyup", function (event) {
      // 
      cursorPosition = this.selectionStart - 1
      const current = this.value[cursorPosition]
      if (prevChar === '[' && current == '[') {
        prevChar = ''
        searching = true
      } else {
        prevChar = current
      }

      // f1 navigates links
      if (event.keyCode === 112) {
        const id = getId(this.value, cursorPosition)
        if (id && id.length === 36) {
          navigate(`/notes/${id}`)
        }
        console.log(id)
      }

    });
  })

  function onSelectNote(note) {
    console.log(note)
    insertAtCursor(textarea, note._id + ']]')
    searching = false
  }
</script>

<main>
	<form on:submit|preventDefault={addNoteAndReset}>
		<button type='submit'>➕ Create Note</button>
    <br/>
		<textarea id='editor' bind:value={text} cols="80" rows="10"></textarea>
	</form>
  {#if searching}
    <Search onSelect={onSelectNote}/>
  {/if}
</main>

<style>
  button {
    margin-top: 15px;
  }
	textarea {
    margin-top: 15px;
	}
</style>