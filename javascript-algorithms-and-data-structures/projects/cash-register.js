/*
  https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/cash-register

  Design a cash register drawer function checkCashRegister() that accepts purchase price as the first 
  argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third 
  argument.

  cid is a 2D array listing available currency.

  The checkCashRegister() function should always return an object with a status key and a change key.

  Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, 
  or if you cannot return the exact change.

  Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it 
  is equal to the change due.

  Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted 
  in highest to lowest order, as the value of the change key.

  Currency							Unit		Amount
  -------------------------------------------
  Penny									$0.01 	(PENNY)
  Nickel								$0.05 	(NICKEL)
  Dime									$0.1 		(DIME)
  Quarter								$0.25 	(QUARTER)
  Dollar								$1 			(DOLLAR)
  Five Dollars					$5 			(FIVE)
  Ten Dollars						$10 		(TEN)
  Twenty Dollars				$20 		(TWENTY)
  One-hundred Dollars		$100 		(ONE HUNDRED)	
*/

// decimal rounding helper (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
})();
// End of rounding helper

function checkCashRegister(price, cash, cid) {
  let amountMap = [
    ['PENNY', 0.01],
    ['NICKEL', 0.05],
    ['DIME', 0.1],
    ['QUARTER', 0.25],
    ['ONE', 1],
    ['FIVE', 5],
    ['TEN', 10],
    ['TWENTY', 20],
    ['ONE HUNDRED', 100]
  ];

  // How much do we have to pay back?
  let changeAmount = cash - price;
  // How much is in the drawer?
  let cidTotal = Math.round10(
    cid.reduce((prev, cur) => {
      return prev + cur[1];
    }, 0),
    -2
  );

  // Make a copy of cid
  // Reduce this array starting on the last entry, checking each entry if we can use it to
  // return change
  let change = [].concat(cid).reduceRight((prev, cur) => {
    // get current base amount
    let baseAmount = amountMap.find(element => element[0] === cur[0])[1];
    // can we use the current amount?
    let timesNeeded = Math.floor(changeAmount / baseAmount);
    // if we can't, pass on the array
    if (timesNeeded < 1) {
      return prev;
    } else {
      // how many times can we pay this amount with the funds available?
      let timesAvailable = Math.floor(cur[1] / baseAmount);
      // what is the total amount we can pay?
      let amountToPay;
      if (timesNeeded >= timesAvailable) {
        amountToPay = timesAvailable * baseAmount;
      } else {
        amountToPay = timesNeeded * baseAmount;
      }
      // reduce the change we have to pay
      changeAmount = Math.round10(changeAmount - amountToPay, -2); // without round10 this gives rounding errors
      // return the change for this amount
      return prev.concat([[cur[0], amountToPay]]);
    }
  }, []);

  // Build the return
  let result = {};
  // status logic
  if (cash - price === cidTotal) {
    result.status = 'CLOSED';
    result.change = cid;
  } else if (changeAmount > cidTotal || changeAmount != 0) {
    result.status = 'INSUFFICIENT_FUNDS';
    result.change = [];
  } else {
    result.status = 'OPEN';
    result.change = change;
  }

  // Here is your change, ma'am.
  return result;
}

console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0]
  ])
);
