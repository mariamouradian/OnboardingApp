import axios from 'axios';

const API_BASE_URL = 'http://localhost:5246/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
    },
    withCredentials: false,
});

api.interceptors.request.use((config) => {
    console.log('Making request to:', config.url);
    return config;
});

api.interceptors.response.use(
    (response) => {
        console.log('Response received from:', response.config.url);
        return response;
    },
    (error) => {
        console.error('API Error:', error.message);

        if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
            console.warn('Не удалось подключиться к серверу');
            // Возвращаем пустые данные вместо ошибки
            return Promise.resolve({ data: [] });
        }

        return Promise.reject(error);
    }
);

export const employeeService = {
    getAll: () => api.get('/employees'),
    create: (employee) => api.post('/employees', employee),
};

export const departmentService = {
    getAll: () => api.get('/departments'),
    create: (department) => api.post('/departments', department),
};

export const taskService = {
    getByEmployee: (employeeId) => api.get(`/tasks/employee/${employeeId}`),
    complete: (taskId) => api.put(`/tasks/${taskId}/complete`),
    skip: (taskId) => api.put(`/tasks/${taskId}/skip`),
    reorder: (taskIds) => api.put('/tasks/reorder', taskIds),
    create: (task) => api.post('/tasks', task),
};

export const notificationService = {
    getByDepartment: (departmentId) => api.get(`/notifications/${departmentId}`),
    markAsRead: (notificationId) => api.put(`/notifications/mark-as-read/${notificationId}`),
    getUnreadCount: (departmentId) => api.get(`/notifications/unread-count/${departmentId}`),
    markAllAsRead: (departmentId) => api.put(`/notifications/mark-all-read/${departmentId}`)
};

export const testService = {
    testMessage: () => api.post('/test/test-message'),
};

export default api;