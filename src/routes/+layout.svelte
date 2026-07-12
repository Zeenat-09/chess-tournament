<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<style>
  :global(body) {
    font-family: Arial, sans-serif;
    max-width: 700px;
    margin: 40px auto;
    padding: 0 20px;
    color: #222;
  }

  :global(h1, h2) {
    color: #1a1a2e;
    border-bottom: 2px solid #4a4e8f;
    padding-bottom: 8px;
  }

  :global(form) {
    margin-bottom: 8px;
    margin-right: 8px;
    display: inline-block;
  }

  :global(input) {
    padding: 6px;
    margin-right: 6px;
  }

  :global(button) {
    padding: 6px 12px;
    background: #4a4e8f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  :global(button:hover) {
    background: #383c73;
  }

  :global(div) {
    padding: 8px;
    margin-bottom: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  :global(p) {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px 12px;
    margin-bottom: 6px;
  }
</style>