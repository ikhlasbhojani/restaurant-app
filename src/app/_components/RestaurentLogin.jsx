import { useRouter } from 'next/navigation'
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';

const RestaurentLogin = () => {

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({email: values.username, password: values.password, login : true}),
    })

    response = await response.json()

    if (response.success) {
      const {result}= response
      delete result.password
      console.log(result)
      localStorage.setItem("restaurantUser", JSON.stringify(result))
      router.push("/restaurant/dashboard")
    } else {
      alert("Login failed")
    }
  };
  
  const router = useRouter();

  return (
    <div className="form-wrapper">
    <Form
      name="normal_login"
      className="main-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          style={{ borderColor: 'orange' }} // Set border color to orange
          className="custom-input" // Add a custom class for further customization
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          style={{ borderColor: 'orange' }} // Set border color to orange
          className="custom-input" // Add a custom class for further customization
        />
      </Form.Item>
   
      <Form.Item>
        <button htmlType="submit" className="form-button">
          Log in
        </button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default RestaurentLogin;
