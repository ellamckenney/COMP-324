document.addEventListener("DOMContentLoaded", async function () {
  // start function to fetch and parse JSON data
  async function getJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching ${url}: ${response.status}`);
    }
    return await response.json();
  }

  const loading = document.getElementById('loading');
  const result = document.getElementById('result');

  // loading message
  loading.textContent = 'Loading the travel data...';

  try {
    // wait for both fetches in parallel
    const [cityData, neighborhoodData] = await Promise.all([
      getJSON('city.json'),
      getJSON('neighborhoods.json'),
    ]);

    console.log("Cities:", cityData);
    console.log("Neighborhoods:", neighborhoodData);

    // merge city and neighborhood based on city name
    const merged = cityData.destinations.map(dest => {
      const neighborhoodEntry = neighborhoodData.destinations.find(
        t => t.name === dest.name
      );
      return {
        ...dest,
        neighborhood: neighborhoodEntry
          ? neighborhoodEntry.destinations
          : "No neighborhoods available!",
      };
    });

    // display merged result
    result.textContent = JSON.stringify(merged, null, 2);
    console.log("Merged:", merged);
    loading.textContent = '';
  } catch (error