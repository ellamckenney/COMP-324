// key generator function 
function* CitiesGenerator() {
  console.log("CitiesGenerator starts...");
  const json = yield; // waiting for city.json to be fetched
  const allDestinations = json.destinations;

  let filter = yield;

  const filtered = filter
    ? allDestinations.filter(dest => dest[filter.key] === filter.value)
    : allDestinations;

  for (const dest of filtered) {
    yield dest.name;
  }

  return 'Done fetching cities! Proceeding to data load.';
}

// function to fetch city.json and get it to interact with the generator
function runCitiesGenerator() {
  console.log("runCitiesGenerator called...");
  const g = CitiesGenerator();

  g.next(); // start generator

  // fetching city.json
  fetch('./city.json')
    .then(res => res.json())
    .then(json => {
      console.log("city.json loaded");
      g.next(json); // pass JSON to generator

      // create the filter for visited cities
      const userFilter = { key: "visited", value: true };
      console.log("Filter set:", userFilter);
      g.next(userFilter); // send filter

      // display cities
      let result = g.next();
      const list = document.getElementById("travelList");
      list.innerHTML = ""; // clear generator!

      // log result to console
      while (!result.done) {
        console.log("Filter yielded:", result.value);
        const li = document.createElement("li");
        li.textContent = result.value;
        list.appendChild(li);
        result = g.next();
      }

      console.log("Result:", result.value);
    })
    .catch(err => g.throw(err));
}

// call function when DOM is ready
document.addEventListener("DOMContentLoaded", runCitiesGenerator);
