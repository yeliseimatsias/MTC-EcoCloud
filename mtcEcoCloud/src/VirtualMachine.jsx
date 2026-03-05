import './css/VirtualMachine.css'
import VMMetrics from './VMMetrics'
import { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import Card from './Card'
import TasksList from './TaskList'

const VirtualMachine = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);       
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [editingVM, setEditingVM] = useState(null);              
    const [myVMs, setMyVMs] = useState(props.List || []);
    
    const availableVMs = [
        { name: 'New_App_Server', cpu: 1, ram: 2, disk: 40, diskType: 'SSD'},
        { name: 'Backup_Node', cpu: 2, ram: 4, disk: 1000, diskType: 'HDD'}
    ];

    const tasks = [
        { id: 1, title: 'Включите эко-режим на ВМ', points: 5 },
        { id: 2, title: 'Выключите ВМ на ночь', points: 5 },
        { id: 3, title: 'Создайте ВМ в эко-режиме', points: 5 },
    ];

    const handleDelete = (name) => {
        setMyVMs(myVMs.filter(vm => vm.name !== name));
    };

    const handleEdit = (vm) => {
        setEditingVM(vm);
        setIsEditModalOpen(true);
    };

    const handleEditSave = (updatedVM) => {
        setMyVMs(myVMs.map(vm => vm.name === updatedVM.name ? updatedVM : vm));
        setIsEditModalOpen(false);
        setEditingVM(null);
    };

    return (
        <div className="vm">
            <div className="vm__left">
                <h1 className="vm__title">Ваши виртуальные машины</h1>
                <div className="vm__cards">
                    {myVMs.map((vm) => (
                        <Card 
                            key={vm.name} 
                            vm={vm} 
                            onDelete={handleDelete} 
                            onEdit={handleEdit}   // ← теперь передаём!
                        />
                    ))}
                </div>
                
                <div className="vm__actions">
                    <Button variant="eco" onClick={() => setIsModalOpen(true)}>+ ДОБАВИТЬ ВM</Button>
                </div>
            </div>
            
            <TasksList Tasks={tasks}/>

            {/* Модалка для добавления ВМ */}
            <Modal needButtons={true} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Доступные конфигурации">
                <div className="vm-modal-grid">
                    {availableVMs.map(vm => (
                        <Card key={vm.name} vm={vm} isModalCard={true} />
                    ))}
                </div>
               
            </Modal>

            <Modal needButtons={false} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Редактирование ВМ">
            {editingVM && (
                <div className="edit-vm-form">
                <h3>Редактирование {editingVM.name}</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleEditSave(editingVM); }}>
                    <div className="form-row">
                    <label>CPU (vCPU):</label>
                    <input 
                        type="number" 
                        value={editingVM.cpu} 
                        onChange={(e) => setEditingVM({...editingVM, cpu: e.target.value})}
                    />
                    </div>

                    <div className="form-row">
                    <label>RAM (GB):</label>
                    <input 
                        type="number" 
                        value={editingVM.ram} 
                        onChange={(e) => setEditingVM({...editingVM, ram: e.target.value})}
                    />
                    </div>

                    <div className="form-row">
                    <label>Диск (GB):</label>
                    <input 
                        type="number" 
                        value={editingVM.disk} 
                        onChange={(e) => setEditingVM({...editingVM, disk: e.target.value})}
                    />
                    </div>

                    <div className="form-row">
                    <label>Тип диска:</label>
                    <select 
                        value={editingVM.diskType} 
                        onChange={(e) => setEditingVM({...editingVM, diskType: e.target.value})}
                    >
                        <option>SSD</option>
                        <option>HDD</option>
                    </select>
                    </div>

                    <div className="button-group">
                    <Button type="submit">Сохранить</Button>
                    <Button type="button" onClick={() => setIsEditModalOpen(false)}>Отмена</Button>
                    </div>
                </form>
                </div>
            )}
            </Modal>
        </div>
    );
};

export default VirtualMachine;