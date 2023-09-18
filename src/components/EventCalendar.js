import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomEvent from "./CustomEvent";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../services/auth";
import { toast } from "react-toastify";
const localizer = momentLocalizer(moment);

const EventCalendar = ({ changes, fetchChanges }) => {
  const { token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the API endpoint URL
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_global_url}/api/get-user-events`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log("event data", response.data.subscriptions);
        setEvents(response.data.subscriptions);
        setLoading(false);
      })
      .catch((error) => {
        console.log("server Error", error);
        toast.error("Internal server Error");
      });
  }, [changes, token, fetchChanges]); // Empty dependency array to run the effect only once

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to format date strings in the events array
  const formatEvents = (events) => {
    return events.map((event) => {
      // Parse the date strings and format them
      const formattedStart = moment(event.start, "YYYY-MM-DD").toDate();
      const formattedEnd = moment(event.end, "YYYY-MM-DD").toDate();

      // Return the event object with formatted dates
      return {
        ...event,
        start: formattedStart,
        end: formattedEnd,
      };
    });
  };

  const formattedEvents = formatEvents(events); // Format the events
  // console.log(events);
  return (
    <div
      style={{
        height: "650px",
      }}
    >
      <Calendar
        localizer={localizer}
        events={formattedEvents}
        startAccessor="start"
        endAccessor="end"
        components={{
          event: CustomEvent,
        }}
      />
    </div>
  );
};

export default EventCalendar;
