import React, { useState } from 'react';
import { departmentService } from '../../services/api';

const AddDepartmentModal = ({ open, onClose, onDepartmentAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        hrContact: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await departmentService.create(formData);
            onDepartmentAdded();
            setFormData({ name: '', hrContact: '' });
            alert('Подразделение успешно добавлено!');
        } catch (error) {
            console.error('Error creating department:', error);
            alert('Ошибка при создании подразделения');
        } finally {
            setLoading(false);
        }
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
                <h2 style={{ marginTop: 0, textAlign: 'center' }}>Добавить подразделение</h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Название *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                            placeholder="Введите название подразделения"
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Контакт HR *
                        </label>
                        <input
                            type="text"
                            value={formData.hrContact}
                            onChange={(e) => setFormData({ ...formData, hrContact: e.target.value })}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                fontSize: '16px'
                            }}
                            placeholder="Введите контакт HR"
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={onClose}
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

export default AddDepartmentModal;