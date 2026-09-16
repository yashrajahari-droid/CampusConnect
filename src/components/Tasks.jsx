import { useEffect, useState } from "react";


function Tasks() {

  const [dueDate, setDueDate] = useState("");

const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return [
    {
      id: 1,
      title: "Data Structures Assignment",
      due: "Tomorrow",
      completed: false
    },
    {
      id: 2,
      title: "Java Practical",
      due: "Friday",
      completed: false
    }
  ];
  });
       useEffect(() => {
       localStorage.setItem("tasks", JSON.stringify(tasks));
       }, [tasks]);

  const [newTask, setNewTask] = useState("");


  function getDayName(date) {
       if (!date) {
       return "No deadline";
       }

       const day = new Date(date).toLocaleDateString("en-US", {
       weekday: "long"
       });

     return day;
    }

  function addTask() {

    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask,
      due: getDayName(dueDate),
      completed: false
    };

    setTasks([...tasks, task]);

    setNewTask("");
  }

  function deleteTask(id) {

    setTasks(tasks.filter((task) => task.id !== id));

  }

  function completeTask(id) {

    setTasks(
      tasks.map((task) => {

        if (task.id === id) {

          return {
            ...task,
            completed: !task.completed
          };

        }

        return task;

      })
    );

  }

  return (

    <div className="tasks-page">

      <h1>Tasks</h1>

      <p>Manage your academic tasks</p>

      <div className="add-task">

        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add Task
        </button>

      </div>


      <div className="task-list">

        {tasks.map((task) => (

          <div className="task-item" key={task.id}>

            <div>

              <h3
                className={task.completed ? "task-completed" : ""}
              >
                {task.title}
              </h3>

              <p>
                Due: {task.due}
              </p>

            </div>


            <div className="task-actions">

              <button onClick={() => completeTask(task.id)}>
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button onClick={() => deleteTask(task.id)}>
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Tasks;