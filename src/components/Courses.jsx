import { useEffect, useState } from "react";

function Courses() {

  const [courses, setCourses] = useState(() => {
  const savedCourses = localStorage.getItem("courses");

  if (savedCourses) {
    return JSON.parse(savedCourses);
  }

  return [
    {
      id: 1,
      name: "Data Structures",
      attendance: 85
    },
    {
      id: 2,
      name: "Java",
      attendance: 70
    },
    {
      id: 3,
      name: "Data Science",
      attendance: 60
    }
  ];
});

        useEffect(() => {
      localStorage.setItem("courses", JSON.stringify(courses));
     }, [courses]);

  const [courseName, setCourseName] = useState("");
  const [attendance, setAttendance] = useState("");


  function addCourse() {

    if (courseName.trim() === "" || attendance === "") {
      return;
    }

    const newCourse = {
      id: Date.now(),
      name: courseName,
      attendance: Number(attendance)
    };

    setCourses([...courses, newCourse]);

    setCourseName("");
    setAttendance("");
  }


  function deleteCourse(id) {

    setCourses(
      courses.filter((course) => course.id !== id)
    );

  }


  return (

    <div className="courses-page">

      <h1>Courses</h1>

      <p className="page-description">
        Manage your courses and attendance
      </p>


      {/* Add Course */}

      <div className="course-form">

        <input
          type="text"
          placeholder="Course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />


        <input
          type="number"
          placeholder="Attendance %"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        />


        <button onClick={addCourse}>
          Add Course
        </button>

      </div>


      {/* Course List */}

      <div className="course-list">

        {courses.map((course) => (

          <div className="course-card" key={course.id}>

            <div className="course-info">

              <h2>
                {course.name}
              </h2>

              <p>
                Attendance: {course.attendance}%
              </p>

            </div>


            <div className="course-progress">

              <div className="progress">

                <div
                  className="progress-bar"
                  style={{
                    width: `${course.attendance}%`
                  }}
                ></div>

              </div>

              <span>
                {course.attendance}%
              </span>

            </div>


            <button
              className="delete-course"
              onClick={() => deleteCourse(course.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Courses;