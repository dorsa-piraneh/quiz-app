const questions = [
  {
    id: 1,
    question: 'What will be the output of: typeof null ?',
    options: ['null', 'object', 'undefined', 'number'],
    correct: 'object',
  },
  {
    id: 2,
    question: 'Which array method creates a new array based on a condition?',
    options: ['map()', 'filter()', 'forEach()', 'reduce()'],
    correct: 'filter()',
  },
  {
    id: 3,
    question: "What does the '===' operator do in JavaScript?",
    options: ['Compares only values', 'Compares value and type', 'Assigns a value', 'Checks if variable exists'],
    correct: 'Compares value and type',
  },
  {
    id: 4,
    question: 'Which method converts a JSON string into a JavaScript object?',
    options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.toObject()'],
    correct: 'JSON.parse()',
  },
  {
    id: 5,
    question: 'Which keyword creates a block-scoped variable?',
    options: ['var', 'let', 'const', 'Both let and const'],
    correct: 'Both let and const',
  },
  {
    id: 6,
    question: 'Which method is used to select the first element that matches a CSS selector?',
    options: ['getElementById()', 'querySelector()', 'querySelectorAll()', 'getElementsByClassName()'],
    correct: 'querySelector()',
  },
  {
    id: 7,
    question: 'What does async/await help with?',
    options: ['Styling the UI', 'Handling asynchronous code', 'Improving CSS performance', 'Creating HTML templates'],
    correct: 'Handling asynchronous code',
  },
  {
    id: 8,
    question: 'Which method adds an element to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'concat()'],
    correct: 'push()',
  },
  {
    id: 9,
    question: 'What does event.preventDefault() do?',
    options: ['Stops JavaScript execution', 'Prevents the default browser behavior', 'Removes an event listener', 'Stops DOM rendering'],
    correct: 'Prevents the default browser behavior',
  },
  {
    id: 10,
    question: 'Which method converts a JavaScript object into a JSON string?',
    options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toString()', 'JSON.convert()'],
    correct: 'JSON.stringify()',
  },
  {
    id: 11,
    question: 'What will the following code return? Boolean([])',
    options: ['false', 'true', 'undefined', 'Error'],
    correct: 'true',
  },
  {
    id: 12,
    question: 'Which method is used to attach an event handler in modern JavaScript?',
    options: ['addEventListener()', 'attachEvent()', 'onClick()', 'bindEvent()'],
    correct: 'addEventListener()',
  },
];

export { questions };
