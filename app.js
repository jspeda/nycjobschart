let ctx = document.getElementById('chart').getContext('2d');

const cityJobsData = fetch('https://data.cityofnewyork.us/resource/swhp-yxa4.json');

cityJobsData
  .then(data => data.json())
  .then(data=> {
    const agencyFrequency = data.reduce((agencies, value) => {
      agencies[value.agency] = agencies[value.agency] ? agencies[value.agency] + 1 : 1;
      return agencies;
    }, {})
    console.log(agencyFrequency);
    const agencyKeys = Object.keys(agencyFrequency);
    console.log(agencyKeys);
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: agencyKeys,
        datasets: [{
          label: 'jobs',
          data: Object.values(agencyFrequency),
          backgroundColor: "rgba(153, 255, 51, 0.4)"
        }]
      }
    })
  })
  .catch(err => console.log(err));
