import React, { useState, useEffect, useRef } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { Overlay, Popover, PopoverTitle, PopoverContent } from 'react-bootstrap';

import Calendar from './Calendar'

import { FiCalendar, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import getFloorDate from 'util/getFloorDate';
import getServerData from 'util/getServerData';

const DatePicker = ({ deliveryDay, setDeliveryDay }) => {

  // load order & deliveries
  const { order } = getServerData('/api/order');
  const { deliveries } = getServerData('/api/deliveries');

  // set delivery date if already in order
  useEffect(() => {
    if (order?.delivery && deliveries) {
      const delivery = deliveries.find(delivery => delivery._id === order.delivery);
      const date = delivery && getFloorDate(delivery?.from);
      setDeliveryDay(date);
    };
  }, [order, deliveries])

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
    setDeliveryDay(day);
    setOverlayShow(!overlayShow);
  };

  // deliveryDayString
  const deliveryDayString =
    deliveryDay ?
    deliveryDay.toLocaleString([], {day: 'numeric', month: 'numeric', year: 'numeric'}) :
    "";

  return (
    <React.Fragment>
      <InputGroup className="mb-3">
        <FormControl
          readOnly
          disabled
          ref={overlayRef}
          value={deliveryDayString}
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
    </React.Fragment>
  )
}

export default DatePicker;
