// an alternative to if-else (sometimes)
// condition ? truthy expression : falsy expression

let exerciseTimeMins = 20;

let message = '';

if (exerciseTimeMins < 30) {
  message = 'You need to try harder!';
} else {
  message = 'Doing good!';
}

console.log(message);

// in one line
console.log(exerciseTimeMins < 30 ? 'You need to try harder!' : 'Doing good!');

// Now what if...
exerciseTimeMins = 100;

message = '';

if (exerciseTimeMins < 30) {
  message = 'You need to try harder!';
} else if (exerciseTimeMins < 60) {
  message = 'Doing good!';
} else {
  message = 'Excellent!';
}

// harder to understand don't do you think? readability still counts
console.log(
  exerciseTimeMins < 30
    ? 'You need to try harder!'
    : exerciseTimeMins < 60
    ? 'Doing good!'
    : 'Excellent!'
);
