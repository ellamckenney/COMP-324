// for use with a public api
export async function getJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error fetching ${url}: ${res.status}`);
  return await res.json();
}