import { useRouter } from 'next/navigation'
import React from 'react'
import { LockOutlined,ShopOutlined,PhoneOutlined,HomeOutlined,MailOutlined  } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

const RestaurantSignup = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);

    const { email, password, confirmPassword, name, city, address, contact } = values;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    let response = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body: JSON.stringify({ email, password, name, city, address, contact }),
    });

    response = await response.json();

    if (response.success) {
      const { result } = response;
      delete result.password;
      console.log(result);
      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
      alert("Account created successfully");
    } else {
      alert("Account creation failed");
    }
  };

  return (
    <div className="form-wrapper">
      <Form
      name="normal_signup"
      className="main-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email"  style={{ borderColor: 'orange' }} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password"  style={{ borderColor: 'orange' }}/>
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password"  style={{ borderColor: 'orange' }} />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your Restaurant Name!',
          },
        ]}
      >
        <Input prefix={<ShopOutlined />} placeholder="Restaurant Name"  style={{ borderColor: 'orange' }}/>
      </Form.Item>
      <Form.Item
        name="city"
        rules={[
          {
            required: true,
            message: 'Please input your City!',
          },
        ]}
      >
        <Input prefix={<HomeOutlined />} placeholder="City"  style={{ borderColor: 'orange' }} />
      </Form.Item>
      <Form.Item
        name="address"
        rules={[
          {
            required: true,
            message: 'Please input your Address!',
          },
        ]}
      >
        <Input prefix={<HomeOutlined />} placeholder="Address"  style={{ borderColor: 'orange' }}/>
      </Form.Item>
      <Form.Item
        name="contact"
        rules={[
          {
            required: true,
            message: 'Please input your Contact Number!',
          },
        ]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Contact Number"  style={{ borderColor: 'orange' }} />
      </Form.Item>
      <Form.Item>
        <button className="form-button">
          Sign Up
        </button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default RestaurantSignup;
