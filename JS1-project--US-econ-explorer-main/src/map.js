import { count } from "d3"
// import countyinfo from "../"
export const map = function(){


  let countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
  let covidURL = 'https://raw.githubusercontent.com/Zoooook/CoronavirusTimelapse/master/static/population.json'
  // let unemploy = 'https://raw.githubusercontent.com/plotly/datasets/master/fips-unemp-16.csv'

  let countyData
  let covidData

  let canvas = d3.select('#canvas')
  let tooltip = d3.select('#tooltip')


  let drawMap = () => {

    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class','county')
            .attr('data-pop',(el)=>{
              return el.id
            })
            .on('mouseover',(countyDataItem)=>{
              tooltip.transition()
                    .style("visibility", "visible")

                let id = countyDataItem['id']
                let county = covidData.find((item)=>{
                  return +item.us_county_fips === id
                })
                if (county['population']< 3000){
                  tooltip.text('Severity: Low  || County Cases: ' + county['population'])
                } else if ((county['population'] > 3000) && (county['population'] < 8000)){
                  tooltip.text('Severity: Mild  || County Cases: ' + county['population'])
                } else if ((county['population'] > 8000) && (county['population'] < 20000)){
                  tooltip.text('Severity: Moderate  || County Cases: ' + county['population'])
                } else if ((county['population'] > 20000) && (county['population'] < 250000)){
                  tooltip.text('Severity: Severe  || County Cases: ' + county['population'])
                } else {
                  tooltip.text('Severity: Devilish  || County Cases: ' + county['population'])
                }


            })
            .on('mouseout',(countyDataItem)=>{
              tooltip.transition()
                    .style("visibility","hidden")
            })
            .attr('fill',(countyDataItem)=>{
              let id = countyDataItem['id']
              let county = covidData.find((item)=>{
                // console.log(item['us_county_fips'])
                return +item.us_county_fips === id

              })


              if (!county){
                return 'firebrick'
                // return 'limegreen'
              }
              let numbers = +county['population']

              if(numbers < 3000){
                return 'limegreen'
              } else if ((numbers > 3000) && (numbers < 8000)){
                return 'lightgreen'
              } else if ((numbers > 8000) && (numbers < 20000)){
                return 'orange'
              } else if ((numbers > 20000) && (numbers < 250000)){
                return 'tomato'
              } else {
                return 'firebrick'
              }
            })

            .attr('county-fips',(countyDataItem)=>{
              return countyDataItem['id']
            })
            .attr('covid-county-population',(countyDataItem)=>{
              let id = countyDataItem['id']
              let county = covidData.find((item)=>{
                // console.log(item['us_county_fips'])
                return +item.us_county_fips === id

              })
              let numbers = +county['population']
              return numbers
            })
            // .on('mouseover',(countyDataItem)=>{
            //   console.log(countyDataItem)
            //   tooltip.transition()
            //         .style("visibility", "visible")
            // })
                  // let id = countyDataItem['id']
                  // let county = covidData.find((item)=>{
                  //   // console.log(item['us_county_fips'])
                  //   return +item.us_county_fips === id

                  // })



            //   let id = countyDataItem['id']
            //   let county = covidData.find((item)=>{
            //           // console.log(item['us_county_fips'])
            //     return +item.us_county_fips === id

            //   })
            //   tooltip.text(county['us_county_fips'] + ' - ' + county['subregion'] + ', ' + county['population'])
            // })
            // .on('mouseout', (countyDataItem)=>{
            //   tooltip.transition()
            //     .style('visibility','hidden')


  }

  d3.json(countyURL).then(
    (data, error)=>{
      if(error){
        console.log(error)
      } else{
        countyData = topojson.feature(data, data.objects.counties).features
        console.log(countyData)

        d3.json(covidURL).then(
          (data,error)=>{
            if(error){
              console.log(error)
            }else
              window.covidData = data
              covidData = data
              console.log(covidData)
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
