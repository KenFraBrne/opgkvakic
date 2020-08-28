import React, { useState, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Overlay, Popover, PopoverTitle, PopoverContent } from 'react-bootstrap';

import Calendar from './Calendar'

import { FiCalendar, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

const DatePicker = ({deliveries, orderDate, setOrderDate}) => {

  // dates
  const nowDate = new Date();
  const [calendarDate, setCalendarDate] = useState(nowDate);

  // overlay state
  const [overlayShow, setOverlayShow] = useState(false);
  const overlayRef = useRef(null);

  // calendar event handlers
  const calendarMonthChange = (months) => {
    const newMonth = calendarDate.getMonth() + months;
    const nowDate = calendarDate.setMonth(newMonth);
    setCalendarDate(new Date(nowDate));
  };

  const calendarDayChoose = (day) => {
    setOrderDate(day);
    setOverlayShow(!overlayShow);
  };

  // orderDateString
  const orderDateString =
    orderDate ?
    orderDate.toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}) :
    "";

  return (

    <Container fluid className="d-flex px-0 py-2">

      <div className="h4 pr-3">Dostava:</div>

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
                    disabled={calendarDate < nowDate}
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
                deliveries={deliveries}
                calendarDate={calendarDate}
                calendarDayChoose={(day) => calendarDayChoose(day)}/>
            </PopoverContent>

          </Popover>
        </Overlay>

      </div>

    </Container>



  )
}

export default DatePicker;
