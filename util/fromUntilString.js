const fromUntilString = ({ delivery, lang }) => {
  const from = new Date(delivery.from);
  const until = new Date(delivery.until);
  const dateOptions = {hour: 'numeric'};
  const string = from.toLocaleTimeString(lang, dateOptions) + ' - '+ until.toLocaleTimeString(lang, dateOptions);
  return string;
};

export default fromUntilString;
