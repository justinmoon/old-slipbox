<script>
  import { get, derived } from 'svelte/store'
  import { navigate } from 'svelte-routing'
  export let noteId;
  export let notes

  $: note = derived(notes, $notes => $notes.find(note => {
    return note._id === noteId
  }));

  $: backLinks = derived(
    [notes, note],
    ([$notes, $note]) => $notes.filter(otherNote => otherNote.text.search($note._id) >= 0)
  )
</script>

<p>ID: {$note._id}</p>
<p>Text: {$note.text}</p>

<p>Back Links</p>

<ul>
  {#each $backLinks as backLink}
    <li on:click={() => navigate(`/notes/${backLink._id}`)}>{backLink.text}</li>
  {/each}
</ul>