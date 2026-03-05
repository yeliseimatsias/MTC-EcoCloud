import React from 'react';
import './css/EcoContributions.css'; 

const EcoContributions = () => {
  const co2Saved = 20;
  const co2Goal = 100;
  const percentage = Math.round((co2Saved / co2Goal) * 100);
  const trees = co2Saved/20
  const ecomod = 0;
  const ecomoves = 0;
  const energy = 0;

  return (
    <div className="eco-card">
      <h2 className="eco-title">🌿 Ваш вклад в экологию</h2>
      
      <div className="eco-stats-grid">
        <div className="eco-stat-item">
          <span className="stat-label">Сэкономлено СО2</span>
          <span className="stat-value">{co2Saved} кг</span>
        </div>
        <div className="eco-stat-item">
          <span className="stat-label">Спасено деревьев</span>
          <span className="stat-value">{trees}</span>
        </div>
        <div className="eco-stat-item">
          <span className="stat-label">Использование эко-режима</span>
          <span className="stat-value">{ecomod}%</span>
        </div>
        <div className="eco-stat-item">
          <span className="stat-label">Выполнено эко-действий</span>
          <span className="stat-value">{ecomoves}</span>
        </div>
        <div className="eco-stat-item">
          <span className="stat-label">Сэкономлено электроэнергии</span>
          <span className="stat-value">{energy} КВт</span>
        </div>
      </div>

      <div className="eco-goal">
        <div className="goal-header">
          <span className="goal-label">Цель: {co2Goal} кг СО2</span>
          <span className="goal-percentage">{percentage}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        <div className="goal-stats">
          {co2Saved} / {co2Goal} кг
        </div>
      </div>
    </div>
  );
};

export default EcoContributions;