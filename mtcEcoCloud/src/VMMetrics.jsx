import {useState} from 'react'
import Button from './Button';

const VMMetrics = () => {


  const [activeMode, setActiveMode] = useState('eco');
  
  return (
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
        {/* Можно сделать еще один массив и мапить эти строки, если их станет много */}
        <MetricRow label="Использование ЦП" value="45%" />
        <MetricRow label="Загрузка памяти" value="62%" />
        <MetricRow label="Сеть" value="1.2 Гб/с" />
      </div>

      <div className="vm-mode-toggle">
        <Button 
        variant="outline" 
        isActive={activeMode === 'eco'} 
        onClick={() => setActiveMode('eco')}
        >
        Эко-режим
        </Button>

        <Button 
        variant="outline" 
        isActive={activeMode === 'standard'} 
        onClick={() => setActiveMode('standard')}
        >
        Стандартный режим
        </Button>

        <Button 
        variant="outline" 
        isActive={activeMode === 'perf'} 
        onClick={() => setActiveMode('perf')}
        >
        Производительный режим
        </Button>
      </div>
    </div>
  );
};

const MetricRow = ({ label, value }) => (
  <div className="vm-metric">
    <div className="vm-metric__row">
      <span className="vm-metric__label">{label}</span>
      <span className="vm-metric__value">{value}</span>
    </div>
  </div>
);

export default VMMetrics;