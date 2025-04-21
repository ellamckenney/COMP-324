// sequential fetch
async function fetchSequentially() {
  console.log("Fetching city and neighborhood data sequentially...");
  console.time("Sequential Fetch");

  try {
    const city = await fetch('city.json').then(res => res.json());
    const neighborhood = await fetch('neighborhood.json').then(res => res.json());

    console.log("Sequential result:", { city, neighborhood });
  } catch (error) {
    console.error("Sequential fetch error:", error);
  }

  console.timeEnd("Sequential Fetch");
}

// parallel fetch
async function fetchInParallel() {
  console.log("Fetching city and neighborhood data in parallel...");
  console.time("Parallel Fetch");

  try {
    const [city, neighborhood] = await Promise.all([
      fetch('city.json').then(res => res.json()),
      fetch('neighborhood.json').then(res => res.json())
    ]);

    console.log("Parallel result:", { city, neighborhood });
  } catch (error) {
    console.error("Parallel fetch error:", error);
  }

  console.timeEnd("Parallel Fetch");
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchSequentially();
  await fetchInParallel();
});