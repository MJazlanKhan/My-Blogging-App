import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"
import "./Pages.css"
import { Form, Input, Button, Checkbox, Card } from 'antd';

const Signup = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    key: ""
  })
  const handleValues = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    console.log(inputs)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/v1/user/register", inputs)
      alert(res.data.message);
      navigate("/login")
    } catch (error) {
      alert(error.response.data.message)

    }
  }

  return (
    <div className="login-page">
      <h1>Create Your Account</h1>
      <Card className="Signup-card">
        <Form>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input name='username' onChange={handleValues} className='inputs' placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your Email!' }]}
          >
            <Input name='email' onChange={handleValues} className='inputs' placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="key"
            rules={[{ required: true, message: 'Please enter your Secuirity key!' }]}
          >
            <Input name='key' onChange={handleValues} className='inputs' placeholder="Secruity Key" />
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
          <p>Already Have an Account? <Link to="/login">Login</Link></p>
          <Form.Item>
            <Button type="primary" onClick={handleSubmit}>
              Create a Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
