import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { leadService } from '../services/apiService';
import '../styles/CrudPages.css';

const Leads = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [filterStatus, setFilterStatus] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        source: 'WEB',
        status: 'NEW',
        notes: ''
    });

    useEffect(() => {
        fetchLeads();
    }, [filterStatus]);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const response = filterStatus
                ? await leadService.getLeadsByStatus(filterStatus)
                : await leadService.getLeads();
            setLeads(response.data.data.content || []);
        } catch (err) {
            setError('Failed to fetch leads');
        }
        setLoading(false);
    };

    const handleShowModal = (lead = null) => {
        if (lead) {
            setEditingId(lead.id);
            setFormData(lead);
        } else {
            setEditingId(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                source: 'WEB',
                status: 'NEW',
                notes: ''
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
                await leadService.updateLead(editingId, formData);
            } else {
                await leadService.createLead(formData);
            }
            fetchLeads();
            handleCloseModal();
        } catch (err) {
            setError('Failed to save lead');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await leadService.deleteLead(id);
                fetchLeads();
            } catch (err) {
                setError('Failed to delete lead');
            }
        }
    };

    return (
        <Container className="page-container">
            <div className="page-header">
                <h2>Leads</h2>
                <Button variant="primary" onClick={() => handleShowModal()}>
                    <FaPlus /> Add Lead
                </Button>
            </div>

            <div className="filter-section mb-3">
                <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{ maxWidth: '200px' }}
                >
                    <option value="">All Statuses</option>
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="LOST">Lost</option>
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company</th>
                                    <th>Status</th>
                                    <th>Source</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead) => (
                                    <tr key={lead.id}>
                                        <td>{lead.name}</td>
                                        <td>{lead.email}</td>
                                        <td>{lead.company}</td>
                                        <td>{lead.status}</td>
                                        <td>{lead.source}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant="warning"
                                                onClick={() => handleShowModal(lead)}
                                                className="me-2"
                                            >
                                                <FaEdit />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleDelete(lead.id)}
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
                    <Modal.Title>{editingId ? 'Edit Lead' : 'Add Lead'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Company</Form.Label>
                            <Form.Control
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Source</Form.Label>
                            <Form.Select
                                name="source"
                                value={formData.source}
                                onChange={handleInputChange}
                            >
                                <option value="WEB">Website</option>
                                <option value="REFERRAL">Referral</option>
                                <option value="ADS">Ads</option>
                                <option value="COLD_CALL">Cold Call</option>
                                <option value="EMAIL">Email</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="NEW">New</option>
                                <option value="CONTACTED">Contacted</option>
                                <option value="QUALIFIED">Qualified</option>
                                <option value="CONVERTED">Converted</option>
                                <option value="LOST">Lost</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notes"
                                value={formData.notes}
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

export default Leads;
