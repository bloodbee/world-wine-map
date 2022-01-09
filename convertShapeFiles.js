const shp = require('shpjs')
const fs = require('fs')

const shpArray = [
  {
    country: 'Luxemburg',
    file: "weinberge_lu_2020"
  }
]


shpArray.forEach(shpItem => {
  shp(fs.readFileSync(`./public/data/${shpItem.country}/${shpItem.file}.zip`)).then(geojson => {
    fs.writeFileSync(`./public/data/${shpItem.country}/dataset.json`, JSON.stringify(geojson))
  })
})


