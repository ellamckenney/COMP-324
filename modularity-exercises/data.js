import { getJSON } from './utils.js';

let cityData = [];
let neighborhoodData = [];

export async function loadData() {
  [cityData, neighborhoodData] = await Promise.all([
    getJSON('city.json'),
    getJSON('neighborhood.json')
  ]);
}

export function getMergedData() {
  return cityData.destinations.map(dest => {
    const match = neighborhoodData.destinations.find(n => n.name === dest.name);
    return {
      ...dest,
      neighborhood: match ? match.destinations : "No neighborhoods available!"
    };
  });
}
