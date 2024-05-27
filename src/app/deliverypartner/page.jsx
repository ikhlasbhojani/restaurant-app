'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LockOutlined, UserOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import DeliveryHeader from "../_components/DeliveryHeader";

const Page = () => {
    const router = useRouter();


    useEffect(()=>{
        const delivery= JSON.parse(localStorage.getItem('delivery'));
        if(delivery){
            router.push('/deliverydashboard')
        }
    },[])


    const handleSignUp = async (values) => {
        const { name, mobile, password, city, address } = values;
        console.log(name, mobile, password, city, address);
        let response = await fetch('http://localhost:3000/api/deliverypartners/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, mobile, password, city, address })
        })

        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard')

        } else {
            alert("failed")
        }
    }

    const onFinish = async ({mobile,password}) => {
        let response = await fetch('http://localhost:3000/api/deliverypartners/login', {
            method: 'post',
            body: JSON.stringify({ mobile, password})
        })
        response = await response.json();
        if (response.success) {
            const { result } = response;
            delete result.password;
            localStorage.setItem('delivery', JSON.stringify(result));
            router.push('deliverydashboard')

        } else {
            alert("failed to login. Please try again with valid mobile and password")
        }
    }

    return (
        <div>
            <DeliveryHeader/>
            <h1>Delivery Partner</h1>
 
        <div className="delivery-wrapper">
        <div className="delivery-form">
          <Form
        name="normal_login"
        className=""
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        >
          <h1>Login</h1>
        <Form.Item
          name="mobile"
          rules={[
            {
              required: true,
              message: 'Please input your Mobile Number!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="number"
            placeholder="Mobile Number"
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
          <button className="form-button">
            Log in
          </button>
        </Form.Item>
      </Form>
        </div>


        <div className="delivery-form">
         <Form
        name="normal_signup"
        className=""
        initialValues={{
            remember: true,
        }}
        onFinish={handleSignUp}
        >
          <h1>Sign Up</h1>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your Name"  style={{ borderColor: 'orange' }} />
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
        name="mobile"
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
          <button  className="form-button">
            Sign Up
          </button>
        </Form.Item>
      </Form>
       </div>
        </div>

            </div>
    )
}

export default Page;