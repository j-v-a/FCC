/* 
  https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator

  Return true if the passed string looks like a valid US phone number.

  The user may fill out the form field any way they choose as long as it has the format of a valid 
  US number. The following are examples of valid formats for US numbers (refer to the tests below 
  for other variants):

    555-555-5555
    (555)555-5555
    (555) 555-5555
    555 555 5555
    5555555555
    1 555 555 5555

  For this challenge you will be presented with a string such as 800-692-7753 or 
  8oo-six427676;laskdjf. Your job is to validate or reject the US phone number based on any
  combination of the formats provided above. The area code is required. If the country code is 
  provided, you must confirm that the country code is 1. Return true if the string is a valid US 
  phone number; otherwise return false.
*/

function telephoneCheck(str) {
	// Parentheses checks
	if (str[0] === '(' && str[str.length - 1] === ')') return false;
	let parentheses = str.match(/[()]/g);
	if (parentheses) {
		// should always be a pair
		if (parentheses.length % 2 != 0) return false;
		parentheses.forEach((cur, i) => {
			if (i % 2 === 0) {
				// should be "("
				if (cur != '(') return false;
			} else {
				if (cur != ')') return false;
			}
		});
	}

	// Hyphens checks
	if (str[0] === '-' || str[str.length - 1] === '-') return false;

	// Illegal character checks
	let illegal = str.match(/[^\d()-\s]/g);
	if (illegal) return false;

	// Number length checks
	// strip all the fluff
	let numbersOnly = str.split(/\W/).reduce((acc, cur) => {
		return acc.concat(cur);
	});
	// console.log(str + " : " + numbersOnly);
	// check for length condition
	if (numbersOnly.length != 10 && numbersOnly.length != 11) return false;
	//check for country code condition
	if (numbersOnly.length === 11 && numbersOnly[0] != 1) return false;
	return true;
}
