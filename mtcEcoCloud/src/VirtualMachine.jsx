import './css/VirtualMachine.css'
import VMCard from './VMCard'
import VMMetrics from './VMMetrics'
import { useState } from 'react'
import Button from './Button'
import Modal from './Modal' // 1. Обязательно добавь импорт!

const VirtualMachine = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const availableVMs = [
        { name: 'New_App_Server', cpu: 1, ram: 2, disk: 40, diskType: 'SSD', status: 'off', statusText: 'Доступна' },
        { name: 'Backup_Node', cpu: 2, ram: 4, disk: 1000, diskType: 'HDD', status: 'off', statusText: 'Доступна' }
    ];

    const vmList = props.List;

    return (
        <div className="vm">
            <div className="vm__left">
                <h1 className="vm__title">Ваши виртуальные машины</h1>
                <div className="vm__cards">
                    {vmList.map((vm) => (
                        <VMCard key={vm.name} vm={vm} />
                    ))}
                </div>
                
                <div className="vm__actions">
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        + ДОБАВИТЬ VM
                    </Button>

                    <Button variant="outline" className="vm__btn">
                        ИЗМЕНИТЬ ВМ
                    </Button>
                </div>
            </div>

            {/* 2. VMMetrics должен быть внутри <div className="vm">, но после vm__left */}
            <VMMetrics />

            {/* 3. Modal тоже помещаем внутрь общего контейнера */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Доступные конфигурации"
            >
                <div className="vm-modal-grid">
                    {availableVMs.map(vm => (
                        <div key={vm.name} className="modal-card-wrapper" onClick={() => console.log('Выбрана:', vm.name)}>
                            <VMCard vm={vm} />
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default VirtualMachine;

