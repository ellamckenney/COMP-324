// for use with a public api

export function showLoading(message = "Loading...") {
  const loading = document.getElementById('loading');
  if (loading) loading.textContent = message;
}

export function showError(errorMessage) {
  const loading = document.getElementById('loading');
  if (loading) loading.textContent = errorMessage;
}

export function showResults(data) {
  const result = document.getElementById('result');
  if (result) result.textContent = JSON.stringify(data, null, 2);
}
