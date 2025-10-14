import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/api';

const NotificationsPanel = () => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const loadNotifications = async () => {
        try {
            const response = await notificationService.getByDepartment(1);
            setNotifications(response.data || []);
        } catch (error) {
            console.error('Ошибка загрузки уведомлений:', error);
            setNotifications([]);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await notificationService.markAsRead(notificationId);
            // Обновляем локальное состояние
            setNotifications(prev => prev.map(n =>
                n.id === notificationId ? { ...n, isRead: true } : n
            ));
        } catch (error) {
            console.error('Ошибка при пометке как прочитанное:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            // Находим все непрочитанные уведомления
            const unreadNotifications = notifications.filter(n => !n.isRead);

            // Помечаем каждое как прочитанное
            for (const notification of unreadNotifications) {
                await notificationService.markAsRead(notification.id);
            }

            // Обновляем локальное состояние
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));

        } catch (error) {
            console.error('Ошибка при пометке всех как прочитанных:', error);
        }
    };

    useEffect(() => {
        loadNotifications();
        const interval = setInterval(loadNotifications, 60000);
        return () => clearInterval(interval);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '5px'
                }}
            >
                🔔
                {unreadCount > 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#ff4757',
                        color: 'white',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold'
                    }}>
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '0',
                    width: '400px',
                    background: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    maxHeight: '500px',
                    overflowY: 'auto'
                }}>
                    <div style={{
                        padding: '12px',
                        background: '#1976d2',
                        color: 'white',
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <strong>Уведомления</strong>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                style={{
                                    background: 'rgba(255,255,255,0.2)',
                                    border: '1px solid rgba(255,255,255,0.5)',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    cursor: 'pointer'
                                }}
                            >
                                Прочитать все
                            </button>
                        )}
                    </div>

                    {notifications.length === 0 ? (
                        <div style={{
                            padding: '20px',
                            textAlign: 'center',
                            color: '#666',
                            fontSize: '14px'
                        }}>
                            Нет уведомлений
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div key={notification.id} style={{
                                padding: '12px',
                                borderBottom: '1px solid #eee',
                                backgroundColor: notification.isRead ? '#fafafa' : '#e3f2fd',
                                position: 'relative'
                            }}>
                                <div style={{
                                    fontWeight: notification.isRead ? 'normal' : '600',
                                    marginBottom: '6px',
                                    fontSize: '14px',
                                    color: '#333',
                                    lineHeight: '1.4',
                                    paddingRight: '60px'
                                }}>
                                    {notification.message}
                                </div>
                                <div style={{
                                    fontSize: '11px',
                                    color: '#666',
                                    fontStyle: 'italic'
                                }}>
                                    {new Date(notification.createdAt).toLocaleString('ru-RU')}
                                </div>

                                {!notification.isRead && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        display: 'flex',
                                        gap: '5px'
                                    }}>
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            style={{
                                                background: '#1976d2',
                                                border: 'none',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '3px',
                                                fontSize: '10px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Прочитано
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationsPanel;