export default function amountPretty({ product, amount, lang }){
  const { by, priceText } = product;
  const precision = by.toString().split('\.').length;
  const amountNum = amount ? amount : 0;
  let amountString = amountNum.toFixed(precision-1) + ' ' + ( priceText[lang] || priceText );
  switch(lang){
    case "hr":
      if ( amount > 1 && amount < 5 && amountString.slice(-1) == 'a'){
        amountString = amountString.slice(0, -1).concat('e');
      };
      return amountString;
    default:
      if (amount !== 1 && priceText !== 'dag' && priceText !== 'kg') return amountString + 's';
      else return amountString;
  }
};
