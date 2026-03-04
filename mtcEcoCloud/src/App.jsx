import { useState } from 'react'
import Header from './Header'
import './css/App.css'

function App() {

  
  const vmList = [
    {
      name: 'Web_Server_01',
      cpu: 2,
      cpuUsage: 35,
      ram: 8,
      ramUsed: 4.2,
      disk: 100,
      diskType: 'SSD',
      status: 'on',
      statusText: 'Включена (On)',
    },
    {
      name: 'DB_Replica_03',
      cpu: 4,
      cpuUsage: 60,
      ram: 16,
      ramUsed: 10,
      disk: 500,
      diskType: 'NVMe',
      status: 'on',
      statusText: 'Включена (On)',
    },
    {
      name: 'Test_Env_App',
      cpu: 1,
      cpuUsage: 0,
      ram: 4,
      ramUsed: 0,
      disk: 50,
      diskType: 'SSD',
      status: 'off',
      statusText: 'Выключена (Off)',
    },
  ]

  return (
    <>
      <Header />
      
      <div className="vm">
      <div className="vm__left">
        <h1 className="vm__title">Виртуальные машины</h1>
        <div className="vm__cards">
          {vmList.map((vm) => (
            <div key={vm.name} className="vm-card">
              <div className="vm-card__name">VM: {vm.name}</div>
              <div className="vm-card__specs">
                <div className="vm-card__spec">CPU: {vm.cpu} vCPU ({vm.cpuUsage}%)</div>
                <div className="vm-card__spec">RAM: {vm.ram}GB ({vm.ramUsed}GB used)</div>
                <div className="vm-card__spec">Диск: {vm.disk}GB ({vm.diskType})</div>
              </div>
              <div className={`vm-card__status vm-card__status--${vm.status}`}>
                {vm.statusText}
              </div>
            </div>
          ))}
        </div>
        <div className="vm__actions">
          <button className="vm__btn vm__btn--primary">+ ДОБАВИТЬ VM</button>
          <button className="vm__btn vm__btn--secondary">ИЗМЕНИТЬ VM</button>
        </div>
      </div>
      <div className="vm__right">
        <div className="vm-eco">
          <span className="vm-eco__label">Эко-рейтинг:</span>
          <span className="vm-eco__value">92%</span>
        </div>
        <div className="vm-eco-details">
          <div className="vm-eco-details__item">
            <span>Экологическая эффективность:</span>
          </div>
          <div className="vm-eco-details__item">
            <span>PUE: 1.15</span>
            <span>CO₂ Сэкономлено: 1.4 т</span>
          </div>
        </div>
        <div className="vm-metrics">
          <div className="vm-metric">
            <div className="vm-metric__row">
              <span className="vm-metric__label">Использование ЦП</span>
              <span className="vm-metric__value">45%</span>
            </div>
          </div>
          <div className="vm-metric">
            <div className="vm-metric__row">
              <span className="vm-metric__label">Загрузка памяти</span>
              <span className="vm-metric__value">62%</span>
            </div>
          </div>
          <div className="vm-metric">
            <div className="vm-metric__row">
              <span className="vm-metric__label">Сеть</span>
              <span className="vm-metric__value">1.2 Гб/с</span>
            </div>
          </div>
        </div>

        {/* Переключатели режимов */}
        <div className="vm-mode-toggle">
          <button className="vm-mode-toggle__btn vm-mode-toggle__btn--active">Эко-режим</button>
          <button className="vm-mode-toggle__btn">Стандартный режим</button>
          <button className="vm-mode-toggle__btn">Производительный режим</button>
          
        </div>
      </div>
    </div>
    </>
  )
}

export default App
