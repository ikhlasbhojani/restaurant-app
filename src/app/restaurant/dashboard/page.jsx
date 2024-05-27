"use client"
import AddFoodItem from '@/app/_components/AddFoodItem'
import FoodItemList from '@/app/_components/FoodItemList'
import RestaurantHeader from '@/app/_components/RestaurantHeader'
import React, { useState } from 'react'


const Dashboard = () => {
  const [addItem, setAddItem] = useState(false)
  return (
    <div>
    <RestaurantHeader/>
    <div className="dashboard-button">
    <button onClick={() => setAddItem(true)}>Add Food</button>
    <button onClick={() => setAddItem(false)}>Dashboard</button>
    </div>
    {
      addItem ? <AddFoodItem setAddItem={setAddItem}/> : <FoodItemList />
    }
    
  </div>
  )

}

export default Dashboard