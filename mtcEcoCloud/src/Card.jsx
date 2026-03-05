import React, { useState } from 'react';
import Button from './Button';
import './css/Card.css'

const Card = ({ vm, onDelete, isModalCard = false }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleCardClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div 
            className={`selectable-card ${isSelected ? 'selectable-card--active' : ''}`}
            onClick={handleCardClick}
        >
            {/* Рендерим вашу базовую карточку */}
            <div className="vm-card">
            <div className="vm-card__name">VM: {vm.name}</div>
            <div className="vm-card__specs">
                <div className="vm-card__spec">CPU: {vm.cpu} vCPU ({vm.cpuUsage}%)</div>
                <div className="vm-card__spec">RAM: {vm.ram}GB ({vm.ramUsed}GB used)</div>
                <div className="vm-card__spec">Диск: {vm.disk}GB ({vm.diskType})</div>
            </div>
            </div>

            {/* Если карточка выбрана, показываем панель управления */}
            {isSelected && (
                <div className="selectable-card__actions" onClick={(e) => e.stopPropagation()}>
                    {isModalCard ? (
                        // Кнопки для модалки (добавление/настройка)
                        <>
                            <Button variant="primary" className="btn-mini">КНОПКА 1</Button>
                            <Button variant="primary" className="btn-mini">КНОПКА 2</Button>
                            <Button variant="primary" className="btn-mini">КНОПКА 3</Button>
                        </>
                    ) : (
                        // Кнопка для основного списка (удаление)
                        <Button 
                            variant="primary" 
                            className="btn-delete-full"
                            onClick={() => onDelete(vm.name)}
                        >
                            УДАЛИТЬ ИЗ СПИСКА
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Card;