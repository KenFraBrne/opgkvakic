const fromUntilString = (delivery) => {
  const from = new Date(delivery.from);
  const until = new Date(delivery.until);
  const dateOptions = {hour: 'numeric'};
  const string = from.toLocaleTimeString([], dateOptions) + ' - ' + until.toLocaleTimeString([], dateOptions)
  return string;
};

export default fromUntilString;
