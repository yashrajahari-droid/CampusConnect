
import { useEffect, useState } from "react";

function Planner() {
  const [sessions, setSessions] = useState(() => {
  const savedSessions = localStorage.getItem("sessions");

  if (savedSessions) {
    return JSON.parse(savedSessions);
  }

  return [
    {
      id: 1,
      subject: "Data Structures",
      date: "2026-09-17",
      time: "10:00",
      duration: "2 hours"
    },
    {
      id: 2,
      subject: "Java",
      date: "2026-09-18",
      time: "16:00",
      duration: "1 hour"
    }
  ];
});
       useEffect(() => {
      localStorage.setItem("sessions", JSON.stringify(sessions));
      }, [sessions]);

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  function addSession() {
    if (
      subject.trim() === "" ||
      date === "" ||
      time === "" ||
      duration === ""
    ) {
      return;
    }

    const newSession = {
      id: Date.now(),
      subject: subject,
      date: date,
      time: time,
      duration: duration
    };

    setSessions([...sessions, newSession]);

    setSubject("");
    setDate("");
    setTime("");
    setDuration("");
  }

  function deleteSession(id) {
    setSessions(
      sessions.filter((session) => session.id !== id)
    );
  }

  return (
    <div className="planner-page">
      <h1>Study Planner</h1>

      <p className="page-description">
        Plan and manage your study sessions
      </p>

      <div className="planner-form">

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Duration (e.g. 2 hours)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button onClick={addSession}>
          Add Session
        </button>

      </div>

      <div className="session-list">

        {sessions.map((session) => (

          <div className="session-card" key={session.id}>

            <div>
              <h2>{session.subject}</h2>

              <p>
                Date: {session.date}
              </p>

              <p>
                Time: {session.time}
              </p>

              <p>
                Duration: {session.duration}
              </p>
            </div>

            <button
              className="delete-session"
              onClick={() => deleteSession(session.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>
    </div>
  );
}

export default Planner;

