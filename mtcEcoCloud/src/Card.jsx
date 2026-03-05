import React, { useState } from 'react';
import Button from './Button';
import './css/Card.css';

const Card = ({ vm, onDelete, onEdit, isModalCard = false }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();   // предотвращаем выделение карточки
    if (onEdit) {
      onEdit(vm);          // вызываем функцию родителя, передаём данные VM
    }
  };

  return (
    <div 
      className={`selectable-card ${isSelected ? 'selectable-card--active' : ''}`}
      onClick={handleCardClick}
    >
      <div className="vm-card">
        <div className="vm-card__name">VM: {vm.name}</div>
        <div className="vm-card__specs">
          <div className="vm-card__spec">CPU: {vm.cpu} vCPU ({vm.cpuUsage}%)</div>
          <div className="vm-card__spec">RAM: {vm.ram}GB ({vm.ramUsed}GB used)</div>
          <div className="vm-card__spec">Диск: {vm.disk}GB ({vm.diskType})</div>
          <div className="vm-card__spec">Режим: {vm.mode}</div>
        </div>
      </div>

      {isSelected && (
        <div className="selectable-card__actions" onClick={(e) => e.stopPropagation()}>
          {isModalCard ? (
            <>
              <Button variant="primary" className="btn-mini">Эко-режим</Button>
              <Button variant="outline" className="btn-mini">Стандарнтный режим</Button>
            </>
          ) : (
            <>
              <Button 
                variant="primary" 
                className="btn-delete-full"
                onClick={() => onDelete(vm.name)}
              >
                УДАЛИТЬ
              </Button>

              <Button 
                variant="outline" 
                className="btn-change-full"
                onClick={handleEditClick}       // ← добавляем обработчик
              >
                ИЗМЕНИТЬ
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;