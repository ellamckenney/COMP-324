// function one -  resolves with an array of numbers
function getNumbers() {
  return new Promise((resolve, reject) => {
    const numbers = [2, 4, 6, 8, 10];
    if (numbers.length > 0) {
      resolve(numbers);
    } else {
      reject('Nothing found?');
    }
  });
}

// function two -  takes array, doubles each value, and resolves with the new arrays

function doubleNumbers(numbers) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(numbers)) {
      reject('Input must be an array');
    } else {
      const doubled = numbers.map(n => n * 2);
      resolve(doubled);
    }
  });
}

// function three -  takes array, sums the values, and resolves with the total

function sumNumbers(numbers) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(numbers)) {
      reject('Input must be an array');
    } else {
      const sum = numbers.reduce((total, current) => total + current, 0);
      resolve(sum);
    }
  });
}

// final chain to string these three functions together

getNumbers()
  .then(doubleNumbers)
  .then(sumNumbers)
  .then(result => {
    console.log(`Result: ${result}`);
  })
  .catch(error => {
    console.log('error found = ', err); 
  });