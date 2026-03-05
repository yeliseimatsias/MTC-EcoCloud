import Header from './Header'
import { Routes, Route } from 'react-router-dom';

import VirtualMachine from './VirtualMachine';

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
      <Header navItems={[{name:'Главная', route: '/'},{name:'Дашборд', route: '/dashboard'}, {name:'Тенанты', route: '/tenants'}]}/>
      <VirtualMachine List={vmList} />
    </>
  )
}

export default App
