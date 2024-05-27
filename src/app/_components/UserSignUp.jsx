import { useRouter } from "next/navigation";
import { useState } from "react"
import { LockOutlined, UserOutlined,ShopOutlined,PhoneOutlined,HomeOutlined,MailOutlined  } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

const UserSignUp = (props) => {

    const router = useRouter();


    const onFinish = async ({ name, email, password, city, address, mobile }) => {
        console.log('Received values of form: ', { name, email, password, city, address, mobile });
      
        // Ensure all form fields are filled
        if (!name || !email || !password || !city || !address || !mobile) {
          alert('Please fill all the fields');
          return;
        }
      
        let response = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          body: JSON.stringify({ name, email, password, city, address, mobile })
        });
      
        response = await response.json();
      
        if (response.success) {
          const { result } = response;
          delete result.password;
          console.log(result);
          localStorage.setItem("user", JSON.stringify(result));
          if(props?.redirect?.order){
            router.pudh("/order")
          }else{
            router.push("/")
          }
          alert("Account created successfully");
        } else {
          alert("Account creation failed");
        }
      }

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
          <Input prefix={<MailOutlined />} placeholder="Enter your Email"  style={{ borderColor: 'orange' }}/>
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
    )
}

export default UserSignUp