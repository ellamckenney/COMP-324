const loadButton = document.querySelector('.load-data button');
const fakeButton = document.querySelector('.fake-data button');
const outputDiv = document.getElementById('output');

// load and display cities from local json
const loadCityData = (file) => {                        
    outputDiv.innerHTML = '<p>Loading...</p>'; // loading message
  
    fetch(file)
      .then(response => {
        if (!response.ok) {                                       
          throw new Error(`HTTP error! Status: ${response.status}`); // throw error manually
        }
        return response.json(); // parsing json file
      })
      .then(jsonData => {
        outputDiv.innerHTML = '';
        const cityContainer = document.createElement('div');
  
        // loop through each desitination in city.json
        jsonData.destinations.forEach(destination => {
          const citySection = document.createElement('section');
          citySection.className = 'city';
  
          const name = document.createElement('h3');
          name.textContent = destination.name;
  
          const attractions = document.createElement('ul');
          destination.attractions.forEach(attraction => {
            const li = document.createElement('li');
            li.textContent = attraction;
            attractions.appendChild(li);
          });
  
          const weather = document.createElement('p');
          weather.textContent = `Weather:\n Spring is ${destination.weather.spring}, Summer is ${destination.weather.summer}, Fall is ${destination.weather.fall}, and Winter is ${destination.weather.winter}`;
  
          const visited = document.createElement('p');
          visited.textContent = `Visited? ${destination.visited ? 'Yes' : 'No'}`;
  
          citySection.appendChild(name);
          citySection.appendChild(attractions);
          citySection.appendChild(weather);
          citySection.appendChild(visited);
  
          cityContainer.appendChild(citySection);
        });
  
        outputDiv.appendChild(cityContainer);
      })
      .catch(error => {                                         
        console.error('Fetch error:', error);
        outputDiv.innerHTML = `<p>ERROR: Could not load data from requested file: "${file}".\nPlease check the file name or try again later.</p>`;
      });
  };
  

// add event listener to the button
loadButton.addEventListener('click', () => loadCityData('city.json'));
fakeButton.addEventListener('click', () => loadCityData('blank.json')); 

/* exercise one:

var text = `{
    "destinations": [
      {
        "name": "Berlin",
        "attractions": [
          "Brandenburger Tor",
          "Berlin Wall",
          "Museumsinsel",
          "Berliner Fernsehturm",
          "Berliner Dom"
        ],
        "weather": {
          "spring": "warm",
          "summer": "hot",
          "fall": "cool",
          "winter": "cold"
        },
        "visited": true
      },
      {
        "name": "Chicago",
        "attractions": [
          "Millennium Park",
          "Navy Pier",
          "Willis (Sears) Tower",
          "Art Institute of Chicago",
          "Wrigley Field"
        ],
        "weather": {
          "spring": "mild",
          "summer": "hot",
          "fall": "cool",
          "winter": "cold"
        },
        "visited": true
      },
      {
        "name": "San Francisco",
        "attractions": [
          "Golden Gate Bridge",
          "Alcatraz Island",
          "PIER 39",
          "Palace of Fine Arts",
          "Painted Ladies"
        ],
        "weather": {
          "spring": "warm",
          "summer": "hot",
          "fall": "warm",
          "winter": "mild"
        },
        "visited": false
      }
    ]
  }`;  

// parse json string
var obj = JSON.parse(text);

// add new property "bestTimeToVisit" to each destination
obj.destinations.forEach(function(destination) {
  if (destination.name === "Berlin") {
    destination.bestTimeToVisit = "Spring or Summer";
  } else if (destination.name === "Chicago") {
    destination.bestTimeToVisit = "Summer";
  } else if (destination.name === "San Francisco") {
    destination.bestTimeToVisit = "Fall or Spring";
  }
});

// modify and add berlin zoo to berlin destination
obj.destinations[0].attractions.push("Berlin Zoo");

// convert back to JSON string
var modifiedText = JSON.stringify(obj, null, 2);

// Output the original and modified JSON strings for comparison
console.log("Original JSON:");
console.log(text);

console.log("\nModified JSON:");
console.log(modifiedText); */