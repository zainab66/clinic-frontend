import Axios from 'axios';
const baseURL = 'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

export const addEvent = async (
  eventTitle,
  eventDescription,
  startDate,
  endDate
) => {
  const response = await Axios.post(
    `${baseURL}/event/addEvent`,
    {
      eventTitle,
      eventDescription,
      startDate,
      endDate,
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};

export const getEventList = async () => {
  const response = await Axios.get(`${baseURL}/event/getEvents`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  const convertedDates = await response.data.events.map((event) => {
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      id: event._id,
      describe: event.describe,
    };
  });
  return convertedDates;
};

export const deleteEvent = async (eventId) => {
  const response = await Axios.delete(
    `${baseURL}/event/${eventId}`,

    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};

export const editEvent = async (event) => {
  const response = await Axios.put(`${baseURL}/event/${event.eventId}`, event, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};
