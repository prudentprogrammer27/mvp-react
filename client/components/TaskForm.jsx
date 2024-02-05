import React, { useState } from 'react';

const TaskForm = ({ onTaskSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: inputValue }),
        });

        if (response.ok) {
          const newTask = await response.json();
          onTaskSubmit(newTask); // Invoke the callback function passed from App
          setInputValue(''); // Clear the input field after successful submission
        } else {
          console.error('Failed to submit task:', response.status);
        }
      } catch (error) {
        console.error('Error submitting task:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="inputBox">
        Enter a new task:
        <input
          type="text"
          id="inputBox"
          name="inputBox"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;

