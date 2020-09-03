import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import getFloorDate from 'util/getFloorDate';

const Calendar = ({deliveries, calendarDate, calendarDayChoose}) => {

  // current date
  const nowDate = getFloorDate();

  // delivery epoch times (rounded to nearest day)
  const deliveryTimes = deliveries.map( delivery => {
    const date = new Date(delivery.from);
    return getFloorDate(delivery.from).getTime();
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

    // align date with weekday
    const day = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1, 0);
    day.setDate(ir*7+ic+1-(day.getDay()+6)%7);

    // style according to criteria
    const isDelivery = deliveryTimes.includes(day.getTime());
    const isMonth = day.getMonth() === calendarDate.getMonth();
    const isTime = day.getTime() === nowDate.getTime();
    const style = {
      textDecoration: isTime ? 'underline' : 'none',
      color: isMonth ? 'black' : '#dddddd',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontSize: '1rem',
      padding: '0 0',
    };

    // if delivery, make it a button
    const col = isDelivery && isMonth ?
      <Button
        variant="light"
        className="p-0 font-weight-bold"
        onClick={() => calendarDayChoose(day)}>
        {day.getDate()}
      </Button> :
      day.getDate();

    return <td key={ic} style={style}>{col}</td>

  };

  // rows of days
  const rows = (ir) => {
    const row = [...Array(7)].map((col, ic) => cols(ir, ic));
    return <tr key={ir}>{row}</tr>;
  };

  // 6 week calendar
  const body = [...Array(6)].map((row, ir) => rows(ir));

  return (
    <Table size="sm">
      <thead>{head}</thead>
      <tbody>{body}</tbody>
    </Table>
  )
}

export default Calendar;
