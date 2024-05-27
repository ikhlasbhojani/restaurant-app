import { useState } from "react"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useRouter } from "next/navigation";

const UserLogin=(props)=>{

    const router = useRouter()


    const onFinish= async({username,password})=>{

        let response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            body: JSON.stringify({ email: username, password: password, login: true }),
        })

        response = await response.json()

        if (response.success) {
            
            const { result } = response
            delete result.password
            localStorage.setItem("user", JSON.stringify(result))
            if(props?.redirect?.order){
              router.pudh("/order")
            }else{
              router.push("/")
            }
            
        }
    }

    return(
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
          <button className="form-button">
            Log in
          </button>
        </Form.Item>
      </Form>
        </div>
    )
}

export default UserLogin