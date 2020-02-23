<script>
  import { Router, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Editor from "./routes/Editor.svelte";
  import Notes from "./routes/Notes.svelte";
  import Note from "./routes/Note.svelte";
  import { updateNotes, notes } from './db.js'
  import { onMount } from 'svelte'

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  $: console.log('NOTES', notes)

  onMount(async () => {
    await updateNotes()
  })
</script>

<Router url="{url}">
  <nav>
    <NavLink to="/">Editor</NavLink>
    <NavLink to="notes">Notes</NavLink>
  </nav>
  <div>
    <Route path="/" component="{Editor}" />
    <Route path="notes" component="{Notes}" notes={notes} />
    <Route path="/notes/:noteId" component="{Note}" notes={notes} />
  </div>
</Router>