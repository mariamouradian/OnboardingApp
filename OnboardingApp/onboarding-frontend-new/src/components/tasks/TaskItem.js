import React, { useState } from 'react';
import { taskService } from '../../services/api';

const TaskItem = ({ task, onTaskUpdated }) => { // Добавлен пропс onTaskUpdated
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [loading, setLoading] = useState(false); // Добавлено состояние loading

    const handleComplete = async () => {
        setLoading(true);
        try {
            await taskService.complete(task.id);
            setIsCompleted(true); // Обновляем локальное состояние
            if (onTaskUpdated) {
                onTaskUpdated(); // Вызываем колбэк если передан
            }
        } catch (error) {
            console.error('Error completing task:', error);
            alert('Ошибка при выполнении задачи');
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = async () => {
        if (!task.isSkippable) {
            alert('Эту задачу нельзя пропустить');
            return;
        }

        setLoading(true);
        try {
            await taskService.skip(task.id);
            if (onTaskUpdated) {
                onTaskUpdated(); // Вызываем колбэк если передан
            }
        } catch (error) {
            console.error('Error skipping task:', error);
            alert('Ошибка при пропуске задачи');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = () => {
        if (isCompleted) return { background: '#d4edda', color: '#155724' }; // Используем isCompleted из состояния
        if (task.isSkipped) return { background: '#fff3cd', color: '#856404' };
        return { background: '#d1ecf1', color: '#0c5460' };
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            ...getStatusStyle()
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, flex: 1 }}>{task.title}</h3>
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {isCompleted ? '✅ Выполнено' : // Используем isCompleted из состояния
                        task.isSkipped ? '⏭️ Пропущено' : '⏳ В процессе'}
                </span>
            </div>

            {task.description && (
                <p style={{ margin: '10px 0', color: '#666' }}>{task.description}</p>
            )}

            <div style={{ margin: '10px 0', fontSize: '14px' }}>
                <strong>Время:</strong> {task.startTime} - {task.endTime}
            </div>

            {task.location && (
                <div style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Место:</strong> {task.location}
                </div>
            )}

            {task.contactPerson && (
                <div style={{ margin: '5px 0', fontSize: '14px' }}>
                    <strong>Контактное лицо:</strong> {task.contactPerson}
                </div>
            )}

            {!isCompleted && !task.isSkipped && ( // Используем isCompleted из состояния
                <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleComplete}
                        disabled={loading}
                        style={{
                            padding: '8px 16px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? '...' : 'Выполнить'}
                    </button>

                    {task.isSkippable && (
                        <button
                            onClick={handleSkip}
                            disabled={loading}
                            style={{
                                padding: '8px 16px',
                                background: '#ffc107',
                                color: '#212529',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1
                            }}
                        >
                            {loading ? '...' : 'Пропустить'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default TaskItem;