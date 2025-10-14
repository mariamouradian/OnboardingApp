import React, { useState, useEffect } from 'react';
import { taskService } from '../../services/api';
import TaskItem from '../tasks/TaskItem';
import Loading from '../common/Loading';

const EmployeeTasks = ({ employee, onBack }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadTasks = async () => {
        try {
            const response = await taskService.getByEmployee(employee.id);
            setTasks(response.data);
        } catch (error) {
            console.error('Error loading tasks:', error);
            alert('Ошибка при загрузке задач');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, [employee.id]);

    const handleTaskUpdated = () => {
        loadTasks();
    };

    if (loading) return <Loading />;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
                <button
                    onClick={onBack}
                    style={{
                        padding: '8px 15px',
                        background: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    ← Назад
                </button>
                <h1>Задачи сотрудника: {employee.firstName} {employee.lastName}</h1>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                {tasks.length === 0 ? (
                    <p>Нет задач для этого сотрудника</p>
                ) : (
                    tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onTaskUpdated={handleTaskUpdated}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default EmployeeTasks;