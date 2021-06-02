import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// eslint-disable-next-line react/prefer-stateless-function
export default class Calendar extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        green="#154734"
        events={[
          {
            title: 'CPE 307: Midterm 2',
            start: '2021-05-26T10:30:00',
            color: 'green',
          },
          {
            title: 'CPE 316: Midterm 2',
            start: '2021-05-17T12:00:00',
            color: 'green',
          },
          /*
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2021-05-28',
            color: 'green',
          },
          */
        ]}
        /*
        events={[
          { title: 'CSC 307: Midterm 2', date: '2021-05-26' },
          { title: 'CPE 316: Midterm 2', date: '2021-05-17' },
        ]}
        eventColor="#378006"
        */
      />
    );
  }
}
