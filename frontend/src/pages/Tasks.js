import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaCheckCircle } from 'react-icons/fa';
import { taskService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import '../styles/CrudPages.css';

const Tasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [filterType, setFilterType] = useState('all'); // all, my-tasks
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        status: 'OPEN',
        assignedToId: user?.userId || null
    });

    useEffect(() => {
        fetchTasks();
    }, [filterStatus, filterType]);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            let response;
            if (filterType === 'my-tasks') {
                response = await taskService.getMyTasks(user?.userId);
            } else if (filterStatus) {
                response = await taskService.getTasksByStatus(filterStatus);
            } else {
                response = await taskService.getTasks();
            }
            setTasks(response.data.data.content || []);
        } catch (err) {
            setError('Failed to fetch tasks');
        }
        setLoading(false);
    };

    const handleShowModal = (task = null) => {
        if (task) {
            setEditingId(task.id);
            setFormData(task);
        } else {
            setEditingId(null);
            setFormData({
                title: '',
                description: '',
                dueDate: '',
                priority: 'MEDIUM',
                status: 'OPEN',
                assignedToId: user?.userId || null
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingId(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await taskService.updateTask(editingId, formData);
            } else {
                await taskService.createTask(formData);
            }
            fetchTasks();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save task');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await taskService.deleteTask(id);
                fetchTasks();
            } catch (err) {
                setError('Failed to delete task');
            }
        }
    };

    const markComplete = async (task) => {
        try {
            await taskService.updateTask(task.id, { ...task, status: 'COMPLETED' });
            fetchTasks();
        } catch (err) {
            setError('Failed to update task');
        }
    };

    return (
        <Container className="page-container">
            <div className="page-header">
                <h2>Tasks</h2>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    <FaPlus /> Add Task
                </Button>
            </div>

            <div className="filter-section mb-3">
                <Form.Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ maxWidth: '200px' }}
                    className="me-2"
                >
                    <option value="all">All Tasks</option>
                    <option value="my-tasks">My Tasks</option>
                </Form.Select>

                <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ maxWidth: '200px' }}
                >
                    <option value="">All Statuses</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </Form.Select>
            </div>

            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

            <Card className="table-card">
                <Card.Body>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Due Date</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>{task.title}</td>
                                        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`badge bg-${task.priority === 'HIGH' ? 'danger' : task.priority === 'MEDIUM' ? 'warning' : 'info'}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td>{task.status}</td>
                                        <td>{task.assignedToName || 'Unassigned'}</td>
                                        <td>
                                            {task.status !== 'COMPLETED' && (
                                                <Button
                                                    size="sm"
                                                    variant="success"
                                                    onClick={() => markComplete(task)}
                                                    className="me-2"
                                                    title="Mark as Complete"
                                                >
                                                    <FaCheckCircle />
                                                </Button>
                                            )}
                                            <Button
                                                size="sm"
                                                variant="warning"
                                                onClick={() => handleShowModal(task)}
                                                className="me-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleDelete(task.id)}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* Add/Edit Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingId ? 'Edit Task' : 'Add Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                <option value="LOW">Low</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="HIGH">High</option>
                                <option value="CRITICAL">Critical</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="OPEN">Open</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editingId ? 'Update' : 'Create'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Tasks;
