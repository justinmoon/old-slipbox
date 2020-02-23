<script>
  import { get, derived } from 'svelte/store'
  export let noteId;
  export let notes

  $: note = derived(notes, $notes => $notes.find(note => {
    console.log(note._id, noteId)
    return note._id === noteId
  }));

  $: console.log('note.svelte note', get(notes))
  $: console.log('note.svelte note', get(note))
</script>

<p>ID: {$note._id}</p>
<p>Text: {$note.text}</p>