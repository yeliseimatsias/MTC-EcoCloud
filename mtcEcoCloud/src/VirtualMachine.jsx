import './css/VirtualMachine.css'
import VMMetrics from './VMMetrics'
import { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import Card from './Card'

const VirtualMachine = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [myVMs, setMyVMs] = useState(props.List || []);
    
    const availableVMs = [
        { name: 'New_App_Server', cpu: 1, ram: 2, disk: 40, diskType: 'SSD', status: 'off', statusText: 'Доступна' },
        { name: 'Backup_Node', cpu: 2, ram: 4, disk: 1000, diskType: 'HDD', status: 'off', statusText: 'Доступна' }
    ];

    const handleDelete = (name) => {
        setMyVMs(myVMs.filter(vm => vm.name !== name));
    };

    return (
        <div className="vm">
            <div className="vm__left">
                <h1 className="vm__title">Ваши виртуальные машины</h1>
                <div className="vm__cards">
                    {myVMs.map((vm) => (
                        <Card key={vm.name} vm={vm} onDelete={handleDelete} />
                    ))}
                </div>
                
                <div className="vm__actions">
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>+ ДОБАВИТЬ VM</Button>
                    <Button variant="outline" className="vm__btn">ИЗМЕНИТЬ ВМ</Button>
                </div>
            </div>

            <VMMetrics />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Доступные конфигурации">
                <div className="vm-modal-grid">
                    {availableVMs.map(vm => (
                        <Card key={vm.name} vm={vm} isModalCard={true} />
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default VirtualMachine;

