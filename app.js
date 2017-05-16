let ctx = document.getElementById('chart').getContext('2d');

const cityJobsData = fetch('https://data.cityofnewyork.us/resource/swhp-yxa4.json');

cityJobsData
  .then(data => data.json())
  .then(data=> {
    const agencyFrequency = data.reduce((agencies, value) => {
      agencies[value.agency] = agencies[value.agency] ? agencies[value.agency] + 1 : 1;
      return agencies;
    }, {});
    const keys = Object.keys(agencyFrequency);
    const agencyArray = keys.map(key => {
      return {
        key: key,
        value: agencyFrequency[key]
      }
    })
    agencyArray.sort((a, b) => b.value - a.value);
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: agencyArray.map(item => item.key),
        datasets: [{
          label: 'Number of jobs available, May 2017',
          data: agencyArray.map(item => item.value),
          backgroundColor: "rgba(115, 218, 228, 0.4)"
        }]
      },
      options: {
        scales: {
          yAxes: [{
            type: 'linear',
          }]
        }
      }
    })
  })
  .catch(err => console.log(err));
