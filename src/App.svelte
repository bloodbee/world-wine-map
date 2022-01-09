<script>
  export let name;

  import Map from './Map.svelte';
  
</script>

<main>
	<h1>World Viticultural Map</h1>
  <p>Here is a map with all the known regions for wine production.</p>
  <p>Some datas can be missing, it will be available at the time with patience.</p>

  <p>Last update: <span id="lastUpdate">{new Date('01/09/2022').toLocaleDateString()}</span></p>
  
  <div id="main-container">
    <div id="countries">
      <h3>Countries / Wine regions</h3>
      <ul>
        <li><b>USA</b> - Nappa Valley</li>
        <li><b>France</b> - All</li>
        <li><b>Luxemburg</b> - All</li>
      </ul>
    </div>
    
    <div id="wine-map">
      <Map lat={43.5} lon={0.5} zoom={3.5}>
      </Map>
    </div>
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

  #main-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  #wine-map {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90vw;
    height: 60vh;
  }

  #countries {
    margin-left: auto;
    margin-right: auto;
  }

  #countries ul {
    list-style-position: inside;
  }
</style>