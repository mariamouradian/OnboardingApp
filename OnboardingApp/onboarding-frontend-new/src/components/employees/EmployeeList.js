import React, { useState, useEffect } from 'react';
import { employeeService } from '../../services/api';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeTasks from './EmployeeTasks';
import Loading from '../common/Loading';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const loadEmployees = async () => {
        try {
            const response = await employeeService.getAll();
            setEmployees(response.data);
        } catch (error) {
            console.error('Error loading employees:', error);
            alert('Ошибка при загрузке сотрудников');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEmployees();
    }, []);

    const handleEmployeeAdded = () => {
        loadEmployees();
        setShowAddModal(false);
    };

    const handleViewTasks = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleBackToList = () => {
        setSelectedEmployee(null);
    };

    if (loading) return <Loading />;

    if (selectedEmployee) {
        return (
            <EmployeeTasks
                employee={selectedEmployee}
                onBack={handleBackToList}
            />
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Сотрудники</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        padding: '10px 20px',
                        background: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Добавить сотрудника
                </button>
            </div>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: 'white'
            }}>
                <thead>
                    <tr style={{ background: '#f0f0f0' }}>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>ID</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Имя</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Фамилия</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Должность</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Подразделение</th>
                        <th style={{ padding: '10px', border: '1px solid #ccc' }}>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{employee.id}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{employee.firstName}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{employee.lastName}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{employee.position}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>{employee.email}</td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                {employee.department?.name || 'Не указано'}
                            </td>
                            <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                                <button
                                    onClick={() => handleViewTasks(employee)}
                                    style={{
                                        padding: '5px 10px',
                                        background: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Задачи
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddEmployeeModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onEmployeeAdded={handleEmployeeAdded}
            />
        </div>
    );
};

export default EmployeeList;