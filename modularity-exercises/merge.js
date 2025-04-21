// for use with a public api (this is the default export for the example from 4/13)
export default function mergeCityNeighborhood(cityData, neighborhoodData) {
  return cityData.destinations.map(dest => {
    const match = neighborhoodData.destinations.find(n => n.name === dest.name);
    return {
      ...dest,
      neighborhood: match ? match.destinations : "No neighborhoods available!"
    };
  });
}