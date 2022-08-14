import { count } from "d3"
// import countyinfo from "../"
export const map = function(){


  let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  let wildfireURL = 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/2019_NIFS_OpenData/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson'
  
  let countyData
  let wildfireData
  
  let canvas = d3.select('#canvas')
  
  let drawMap = () => {

    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class','county')
            .attr('fill',(countyDataItem)=>{
              let id = countyDataItem['id']
              let county 
            })
  }

  d3.json(countyURL).then(
    (data, error)=>{
      if(error){
        console.log(error)
      } else{
        countyData = topojson.feature(data, data.objects.counties).features 
        console.log(countyData)

        d3.json(wildfireURL).then(
          (data,error)=>{
            if(error){
              console.log(error)
            }else 
              wildfireData = data 
              console.log(wildfireData)
              drawMap()
          }
        )
      }
    })






    

  // let wildfireURL = 'https://services3.arcgis.com/T4QMspbfLg3qTGWY/arcgis/rest/services/2019_NIFS_OpenData/FeatureServer/1/query?outFields=*&where=1%3D1&f=geojson'

  // let wildfireData 

  // let canvas = d3.select('#canvas')

  // let drawMap = () => {

  //     canvas.selectAll('path')
  //             .data(wildfireURL)
  //             .enter()
  //             .append('path')
  //             .attr('d', d3.geoPath())
  //             .attr('class','county')
  //             .attr('fill',(countyDataItem)=>{
  //               let id = countyDataItem['id']
  //               let county 
  //             })
  //   }

  //   d3.json(wildfireURL).then(
  //       (data, error)=>{
  //         if(error){
  //           console.log(error)
  //         } else{
  //           wildfireData = data.features 
  //           console.log(wildfireData)            
  //           drawMap()
  //           }
  //       }
  //   )


    




// const width = 1680;
// const height = 942;

// const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

// const projection = d3.geoMercator().scale(140)
//     .translate([width / 2, height / 1.4]);
// const path = d3.geoPath(projection);

// const g = svg.append('g');

//     d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//     .then(data => {

//         const countries = topojson.feature(data, data.objects.countries);
//         g.selectAll('path').data(countries.features).enter().append('path').attr('class', 'country').attr('d', path);

//     })
}
