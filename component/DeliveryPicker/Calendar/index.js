import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Calendar = ({deliveries, calendarDate, onClick}) => {

  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const deliveryTimes = deliveries.map( delivery => {
    const day = new Date(delivery.from);
    day.setHours(0);
    return day.getTime();
  })

  // calendar head
  const headDays = Array(7).fill(0).map((_, i) => {
    const day = new Date(null, null, i+1);
    const dayString = day.toLocaleString(undefined, {weekday: 'short'});
    return <th key={i}>{dayString}</th>
  });

  const head = <tr>{headDays}</tr>;

  // calendar body
  const cols = (ir, ic) => {

    const day = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1, 0);
    day.setDate(ir*7+ic+1-(day.getDay()+6)%7);

    const isDelivery = deliveryTimes.includes(day.getTime());
    const isMonth = day.getMonth() === calendarDate.getMonth();
    const isTime = day.getTime() === date.getTime();
    const isLate = day.getTime() - date.getTime() < 1000*3600*24*2;

    const style = {
      textDecoration: isTime ? 'underline' : 'none',
      color: isMonth && !isLate ? 'black' : '#dddddd',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontSize: '1rem',
      padding: '0 0',
    };

    const col = isDelivery && isMonth && !isLate ?
      <Button
        variant="light"
        className="p-0 font-weight-bold"
        onClick={() => onClick(day)}>
        {day.getDate()}
      </Button> :
      day.getDate();

    return <td key={ic} style={style}>{col}</td>

  };

  const rows = (ir) => {
    const row = [...Array(7)].map((col, ic) => cols(ir, ic));
    return <tr key={ir}>{row}</tr>;
  };

  const body = [...Array(6)].map((row, ir) => rows(ir));

  return (
    <Table size="sm">
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </Table>
  )
}

export default Calendar;
