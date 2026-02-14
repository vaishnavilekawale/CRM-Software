import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaUsers, FaUserTie, FaTasks, FaChartLine } from 'react-icons/fa';
import { customerService, leadService, taskService, saleService } from '../services/apiService';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCustomers: 0,
        totalLeads: 0,
        totalTasks: 0,
        totalSales: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const [customersRes, leadsRes, tasksRes, salesRes] = await Promise.all([
                customerService.getCustomers(0, 1),
                leadService.getLeads(0, 1),
                taskService.getTasks(0, 1),
                saleService.getSales(0, 1)
            ]);

            setStats({
                totalCustomers: customersRes.data.data.totalElements || 0,
                totalLeads: leadsRes.data.data.totalElements || 0,
                totalTasks: tasksRes.data.data.totalElements || 0,
                totalSales: salesRes.data.data.totalElements || 0
            });
        } catch (err) {
            setError('Failed to fetch dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <Col md={6} lg={3} className="mb-4">
            <Card className={`stat-card shadow ${color}`}>
                <Card.Body className="text-center">
                    <Icon className="stat-icon mb-3" />
                    <h5 className="stat-title">{title}</h5>
                    <h2 className="stat-value">{value}</h2>
                </Card.Body>
            </Card>
        </Col>
    );

    return (
        <Container className="dashboard-container">
            <h1 className="mb-4">Dashboard</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
                <p>Loading dashboard...</p>
            ) : (
                <>
                    <Row className="mb-4">
                        <StatCard
                            icon={FaUsers}
                            title="Total Customers"
                            value={stats.totalCustomers}
                            color="stat-blue"
                        />
                        <StatCard
                            icon={FaUserTie}
                            title="Total Leads"
                            value={stats.totalLeads}
                            color="stat-green"
                        />
                        <StatCard
                            icon={FaTasks}
                            title="Total Tasks"
                            value={stats.totalTasks}
                            color="stat-orange"
                        />
                        <StatCard
                            icon={FaChartLine}
                            title="Total Sales"
                            value={stats.totalSales}
                            color="stat-purple"
                        />
                    </Row>

                    <Row>
                        <Col md={12}>
                            <Card className="info-card">
                                <Card.Header>
                                    <Card.Title className="mb-0">Welcome to CRM Dashboard</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <p>Manage your customer relationships efficiently with our comprehensive CRM system.</p>
                                    <ul>
                                        <li>Track and manage your customers</li>
                                        <li>Monitor leads and their status</li>
                                        <li>Organize tasks and assignments</li>
                                        <li>Track sales opportunities</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Dashboard;
