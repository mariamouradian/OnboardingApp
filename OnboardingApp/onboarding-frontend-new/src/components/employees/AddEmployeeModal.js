import React, { useState, useEffect } from 'react';
import { departmentService, employeeService } from '../../services/api';

const AddEmployeeModal = ({ open, onClose, onEmployeeAdded }) => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        position: '',
        departmentId: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            loadDepartments();
            setError('');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                departmentId: ''
            });
        }
    }, [open]);

    const loadDepartments = async () => {
        try {
            const response = await departmentService.getAll();
            setDepartments(response.data);
        } catch (error) {
            console.error('Error loading departments:', error);
            setError('Ошибка загрузки подразделений');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Валидация
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.position || !formData.departmentId) {
            setError('Все поля обязательны для заполнения');
            setLoading(false);
            return;
        }

        // Валидация email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Введите корректный email адрес');
            setLoading(false);
            return;
        }

        try {
            // ФИКС: Создаем дату в UTC формате для PostgreSQL
            const now = new Date();
            const utcDate = new Date(Date.UTC(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds()
            ));

            const employeeData = {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.trim(),
                position: formData.position.trim(),
                departmentId: parseInt(formData.departmentId, 10),
                hireDate: utcDate.toISOString() // Явно указываем UTC время
            };

            console.log('Отправляемые данные:', employeeData);

            await employeeService.create(employeeData);

            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                position: '',
                departmentId: ''
            });

            if (onEmployeeAdded) {
                onEmployeeAdded();
            }

            alert('Сотрудник успешно добавлен!');
            onClose();

        } catch (error) {
            console.error('Error creating employee:', error);

            let errorMessage = 'Ошибка при создании сотрудника';

            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = 'Неверные данные';
                } else if (error.response.status === 409) {
                    errorMessage = 'Сотрудник с таким email уже существует';
                } else if (error.response.data) {
                    errorMessage = error.response.data.message || 'Ошибка сервера';
                }
            }

            setError(errorMessage);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (!open) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                width: '400px',
                maxWidth: '90%'
            }}>
                <h2 style={{ marginTop: 0, textAlign: 'center' }}>Добавить сотрудника</h2>

                {error && (
                    <div style={{
                        color: '#d32f2f',
                        backgroundColor: '#ffebee',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '15px',
                        border: '1px solid #d32f2f'
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Имя *
                        </label>
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                            placeholder="Введите имя"
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Фамилия *
                        </label>
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                            placeholder="Введите фамилию"
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                            placeholder="email@example.com"
                        />
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Должность *
                        </label>
                        <input
                            type="text"
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                            placeholder="Введите должность"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Подразделение *
                        </label>
                        <select
                            value={formData.departmentId}
                            onChange={(e) => handleInputChange('departmentId', e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px',
                                background: 'white'
                            }}
                        >
                            <option value="">Выберите подразделение</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                padding: '12px 20px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                background: '#f5f5f5',
                                cursor: 'pointer',
                                flex: 1
                            }}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: '12px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                background: '#1976d2',
                                color: 'white',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                flex: 1,
                                opacity: loading ? 0.6 : 1
                            }}
                        >
                            {loading ? 'Добавление...' : 'Добавить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;