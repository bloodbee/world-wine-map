<script>
	import { onMount, setContext } from 'svelte';
  import { mapbox, key } from './lib/mapboxgl.js';
  
  import countries from './lib/countries.js';

	setContext(key, {
		getMap: () => map
	});

	export let lat;
	export let lon;
	export let zoom;

	let container;
  let map;
  
  function generateRandomColor() {
    // storing all letter and digit combinations
    // for html color code
    let letters = "0123456789ABCDEF";
  
    // html color code starts with #
    let color = '#';
  
    // generating 6 times as HTML color code consist
    // of 6 letter or digits
    for (let i = 0; i < 6; i++) color += letters[(Math.floor(Math.random() * 16))];

    return color
  }

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css';

		link.onload = () => {
			map = new mapbox.Map({
				container,
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [lon, lat],
				zoom
      });
      let hoveredStateId = null;

      map.on('load', () => {

        countries.forEach(element => {
          // get the dataset
          map.addSource(`${element.country}-wines`, {
            type: 'geojson',
            data: `data/${element.country}/dataset.json`,
            generateId: true
          });

          map.addLayer({
            'id': `${element.country}-wines-layer-filled`,
            'type': 'fill',
            'source': `${element.country}-wines`,
            'layout': {},
            'paint': {
              'fill-color': element.color, // blue color fill
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.5
              ]
            }
          });

          map.addLayer({
            'id': `${element.country}-wines-layer-outlined`,
            'type': 'line',
            'source': `${element.country}-wines`,
            'layout': {},
            'paint': {
              'line-color': '#000',
              'line-width': 1
            }
          });
          // Create a popup, but don't add it to the map yet.
          const popup = new mapbox.Popup({
            closeButton: false,
            closeOnClick: false
          });

          // When the user moves their mouse over the state-fill layer, we'll update the
          // feature state for the feature under the mouse.
          map.on('mouseenter', `${element.country}-wines-layer-filled`, (e) => {
            if (e.features.length > 0) {
              // Change the cursor style as a UI indicator.
              map.getCanvas().style.cursor = 'pointer';
              
              // Get properties of element hovered and set description
              const properties = e.features[0].properties;

              let description = '';
              for (const key in properties) {
                if (properties.hasOwnProperty(key)) {
                  const element = properties[key];
                  description += element.toUpperCase()
                }
              }
              
              if (hoveredStateId !== null) {
                map.setFeatureState(
                  { source: `${element.country}-wines`, id: hoveredStateId },
                  { hover: false }
                );
              }

              hoveredStateId = e.features[0].id;
              map.setFeatureState(
                { source: `${element.country}-wines`, id: hoveredStateId },
                { hover: true }
              );

              // Populate the popup and set its coordinates
              // based on the feature found.
              popup.setLngLat(e.lngLat).setHTML(description).addTo(map);
            }
          });
          
          // When the mouse leaves the state-fill layer, update the feature state of the
          // previously hovered feature.
          map.on('mouseleave', `${element}-wines-layer-filled`, () => {
            if (hoveredStateId !== null) {
              map.setFeatureState(
                { source: `${element}-wines`, id: hoveredStateId },
                { hover: false }
              );
            }
            hoveredStateId = null;
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
        });
      });

		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});
</script>

<div bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}

  .mapboxgl-popup {
    max-width: 400px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }
</style>