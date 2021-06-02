
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
// eslint-disable-next-line react/prefer-stateless-function

function formatEvents(tasks) {
  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };
  const formattedEvents = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const task of tasks) {
    const title = task.name;
    const stringStart = JSON.stringify(task.dueDate);
    const splitStart = stringStart.split(' ');
    const month = months[splitStart[2]];
    const color = task.color.hex;
    let start = '';
    start += splitStart[3];
    start += '-';
    start += month;
    start += '-';
    start += splitStart[1];
    start += 'T';
    start += splitStart[4];
    formattedEvents.push({ title, start, color });
  }
  return formattedEvents;
}

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: {} };
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:5000/Calendar');
      console.log(response.data.tasks);
      this.setState({ events: formatEvents(response.data.tasks) });
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
    }
  }

  render() {
    const { events } = this.state;
    console.log(events);
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    );
  }
}