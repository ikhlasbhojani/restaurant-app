import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined  } from '@ant-design/icons';

const FoodItemList = () => {

    useEffect(() => {
        loadFoodItems()
    },[])

    const [item, setItem] = useState([])
    const router = useRouter()

    const loadFoodItems = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        const resto_id = restaurantData._id
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id)
        response = await response.json()
        if (response.success) {
            setItem(response.result)
        }else{
            alert(response.error)
        }

    }

    const deleteFoodItem = async (id) => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/" + id, {
            method: "DELETE",
        })
        response = await response.json()
        if (response.success) {
            loadFoodItems()
        }else{
            alert(response.error)
        }
    }


  return (

    <div className="table-wrapper">
      <h1>Food Item List</h1>

      <table className="table">
        <thead className="table-head">
          <tr>
            <td>S.N</td>
            <td>Name</td>
            <td>Price</td>
            <td>Description</td>
            <td>Image</td>
            <td>Operations</td>
          </tr>
        </thead>
        <tbody>
          {item.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.path}
                  alt="image"
                />
              </td>
              <td>
                <div className="operations">
                <button onClick={() => router.push("/restaurant/dashboard/"+item._id) }><EditOutlined /></button>
              <button onClick={() => deleteFoodItem(item._id)}><DeleteOutlined /></button></div>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
