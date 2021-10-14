<script>
  export let name;

  import Map from './Map.svelte';
  
</script>

<main>
	<h1>World Viticultural Map</h1>
  <p>Here is a map with all the known regions for wine production.</p>
  <p>Some datas can be missing, it will be available at the time with patience.</p>
  
  <div id="wine-map">
    <Map lat={43.5} lon={0.5} zoom={3.5}>
    </Map>
  </div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
    margin-top: 0;
    margin-bottom: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

  #wine-map {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90vw;
    height: 60vh;
  }
</style>