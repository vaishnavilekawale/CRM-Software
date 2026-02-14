import api from './api';

export const authService = {
    register: (fullName, email, password, role) => {
        return api.post('/auth/register', {
            fullName,
            email,
            password,
            role
        });
    },

    login: (email, password) => {
        return api.post('/auth/login', { email, password });
    },

    getCurrentUser: () => {
        return api.get('/auth/me');
    },

    getAllUsers: () => {
        return api.get('/auth/users');
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const customerService = {
    createCustomer: (data) => api.post('/customers', data),
    getCustomers: (page = 0, size = 10) => api.get(`/customers?page=${page}&size=${size}`),
    getCustomerById: (id) => api.get(`/customers/${id}`),
    updateCustomer: (id, data) => api.put(`/customers/${id}`, data),
    deleteCustomer: (id) => api.delete(`/customers/${id}`),
    searchCustomers: (name, page = 0, size = 10) => api.get(`/customers/search?name=${name}&page=${page}&size=${size}`)
};

export const leadService = {
    createLead: (data) => api.post('/leads', data),
    getLeads: (page = 0, size = 10) => api.get(`/leads?page=${page}&size=${size}`),
    getLeadById: (id) => api.get(`/leads/${id}`),
    updateLead: (id, data) => api.put(`/leads/${id}`, data),
    deleteLead: (id) => api.delete(`/leads/${id}`),
    getLeadsByStatus: (status, page = 0, size = 10) => api.get(`/leads/status/${status}?page=${page}&size=${size}`),
    getLeadsBySource: (source, page = 0, size = 10) => api.get(`/leads/source/${source}?page=${page}&size=${size}`)
};

export const taskService = {
    createTask: (data) => api.post('/tasks', data),
    getTasks: (page = 0, size = 10) => api.get(`/tasks?page=${page}&size=${size}`),
    getTaskById: (id) => api.get(`/tasks/${id}`),
    updateTask: (id, data) => api.put(`/tasks/${id}`, data),
    deleteTask: (id) => api.delete(`/tasks/${id}`),
    getTasksByStatus: (status, page = 0, size = 10) => api.get(`/tasks/status/${status}?page=${page}&size=${size}`),
    getTasksByPriority: (priority, page = 0, size = 10) => api.get(`/tasks/priority/${priority}?page=${page}&size=${size}`),
    getMyTasks: (userId, page = 0, size = 10) => api.get(`/tasks/user/${userId}?page=${page}&size=${size}`)
};

export const saleService = {
    createSale: (data) => api.post('/sales', data),
    getSales: (page = 0, size = 10) => api.get(`/sales?page=${page}&size=${size}`),
    getSaleById: (id) => api.get(`/sales/${id}`),
    updateSale: (id, data) => api.put(`/sales/${id}`, data),
    deleteSale: (id) => api.delete(`/sales/${id}`),
    getSalesByStatus: (status, page = 0, size = 10) => api.get(`/sales/status/${status}?page=${page}&size=${size}`),
    getSalesByUserId: (userId, page = 0, size = 10) => api.get(`/sales/user/${userId}?page=${page}&size=${size}`),
    getSalesByCustomerId: (customerId, page = 0, size = 10) => api.get(`/sales/customer/${customerId}?page=${page}&size=${size}`)
};