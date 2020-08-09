import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Overlay, Popover, PopoverTitle, PopoverContent } from 'react-bootstrap';

import Calendar from './Calendar'

import { FiCalendar, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const DatePicker = ({deliveries, orderDate, setOrderDate}) => {

  // dates
  const date = new Date();
  const [calendarDate, setCalendarDate] = useState(date);
  const orderDateString =
    orderDate ?
    orderDate.toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}) :
    "";

  // overlay state
  const [overlayShow, setOverlayShow] = useState(false);
  const overlayRef = useRef(null);

  // calendar change handlers
  const calendarMonthChange = (months) => {
    const newMonth = calendarDate.getMonth() + months;
    const newDate = calendarDate.setMonth(newMonth);
    return setCalendarDate(new Date(newDate));
  };

  return (

    <div>

      <InputGroup className="mb-3">

        <FormControl
          readOnly
          disabled
          ref={overlayRef}
          value={orderDateString}
          placeholder="Izaberite datum dostave"/>

        <InputGroup.Append>

          <Button
            onClick={() => setOverlayShow(!overlayShow)}
            variant="outline-secondary">
            <FiCalendar />
          </Button>

        </InputGroup.Append>

      </InputGroup>

      <Overlay
        show={overlayShow}
        target={overlayRef.current}
        placement="bottom">
        <Popover show id="popover-bottom">
          <PopoverTitle>
            <div className="d-flex">
              <div className="flex-grow-1 text-right pr-1">
                <Button
                  variant=""
                  className="p-0"
                  disabled={calendarDate < date}
                  onClick={() => calendarMonthChange(-1)}>
                  <FiChevronsLeft size="2em"/>
                </Button>
              </div>
              <div className="h6 px-1 my-auto">
                {calendarDate.toLocaleString([], {month: 'short', year: 'numeric'})}
              </div>
              <div className="flex-grow-1 pl-1">
                <Button 
                  variant=""
                  className="p-0"
                  onClick={() => calendarMonthChange(+1)}>
                  <FiChevronsRight size="2em"/>
                </Button>
              </div>
            </div>
          </PopoverTitle>
          <PopoverContent>
            <Calendar
              calendarDate={calendarDate}
              deliveries={deliveries}
              onClick={(day) => {
                setOrderDate(day);
                setOverlayShow(!overlayShow);
              }}/>
          </PopoverContent>
        </Popover>
      </Overlay>

    </div>


  )
}

export default DatePicker;
