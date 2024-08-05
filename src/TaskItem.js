import React from 'react';

function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #eee',
      }}
    >
      <span
        onClick={() => onToggleComplete(task.id)}
        style={{
          flexGrow: 1,
          marginRight: '10px',
          textDecoration: task.completed ? 'line-through' : 'none',
          textDecorationThickness: task.completed ? '3px' : 'auto',
          textDecorationColor: task.completed ? 'red' : 'inherit',
          color: task.completed ? '#999' : 'inherit',
        }}
      >
        {task.text}
      </span>
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={() => onToggleComplete(task.id)}>
          {task.completed ? 'Invalider' : 'Valider'}
        </button>
        <button onClick={() => onDelete(task.id)}>Supprimer</button>
      </div>
    </li>
  );
}

export default TaskItem;
