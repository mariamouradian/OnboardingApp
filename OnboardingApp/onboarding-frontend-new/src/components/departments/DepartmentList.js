import React, { useState, useEffect } from 'react';
import { departmentService } from '../../services/api';
import AddDepartmentModal from './AddDepartmentModal';
import Loading from '../common/Loading';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const loadDepartments = async () => {
        try {
            const response = await departmentService.getAll();
            setDepartments(response.data);
        } catch (error) {
            console.error('Error loading departments:', error);
            alert('Ошибка при загрузке подразделений');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    const handleDepartmentAdded = () => {
        loadDepartments();
        setShowAddModal(false);
    };

    if (loading) return <Loading />;

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Подразделения</h1>
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
                    Добавить подразделение
                </button>
            </div>

            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #ddd',
                marginTop: '20px',
                backgroundColor: 'white'
            }}>
                <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Название</th>
                        <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Контакт HR</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department) => (
                        <tr key={department.id} style={{ border: '1px solid #ddd' }}>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{department.id}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{department.name}</td>
                            <td style={{ padding: '12px', border: '1px solid #ddd' }}>{department.hrContact}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <AddDepartmentModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onDepartmentAdded={handleDepartmentAdded}
            />
        </div>
    );
};

export default DepartmentList;