import React, { FC } from 'react';
import { Calendar } from "antd";
import { IEvent } from "types/IEvent";
import { Moment } from "moment";
import { formatDate } from 'utils/date';

type EventCalendarProps = {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({events}) => {

  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter(ev => ev.date === formatedDate);
  return (
    <div>
      {currentDayEvents.map((ev, i) =>
        <div key={i}>{ev.description}</div>
      )}
    </div>
  );
}

  return (
    <Calendar dateCellRender={dateCellRender}/>
  );
};

export default EventCalendar;