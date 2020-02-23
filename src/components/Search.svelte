<script>
    import { notes } from '../db.js'
    import { get, derived } from 'svelte/store'

    let query = ''
    export let onSelect;

    $: searchResults = query 
        ? derived(notes, $notes => $notes.filter(note => note.text.search(query) >= 0))
        : notes
    $: console.log(get(searchResults))
</script>

<style>
    p {
        border: 1px solid gray;
        width: 400px;
        margin: 5px auto;
    }
</style>

<h1>{$notes.length} Notes</h1>

<input id="search" bind:value={query} placeholder="search"/>

{#each $searchResults as note}
    <p on:click={() => onSelect(note)}>{note.text}</p>
{/each}