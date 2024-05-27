import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/navigation';
const RestaurantCard = (props) =>{
    const router =useRouter();
    const item =props.item
   return(
<Card
    hoverable
    title={item.name}
    styles={{width: 300, header: { backgroundColor: 'orange', color: 'white', fontSize: '20px' } }}
    onClick={()=>router.push('/explore/'+item.name+"?id="+item._id)}
  >
    <p>Email : {item.email}</p>
    <p>Contact No : {item.contact}</p>
    <p>Address : {item.address}</p>
    <p>City : {item.city}</p>

  </Card>

   )  
  
};
export default RestaurantCard;