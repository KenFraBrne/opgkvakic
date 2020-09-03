const amountPretty = (product, amount) => {
  const precision = product.by.toString().split('\.').length;
  const amountNum = amount ? amount : 0;
  let amountString = amountNum.toFixed(precision-1) + ' ' + product.priceText;
  if ( amount > 1 && amount < 5 && amountString.slice(-1) == 'a'){
    amountString = amountString.slice(0, -1).concat('e');
  }
  return amountString;
}

export default amountPretty;
