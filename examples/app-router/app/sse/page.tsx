"use client";

import { useEffect, useState } from "react";

export default function SSE() {
  const [events, setEvents] = useState<any[]>([]);

  console.log("~~SSE");
  useEffect(() => {
    const e = new EventSource("/api/sse");

    e.onmessage = (msg) => {
      console.log(msg);
      const data = JSON.parse(msg.data);
      if (data.message === "close") {
        e.close();
        console.log("closing");
      }
      setEvents((prev) => prev.concat(data));
    };
  }, []);

  return (
    <>
      <h1>Server Sent Event</h1>
      {events.map((e, i) => (
        <div key={i}>
          Message {i}: {JSON.stringify(e)}
        </div>
      ))}
    </>
  );
}
