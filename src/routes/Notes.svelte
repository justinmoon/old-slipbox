<script>
    import { notes } from '../db.js'
    import { get, derived } from 'svelte/store'
    import { navigate } from 'svelte-routing'

    let query = ''

    $: searchResults = query 
        ? derived(notes, $notes => $notes.filter(note => note.text.search(query) >= 0))
        : notes
</script>

<style>
    p {
        border: 1px solid gray;
        width: 400px;
        margin: 5px auto;
    }
</style>

<h1>{$notes.length} Notes</h1>

<input bind:value={query} placeholder="search"/>

{#each $searchResults as note}
    <p on:click={() => navigate(`/notes/${note._id}`)}>{note.text}</p>
{/each}