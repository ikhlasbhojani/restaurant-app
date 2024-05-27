import React from 'react'
import { useState } from 'react'
import { Form, Input, Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const AddFoodItem = (props) => {
    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
      
      
      const onFinish= async({name, price, path, description})=>{

          let resto_id;
          const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
          if (restaurantData){
              resto_id = restaurantData._id
          }

          const data = new FormData();
          data.append("file", path[0].originFileObj);
          data.append("upload_preset", "food-app");
          data.append("cloud_name", "dn8ordq1a");

         let imgData= await fetch("https://api.cloudinary.com/v1_1/dn8ordq1a/image/upload", {
            method: "post",
            body: data,
          })
          imgData = await imgData.json();
          const imgPath = imgData.url;
          
        
        let response = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({name, price, path: imgPath , description, resto_id}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        if(response.success){
            alert("Food item added successfully")
            props.setAddItem(false)
        }else{
            alert("Failed to add food item")
        }

    }

  return (


<div className="add-food-form-wrapper">
<Form
    name="normal_signup"
    className="add-food-form"
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
  >
    <h1 className='form-title'>Add Food Item</h1>
    <Form.Item name="path" valuePropName="fileList" getValueFromEvent={normFile}style={{ display: 'flex', justifyContent: 'center' }} >
          <Upload listType="picture-card" >
            <button
              style={{
                border: 'none',
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>
    <Form.Item
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your Name!',
        },
      ]}
    >
      <Input placeholder="Enter your Name"  style={{ borderColor: 'orange' }} />
    </Form.Item>
    <Form.Item
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input your Price!',
        },
      ]}
      hasFeedback
    >
      <Input placeholder="Enter your Price"  style={{ borderColor: 'orange' }}/>
    </Form.Item>
    <Form.Item
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input your Food Description!',
        },
      ]}
    >
      <Input placeholder="Enter your Food Description"  style={{ borderColor: 'orange' }}/>
    </Form.Item>
    <Form.Item>
      <button  className="form-button">
        Add Food
      </button>
    </Form.Item>
  </Form>
</div>

  )
}

export default AddFoodItem