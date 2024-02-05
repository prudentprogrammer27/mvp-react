import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const tasksData = await response.json();
        setTasks(tasksData);
      } else {
        console.error('Failed to fetch tasks:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to handle task submission
  const handleTaskSubmit = async (newTask) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: newTask }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, updatedTask]);
      } else {
        console.error('Failed to submit task:', response.status);
      }
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  // Fetch tasks on initial component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      {/* Display existing tasks */}
      <h2>Tasks:</h2>
      <ul>
        {tasks.map((task) => (
          <li className="task" key={task.id}>
            {task.description}
          </li>
        ))}
      </ul>

      {/* TaskForm component for adding new tasks */}
      <TaskForm onTaskSubmit={handleTaskSubmit} />
    </div>
  );
};

export default App;
