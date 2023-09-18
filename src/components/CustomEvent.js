import React from "react";

const CustomEvent = ({ event }) => (
  <div className="event_details">
    <span
      className="event_category_color"
      style={{ background: event.color }}
    ></span>
    <span className="event_title">{event.title}</span>
    {/* <span style={{ marginLeft: "26px" }}>{event.description}</span> */}
  </div>
);

export default CustomEvent;
