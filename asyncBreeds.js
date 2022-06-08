// asyncBreeds.js
const fs = require('fs');

const breedDetailsFromFile = function (breed, functionToRunWhenThingsAreDone) {
  console.log('breedDetailsFromFile: Calling readFile...');

  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.");
    // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
    console.log('YESSSS');
    if (!error) functionToRunWhenThingsAreDone(data);
    console.log('nooooo');
  });
  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so breedDetailsFromFile function returns undefined.
};

//====IN-CORRECT WAY======
// // we try to get the return value
// const bombay = breedDetailsFromFile('Bombay');
// console.log('Return Value: ', bombay); // => will NOT print out details, instead we will see undefined!

//====CORRECT WAY======
// CHANGE 1: Moved the console.log into a new function:
const printOutCatBreed = (breed) => {
  console.log('Return Value: ', breed); // => print out details correctly.
};

// CHANGE 2: we're now passing two arguments into breedDetailsFromFile: breed string and a callback function
breedDetailsFromFile('Bombay', printOutCatBreed);

//We saw why and how asynchronous functions such as readFile, and our function breedDetailsFromFile, cannot simply return their data. Instead they must use callback functions to pass that data back.
