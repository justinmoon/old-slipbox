<script>
    import { notes } from '../db.js'
</script>

<style>
    p {
        border: 1px solid gray;
        width: 400px;
        margin: 5px auto;
    }
</style>

<h1>{$notes.length} Notes</h1>

{#each $notes as note}
    <p>{note.text}</p>
{/each}