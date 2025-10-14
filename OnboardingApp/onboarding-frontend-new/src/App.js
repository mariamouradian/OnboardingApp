import React, { useState, useEffect } from 'react';
import Layout from './components/common/Layout';
import DepartmentList from './components/departments/DepartmentList';
import EmployeeList from './components/employees/EmployeeList';
import { testService } from './services/api';

function App({ onAppReady }) {
    const [currentView, setCurrentView] = useState('employees');
    const [appReady, setAppReady] = useState(false);

    useEffect(() => {
        // Сообщаем, что приложение готово
        setAppReady(true);
        if (onAppReady) {
            onAppReady();
        }
    }, [onAppReady]);

    const handleTestMessage = async () => {
        try {
            await testService.testMessage();
            alert('Тестовое сообщение отправлено!');
        } catch (error) {
            console.error('Error sending test message:', error);
            alert('Ошибка при отправке тестового сообщения');
        }
    };

    return (
        <Layout>
            <div style={{
                marginBottom: '20px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                opacity: appReady ? 1 : 0,
                transition: 'opacity 0.3s ease-in'
            }}>
                <button
                    onClick={() => setCurrentView('employees')}
                    style={{
                        padding: '10px 20px',
                        background: currentView === 'employees' ? '#1976d2' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: "'Roboto', sans-serif"
                    }}
                >
                    Сотрудники
                </button>
                <button
                    onClick={() => setCurrentView('departments')}
                    style={{
                        padding: '10px 20px',
                        background: currentView === 'departments' ? '#1976d2' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: "'Roboto', sans-serif"
                    }}
                >
                    Подразделения
                </button>
                <button
                    onClick={handleTestMessage}
                    style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontFamily: "'Roboto', sans-serif"
                    }}
                >
                    Тест Express.ms
                </button>
            </div>

            <div style={{
                opacity: appReady ? 1 : 0,
                transition: 'opacity 0.3s ease-in',
                transitionDelay: '0.1s'
            }}>
                {currentView === 'employees' && <EmployeeList />}
                {currentView === 'departments' && <DepartmentList />}
            </div>

            {/* Fallback текст на случай очень медленной загрузки */}
            {!appReady && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        fontSize: '18px',
                        color: '#666',
                        fontFamily: "'Roboto', sans-serif"
                    }}>
                        Загрузка приложения...
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default App;