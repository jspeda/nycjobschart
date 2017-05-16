let ctx = document.getElementById('chart').getContext('2d');

const cityJobsData = fetch('https://data.cityofnewyork.us/resource/swhp-yxa4.json');

cityJobsData
  .then(data => data.json())
  .then(data=> {
    const agencyFrequency = data.reduce((agencies, value) => {
      agencies[value.agency] = agencies[value.agency] ? agencies[value.agency] + 1 : 1;
      return agencies;
    }, {});
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(agencyFrequency),
        datasets: [{
          label: 'Number of jobs available, May 2017',
          data: Object.values(agencyFrequency),
          backgroundColor: "rgba(115, 218, 228, 0.4)"
        }]
      }
    })
  })
  .catch(err => console.log(err));
