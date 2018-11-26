/*
  https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/caesars-cipher

  One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. 
  In a shift cipher the meanings of the letters are shifted by some set amount.

  A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. 
  Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.

  Write a function which takes a ROT13 encoded string as input and returns a decoded string.

  All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, 
  punctuation), but do pass them on.
*/

// Charcodes go from 65 (A) to 90 (Z)

function rot13(str) {
  // 1. convert to array of charcodes
  const charArr = str.split('').map(element => element.charCodeAt());
  // 2. map the values which are in the characterset to the new charcodes
  const charCodeArr = charArr.map(element =>
    element <= 90 && element >= 78
      ? element - 13
      : element < 78 && element >= 65
      ? 91 - (13 - (element - 65))
      : element
  );
  // 3. convert the charcodearray back to a string
  const result = charCodeArr
    .map(element => String.fromCharCode(element))
    .join('');

  return result;
}
