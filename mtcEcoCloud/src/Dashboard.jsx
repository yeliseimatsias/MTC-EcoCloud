import Header from "./Header"
import ServerMetrics from "./ServerMetrics"
import VMMetrics from "./VMMetrics"

const Dashboard = () => {
    return (
       <>
            <Header navItems={[{name:'Главная', route: '/'},{name:'Дашборд', route: '/dashboard'}, {name:'Тенанты', route: '/tenants'}]}/>
            <VMMetrics />
            <ServerMetrics />
       </>
    )
}

export default Dashboard