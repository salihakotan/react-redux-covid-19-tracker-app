import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useSelector } from 'react-redux';

function CasesChart() {
  

  const countryStatus = useSelector((state) => state.covid.country.status);

  const items = useSelector((state) => state.covid.items); //just total datas

  const countryItems = useSelector((state) => state.covid.country.items);

  const countryName = useSelector((state) => state.covid.country.name);

  const filteredItems = countryItems.find(
    (item) => item.country.toLowerCase() === countryName.toLowerCase()
  ); //just country datas

  let activeItems = [];

  if (countryName === "" || countryName.toLowerCase() === "world") {
    activeItems = items;
  } else {
    activeItems = filteredItems;
  }

  function convertCommasToSpace(str) {
    if(!str) return
    return str.replace(/,/g, '');
  }


  const chartOptions = {
          //
    series: [{
      name:"COVID-19",
      data: [convertCommasToSpace(activeItems.totalCases),convertCommasToSpace(activeItems.totalRecovered),convertCommasToSpace(activeItems.totalDeaths),convertCommasToSpace(activeItems.totalCases)]
    }],
    
    options: {
      chart: {
        height: 950,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: ["#ff9a9a","#00ff76","#ff0000","#f560ff"],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          "Infected","Recovered","Deaths","Active"
        ],
        labels: {
          style: {
            colors: "#000",
            fontSize: '12px'
          }
        }
      }
    }
  }

  if (countryStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (countryStatus === "failed") {
    return <div>Error</div>;
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:"center"}}>

      <ReactApexChart  options={chartOptions.options}
              series={chartOptions.series}
              type="bar"
              width="500" />


    </div>
  )
}

export default CasesChart