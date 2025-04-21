// main.js
import { showLoading, showError, showResults } from './ui.js';
import { loadData, getMergedData } from './data.js';

document.addEventListener("DOMContentLoaded", async () => {
  showLoading();

  try {
    await loadData();                        
    const merged = getMergedData()
    showResults(merged);        
    showLoading("");       
  } catch (error) {
    showError("Failed to load travel data.");
    console.error(error);
  }
});
