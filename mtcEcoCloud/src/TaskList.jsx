import React from 'react';
import './css/TaskList.css';
import Task from './Task';

const TasksList = (props) => {
  const tasks = props.Tasks
  
  return (
    <div className="tasks-list">
      <h2 className="tasks-list__title">Заботьтесь об экологии с EcoCloud:</h2>
      <ul className="tasks-list__items">
        {tasks.map(task => (
          <Task  Id={task.id} Points={task.points}>{task.title}</Task>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;