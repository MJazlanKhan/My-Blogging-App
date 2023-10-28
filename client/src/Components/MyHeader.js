import React from 'react';
import "./Components.css"
import { Layout, Menu, Col, Row } from 'antd';
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;

const MyHeader = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const navigate = useNavigate()
  const handleLogout = () => {
    const token = localStorage.removeItem("token");
    const username = localStorage.removeItem("username");
    alert("logout Sucessfull")
    navigate("/login")
  }
  return (
    <Header className="header">


      <Row className='row'>
        {token && token !== null ? (
          <>
            <h4 className="welcome">  Welcome {username}</h4></>
        ) : (
          <>
            <Col  xs={2} sm={4} md={6} lg={8} xl={10}>

              <Menu className='blue' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>

                <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>


                <Menu.Item key="2"><Link to="/Login">Login</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/Signup">Signup</Link></Menu.Item>
              </Menu>

            </Col>
          </>
        )}


        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <Link to="/">
            <h1 className='logo'>My Blog App</h1>
          </Link>
        </Col>
        <Col className='lastrow' xs={2} sm={4} md={6} lg={8} xl={10}>
          {!token && token === null ? (
            <>
              {/* <h4 className="welcome">Welcome {username}</h4> */}
            </>
          ) : (
            <>
              <Menu className='lastitem blue' theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item>
                  <Link onClick={handleLogout}>Logout</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/Create-new-post">Create Post</Link>
                </Menu.Item>
              </Menu>
            </>
          )}
        </Col>
      </Row>

    </Header>
  );
};

export default MyHeader;
