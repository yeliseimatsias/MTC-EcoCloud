import { useState } from 'react'
import Header from './Header'

function App() {

  return (
    <Header navItems={['Панель управления', 'Виртуальные серверы', 'Сети', 'Хранилище', 'Мониторинг']}/>
    
  )
}

export default App
