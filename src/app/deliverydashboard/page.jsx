'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/DeliveryHeader";

const Page = () => {
    const router = useRouter();

    const [myOrders, setMyOrders] = useState([]);

    let delivery_id = JSON.parse(localStorage.getItem('delivery'));

    useEffect(() => {
        getMyOrders();
    }, []);

    const getMyOrders = async () => {
        const deliveryData = JSON.parse(localStorage.getItem('delivery') && localStorage.getItem('delivery'));
        let response = await fetch('http://localhost:3000/api/deliverypartners/orders/' + deliveryData._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        let response = await fetch('http://localhost:3000/api/order/edit/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        response = await response.json();
        if (response.success) {
            getMyOrders();
        }
    };

    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem('delivery') && localStorage.getItem('delivery'));
        if (!delivery) {
            router.push('/deliverypartner');
        }
    }, [router]);

    const handleStatusChange = (id) => (event) => {
        const status = event.target.value;
        handleUpdateStatus(id, status);
        console.log(id, status);
    };

    return (
        <div>
            <DeliveryHeader />
            <h1>My Order List</h1>
            {
                myOrders.map((item) => (
                    <div key={item._id} className="restaurant-wrapper">

                        <h4>Restaurant Details</h4>
                        <p>Restaurant Name: {item.data.name}</p>
                        <p>Amount: {item.amount}</p>
                        <p>Address: {item.data.address}</p>
                        <h4>Customaer Details</h4>
                        <p>Name: {item.userData.name}</p>
                        <p>Phone: {item.userData.mobile}</p>
                        <p>Address: {item.userData.address}</p>
                        <p>Status: {item.status}</p>
                        <div>
                            Update Status:
                            <select onChange={handleStatusChange(delivery_id._id)} defaultValue={item.status}>
                                <option value="Confirm">Confirm</option>
                                <option value="On the way">On the way</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Failed to deliver">Failed to deliver</option>
                            </select>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Page;
