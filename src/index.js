const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '] ;
const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'] ;

const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/ ;

const countTo20 = (n) => a[Number(n)] ;
const multiplesOf10 = (n) => b[n[0]] + ' ' + a[n[1]] ;

module.exports = function toReadable (number) {
  const num = Number(number) ;
  if (isNaN(num)) return '' ;
  if (num === 0) return 'zero' ;

  const numStr = num.toString();
  if (numStr.length > 9) {
    throw new Error('overflow') ;// Does not support converting more than 9 digits yet
  }

  const [, n1, n2, n3, n4, n5] = ('000000000' + numStr).substr(-9).match(regex) ;// left pad zeros

  let str = '' ;
  str += n1 != 0 ? (countTo20(n1) || multiplesOf10(n1)) + 'crore ' : '' ;
  str += n2 != 0 ? (countTo20(n2) || multiplesOf10(n2)) + 'lakh ' : '' ;
  str += n3 != 0 ? (countTo20(n3) || multiplesOf10(n3)) + 'thousand ' : '' ;
  str += n4 != 0 ? countTo20(n4) + 'hundred ' : '' ;
  str += n5 != 0 && str != '' ? '' : '' ;
  str += n5 != 0 ? (countTo20(n5) || multiplesOf10(n5)) : '' ;

  return str.trim();
}