import React, { useState } from 'react';
import "./Pages.css"
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import { Form, Input, Button, Checkbox, Card } from 'antd';

const Login = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleValues = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    // console.log(inputs)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/v1/user/login", inputs);
      alert(res.data.message);
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.name)
      navigate("/")
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className="login-page">
      <h1>Login Your Account</h1>

      <Card className="login-card">
        <Form>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input name='email' onChange={handleValues} className='inputs' placeholder="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password name='password' onChange={handleValues} className='inputs' placeholder="Password" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <p><Link to="/signup">Create New Account</Link></p>
          <p><Link to="/reset">Forget Password</Link></p>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
