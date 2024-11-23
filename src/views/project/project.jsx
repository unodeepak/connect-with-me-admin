import React from 'react';
import { Row, Col, Card, Table, Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import OrderCard from '../../components1/Widgets/Statistic/OrderCard';

import axiosInstance from 'views/auth/instance/instance';

const Project = () => {
  const [topBarUser, setTopBarUser] = useState({});
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isActive, setIsActive] = useState('');
  const [unVerifiedUser, setUnVerifiedUser] = useState(false);
  const [totalCount, setTotalCount] = useState(10);

  const getUser = async () => {
    try {
      let data = await axiosInstance.get(`/user/getAllUsers`, {
        params: {
          page,
          limit,
          isActive,
          unVerifiedUser
        }
      });
      dashboardData = dashboardData?.data?.data;
      setTopBarUser(dashboardData);
      setData(data?.data?.data);
      setTotalCount(Math.ceil(data?.data?.totalUser / 10));

      console.log('data is : ', dashboardData, data?.data);
    } catch (err) {
      console.log('Error is ', err);
    }
  };

  const fetchData = async () => {
    try {
      let dashboardData = await axiosInstance.get(`/user/getUserTopBarDataForAdmin`);
      let data = await axiosInstance.get(`/user/getAllUsers`, {
        params: {
          page,
          limit,
          isActive,
          unVerifiedUser
        }
      });
      dashboardData = dashboardData?.data?.data;
      setTopBarUser(dashboardData);
      setData(data?.data?.data);
      setTotalCount(Math.ceil(data?.data?.totalUser / 10));

      console.log('data is : ', dashboardData, data?.data);
    } catch (err) {
      console.log('Error is ', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handlePageChange = (page) => {
    setPage(page);
    getUser();
  };

  return (
    <React.Fragment>
      {/* Order Cards */}
      <Row>
        <Col md={6} xl={2}>
          <OrderCard
            params={{
              title: 'Total',
              class: 'bg-primary', // Primary blue for total projects
              icon: 'feather icon-layers', // Layers icon representing all projects
              primaryText: `${topBarUser?.totalUser}`,
              secondaryText: 'This Month',
              extraText: `${topBarUser?.thisMonthTotalUser}`
            }}
          />
        </Col>
        <Col md={6} xl={2}>
          <OrderCard
            params={{
              title: 'Complete',
              class: 'bg-success', // Green for completed projects
              icon: 'feather icon-check-circle', // Check-circle icon for completed projects
              primaryText: `${topBarUser?.totalUser}`,
              secondaryText: 'This Month',
              extraText: `${topBarUser?.thisMonthTotalUser}`
            }}
          />
        </Col>
        <Col md={6} xl={2}>
          <OrderCard
            params={{
              title: 'In-Progress',
              class: 'bg-info', // Orange for in-progress projects
              icon: 'feather icon-clock', // Clock icon for ongoing projects
              primaryText: `${topBarUser?.activeUser}`,
              secondaryText: 'This Month',
              extraText: `${topBarUser?.thisMonthActiveUser}`
            }}
          />
        </Col>
        <Col md={6} xl={2}>
          <OrderCard
            params={{
              title: 'Approved',
              class: 'bg-secondary', // Gray for approved projects
              icon: 'feather icon-thumbs-up', // Thumbs-up icon for approval
              primaryText: `${topBarUser?.inActiveUser}`,
              secondaryText: 'This Month',
              extraText: `${topBarUser?.thisMonthInActiveUser}`
            }}
          />
        </Col>
        <Col md={6} xl={2}>
          <OrderCard
            params={{
              title: 'Pending',
              class: 'bg-warning', // Yellow for pending projects
              icon: 'feather icon-alert-circle', // Alert-circle icon for pending
              primaryText: `${topBarUser?.unVerifiedUser}`,
              secondaryText: `This Month`,
              extraText: `${topBarUser?.thisMonthUnVerifiedUser}`
            }}
          />
        </Col>
        <Col md={6} xl={2}>
          <OrderCard
            params={{
              title: 'Cancelled',
              class: 'bg-danger', // Red for cancelled projects
              icon: 'feather icon-x-circle', // X-circle icon for cancellations
              primaryText: `${topBarUser?.unVerifiedUser}`,
              secondaryText: `This Month`,
              extraText: `${topBarUser?.thisMonthUnVerifiedUser}`
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
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Verification</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user, index) => (
                    <tr key={index}>
                      <td>{user?.firstName + user?.lastName}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phoneNumber}</td>
                      {/* <td>{user?.isVerifiedEmail}</td> */}
                      <td>
                        {/* Verification Icons */}
                        <span className="me-2">
                          {user?.isVerifiedEmail ? (
                            <i className="feather icon-mail text-success" title="Email Verified"></i>
                          ) : (
                            <i className="feather icon-mail text-danger" title="Email Not Verified"></i>
                          )}
                        </span>
                        <span>
                          {user?.isVerifiedPhone ? (
                            <i className="feather icon-phone text-success" title="Phone Verified"></i>
                          ) : (
                            <i className="feather icon-phone text-danger" title="Phone Not Verified"></i>
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Pagination className="justify-content-center">
                <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
                <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                {[...Array(totalCount).keys()].map((page) => (
                  <Pagination.Item key={page + 1} active={page + 1 === page} onClick={() => handlePageChange(page + 1)}>
                    {page + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalCount} />
                <Pagination.Last onClick={() => handlePageChange(totalCount)} disabled={page === totalCount} />
              </Pagination>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Project;
