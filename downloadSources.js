const axios = require('axios').default
const { writeFileSync } = require('fs')

// Mapped country / datasources
const mappedSources = [
  {
    country: 'France',
    url: 'https://www.data.gouv.fr/fr/datasets/r/6643df0a-9945-408a-8cad-199b951bf0d1'
  },
  {
    country: 'USA',
    state: 'CA-Nappa',
    url: 'https://data-cdfw.opendata.arcgis.com/datasets/b9855bea85c14190ab030da86441301c_0.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D'
  }
]

function formatNappaValleyDataset(datas) {
  const features = datas.features.filter(el => el.properties['NVCSName'] == 'Orchard-Vineyard')

  const coordinates = []
  for (let i = 0; i < features.length; i++) {
    coordinates.push(features[i].geometry.coordinates)
  }

  return {
    name: datas.name,
    type: 'FeatureCollection',
    crs: datas.crs,
    features: [{
      type: 'Feature',
      properties: {
        Bassin: 'Nappa Valley'
      },
      geometry: {
        type: 'MultiPolygon',
        coordinates: coordinates
      }
    }]
  }
}

mappedSources.forEach(element => {
  // Download and store file in datasources
  console.log('Downloading and saving sources for ' + element.country)
  axios({
    method: 'get',
    url: element.url,
    responseType: 'json'
  })
  .then(response => {
    let datas = response.data
    datas.name = element.state ? element.state : element.country

    if ('state' in element && element.state == 'CA-Nappa') datas = formatNappaValleyDataset(datas)

    writeFileSync(`./public/data/${element.country}/dataset.json`, JSON.stringify(datas))
  })
  .catch(error => {
    console.log(error)
  })
});
