import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';
import axios from "axios"
import "./Pages.css"


const Reset = () => {
  const Navigate = useNavigate()
  const [inputs, setInputs] = useState({
    email: "",
    key: "",
    newPassword: ""
  })
  const handleValues = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs)
    try {
      const res = await axios.post("http://localhost:9000/api/v1/user/reset", inputs);
      alert(res.data);
      Navigate("/login")
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className="login-page">
      <h1>Reset Your Password</h1>
      <Card className="login-card">
        <Form>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!' }]}
          >
            <Input name='email' onChange={handleValues} className='inputs' placeholder="Enter your Email!" />
          </Form.Item>
          <Form.Item
            name="key"
            rules={[{ required: true, message: 'Please enter your Security Key!' }]}
          >
            <Input name='key' onChange={handleValues} className='inputs' placeholder="Enter your Security Key!" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password name='newPassword' onChange={handleValues} className='inputs' placeholder="Password" />
          </Form.Item>

          <p className='links'><Link to="/login">Login</Link><Link to="/signup">Create a New Account</Link></p>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Reset