import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import OrderCard from '../../components1/Widgets/Statistic/OrderCard';

// import axiosInstance from 'views/auth/instance/instance';

const User = () => {
  const [topBarUser, setTopBarUser] = useState({});
  // const fetchData = async () => {
  //   try {
  //     const userData = JSON.parse(localStorage.getItem('userData'));
  //     let dashboardData = await axiosInstance.get(`/user/getUserDashboard`);
  //     dashboardData = dashboardData?.data?.data;
  //     setData(dashboardData);

  //     console.log('data is : ', data);
  //   } catch (err) {
  //     console.log('Error is ', err);
  //   }
  // };

  useEffect(() => {
    // fetchData();
  }, []);
  const topUsers = [
    { name: 'John Doe', earnings: '$12000', badge: 'Gold', totalProjects: 24 },
    { name: 'Jane Smith', earnings: '$10500', badge: 'Silver', totalProjects: 18 },
    { name: 'Michael Johnson', earnings: '$9800', badge: 'Platinum', totalProjects: 22 },
    { name: 'Emily Davis', earnings: '$8500', badge: 'Gold', totalProjects: 20 },
    { name: 'Robert Wilson', earnings: '$7900', badge: 'Silver', totalProjects: 16 },
    { name: 'Sophia Brown', earnings: '$7300', badge: 'Gold', totalProjects: 14 },
    { name: 'William Taylor', earnings: '$6900', badge: 'Bronze', totalProjects: 12 }
  ];

  return (
    <React.Fragment>
      {/* Order Cards */}
      <Row>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Total Users',
              class: 'bg-c-blue', // Blue for total users
              icon: 'feather icon-users', // Users icon
              primaryText: '9,562',
              secondaryText: 'This Month',
              extraText: '542'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Active Users',
              class: 'bg-c-green', // Green for active users
              icon: 'feather icon-user-check', // Active user icon
              primaryText: '3,000',
              secondaryText: 'This Month',
              extraText: '42'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Inactive Users',
              class: 'bg-secondary', // Red for inactive users
              icon: 'feather icon-user-x', // Inactive user icon
              primaryText: '200',
              secondaryText: 'This Month',
              extraText: '2'
            }}
          />
        </Col>
        <Col md={6} xl={3}>
          <OrderCard
            params={{
              title: 'Unverified Users',
              class: 'bg-danger', // No external class needed
              icon: 'feather icon-user', // Generic user icon for unverified users
              primaryText: '50',
              secondaryText: 'This Month',
              extraText: '5'
              // style: { backgroundColor: '#ffc107', color: '#000' } // Yellow background with black text for warning
            }}
          />
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">All Time Top Users</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Earnings</th>
                    <th>Badge</th>
                    <th>Total Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.earnings}</td>
                      <td>{user.badge}</td>
                      <td>{user.totalProjects}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default User;
