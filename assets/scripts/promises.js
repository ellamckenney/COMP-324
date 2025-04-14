document.addEventListener("DOMContentLoaded", function() {
  function getJSON(url) {
      return fetch(url)
        .then(response => {
          if (!response.ok) throw new Error(`Error fetching ${url}: ${response.status}`);
          return response.json();
        });
    }

    const loading = document.getElementById('loading');
    const result = document.getElementById('result');

    // load json files with cities and their neighborhoods together
    Promise.all([
      getJSON('city.json'),
      getJSON('neighborhoods.json')
    ])
    .then(response => {
      const cityData = response[0];
      const neighborhoodData = response[1];

      console.log("Cities:", cityData);
      console.log("Neighborhoods:", neighborhoodData);

      // merge city and neighborhoods
      const merged = cityData.destinations.map(dest => {
        const neighborhoodEntry = neighborhoodData.destinations.find(t => t.name === dest.name);
        return {
          ...dest,
          neighborhood: neighborhoodEntry ? neighborhoodEntry.destinations : "No neighborhoods available!"
        };
      });

      result.textContent = JSON.stringify(merged, null, 2);
      console.log("Merged:", merged);
    })
    .catch(error => {
      loading.textContent = 'Error when loading travel data!';
      console.error("error! ", error);
    })
  });