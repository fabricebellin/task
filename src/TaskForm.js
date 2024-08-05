import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [task, setTask] = useState('');
  const [showAlert, setShowAlert] = useState(false); // Ajout d'un état pour gérer l'alerte

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onAddTask(task);
      setTask('');
      setShowAlert(false); // Réinitialiser l'alerte si la tâche est valide
    } else {
      setShowAlert(true); // Afficher l'alerte si la tâche est vide
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Ajouter une tâche"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Ajouter</button>

      {/* Alerte */}
      {showAlert && (
        <div className="alert">
          Veuillez préciser le nom de votre tâche à ajouter.
        </div>
      )}
    </form>
  );
}

export default TaskForm;
