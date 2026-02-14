import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { saleService, customerService } from '../services/apiService';
import '../styles/CrudPages.css';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [formData, setFormData] = useState({
        customerId: '',
        amount: '',
        status: 'PROPOSAL',
        saleDate: new Date().toISOString().split('T')[0],
        productName: '',
        description: ''
    });

    useEffect(() => {
        fetchSales();
        fetchCustomers();
    }, [filterStatus]);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const response = filterStatus
                ? await saleService.getSalesByStatus(filterStatus)
                : await saleService.getSales();
            setSales(response.data.data.content || []);
        } catch (err) {
            setError('Failed to fetch sales');
        }
        setLoading(false);
    };

    const fetchCustomers = async () => {
        try {
            const response = await customerService.getCustomers();
            setCustomers(response.data.data.content || []);
        } catch (err) {
            // Silently fail
        }
    };

    const handleShowModal = (sale = null) => {
        if (sale) {
            setEditingId(sale.id);
            setFormData({
                customerId: sale.customerId,
                amount: sale.amount,
                status: sale.status,
                saleDate: sale.saleDate,
                productName: sale.productName,
                description: sale.description
            });
        } else {
            setEditingId(null);
            setFormData({
                customerId: '',
                amount: '',
                status: 'PROPOSAL',
                saleDate: new Date().toISOString().split('T')[0],
                productName: '',
                description: ''
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
                await saleService.updateSale(editingId, formData);
            } else {
                await saleService.createSale(formData);
            }
            fetchSales();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save sale');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await saleService.deleteSale(id);
                fetchSales();
            } catch (err) {
                setError('Failed to delete sale');
            }
        }
    };

    return (
        <Container className="page-container">
            <div className="page-header">
                <h2>Sales</h2>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    <FaPlus /> Add Sale
                </Button>
            </div>

            <div className="filter-section mb-3">
                <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ maxWidth: '200px' }}
                >
                    <option value="">All Statuses</option>
                    <option value="PROPOSAL">Proposal</option>
                    <option value="NEGOTIATION">Negotiation</option>
                    <option value="CLOSED_WON">Closed Won</option>
                    <option value="CLOSED_LOST">Closed Lost</option>
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
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Sale Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.map((sale) => (
                                    <tr key={sale.id}>
                                        <td>{sale.customerName}</td>
                                        <td>{sale.productName}</td>
                                        <td>${parseFloat(sale.amount).toFixed(2)}</td>
                                        <td>
                                            <span className={`badge bg-${sale.status === 'CLOSED_WON' ? 'success' : sale.status === 'CLOSED_LOST' ? 'danger' : 'warning'}`}>
                                                {sale.status}
                                            </span>
                                        </td>
                                        <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="warning"
                                                onClick={() => handleShowModal(sale)}
                                                className="me-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleDelete(sale.id)}
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
                    <Modal.Title>{editingId ? 'Edit Sale' : 'Add Sale'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer</Form.Label>
                            <Form.Select
                                name="customerId"
                                value={formData.customerId}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Sale Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="saleDate"
                                value={formData.saleDate}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="PROPOSAL">Proposal</option>
                                <option value="NEGOTIATION">Negotiation</option>
                                <option value="CLOSED_WON">Closed Won</option>
                                <option value="CLOSED_LOST">Closed Lost</option>
                            </Form.Select>
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
                        <Button variant="primary" type="submit" className="w-100">
                            {editingId ? 'Update' : 'Create'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Sales;
