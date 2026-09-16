import { useEffect, useState } from "react";
import "./App.css";

import Tasks from "./components/Tasks";
import Courses from "./components/Courses";
import Planner from "./components/Planner";
import Notes from "./components/Notes";

function App() {
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [courseCount, setCourseCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [studyHours, setStudyHours] = useState(0);

  useEffect(() => {
  const courses = JSON.parse(
    localStorage.getItem("courses") || "[]"
  );

  const tasks = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );

  setCourseCount(courses.length);
      if (courses.length > 0) {
  const total = courses.reduce(
    (sum, course) => sum + course.attendance,
    0
  );

  setAttendance(Math.round(total / courses.length));

 } 

  const sessions = JSON.parse(
  localStorage.getItem("sessions") || "[]"
);

let totalHours = 0;

sessions.forEach((session) => {
  const number = parseFloat(session.duration);

  if (!isNaN(number)) {
    totalHours = totalHours + number;
  }
});

setStudyHours(totalHours);

  setPendingTasks(
    tasks.filter((task) => !task.completed).length
  );
  }, [page]);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <aside className="sidebar">

        <h2>CampusConnect</h2>

        <nav>

          <button onClick={() => setPage("dashboard")}>
            Dashboard
          </button>

          <button onClick={() => setPage("tasks")}>
            Tasks
          </button>

          <button onClick={() => setPage("courses")}>
            Courses
          </button>

          <button onClick={() => setPage("planner")}>
            Study Planner
          </button>

          <button onClick={() => setPage("notes")}>
            Notes
          </button>

        </nav>

      </aside>


      <main className="main-content">

        {page === "dashboard" && (
          <div>

            <header className="navbar">
              <button
                 className="theme-button"
                  onClick={() => setDarkMode(!darkMode)}
              >
                 {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              

              <div>
                <h1>Dashboard</h1>

                <p>
                  Welcome back! Here's your academic overview.
                </p>
              </div>

              <div className="profile">

                <div className="avatar">
                  Y
                </div>

                <span>
                  Student
                </span>

              </div>

            </header>


            <section className="stats">

              <div className="card">
                <h3>Total Courses</h3>
                <p className="number">{courseCount}</p>
              </div>

              <div className="card">
                <h3>Pending Tasks</h3>
                <p className="number">{pendingTasks}</p>
              </div>

              <div className="card">
                <h3>Attendance</h3>
                <p className="number">{attendance}%</p>
              </div>

              <div className="card">
                <h3>Study Hours</h3>
                <p className="number">{studyHours}</p>
              </div>

            </section>


            <section className="content-grid">

              <div className="panel">

                <h2>Upcoming Tasks</h2>

                <div className="task">

                  <div>
                    <h3>Data Structures Assignment</h3>
                    <p>Due tomorrow</p>
                  </div>

                  <span className="pending">
                    Pending
                  </span>

                </div>


                <div className="task">

                  <div>
                    <h3>Java Practical</h3>
                    <p>Due Friday</p>
                  </div>

                  <span className="pending">
                    Pending
                  </span>

                </div>

              </div>


              <div className="panel">

                <h2>Course Progress</h2>

                <div className="course">

                  <div className="course-header">
                    <span>Data Structures</span>
                    <span>85%</span>
                  </div>

                  <div className="progress">

                    <div
                      className="progress-bar"
                      style={{ width: "85%" }}
                    ></div>

                  </div>

                </div>


                <div className="course">

                  <div className="course-header">
                    <span>Java</span>
                    <span>70%</span>
                  </div>

                  <div className="progress">

                    <div
                      className="progress-bar"
                      style={{ width: "70%" }}
                    ></div>

                  </div>

                </div>

              </div>

            </section>

          </div>
        )}


        {page === "tasks" && (
          <Tasks />
        )}


        {page === "courses" && (
          <Courses />
        )}


        {page === "planner" && (
          <Planner />
        )}


        {page === "notes" && (
          <Notes />
        )}

      </main>

    </div>
  );
}

export default App;

