<script>
  import { Router, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Editor from "./routes/Editor.svelte";
  import Notes from "./routes/Notes.svelte";
  import { updateNotes } from './db.js'
  import { onMount } from 'svelte'

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  let notes = []

  onMount(async () => {
    notes = await updateNotes()
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
  </div>
</Router>