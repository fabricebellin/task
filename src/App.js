import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks.map((task, index) => ({ ...task, initialIndex: index })));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false, initialIndex: tasks.length },
    ]);
  };

  const toggleComplete = (id) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );

      updatedTasks.sort((a, b) => {
        if (a.completed === b.completed) {
          return a.initialIndex - b.initialIndex;
        } else {
          return a.completed ? 1 : -1;
        }
      });

      return updatedTasks;
    });
  };

  const deleteTask = (id) => {
    const shouldDelete = window.confirm("Voulez-vous vraiment supprimer cette tâche ?");
    if (shouldDelete) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const deleteAllTasks = () => {
    const shouldDelete = window.confirm("Voulez-vous vraiment supprimer toutes les tâches ?");
    if (shouldDelete) {
      setTasks([]);
    }
  };

  return (
    <div>
      <div className="App">
        <h1>Ma liste de tâches</h1>
        <TaskForm onAddTask={addTask} onDeleteAll={deleteAllTasks} tasks={tasks} />
        <ul>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
