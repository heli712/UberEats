import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Side from './Side';
import {useSelector } from 'react-redux';
import Delivery from './Delivery';

const Orders = () => {
    const resturant = useSelector((state) => state.resturant);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        getOrder()
    }, [])
    const getOrder = () => {
        const resId = {
            resturantId : resturant.resturant.resturantId
        }
        axios.post("http://localhost:8080/resturant/orderdetails",resId).then(responseData => {
            console.log("resturant order", responseData.data)
            setOrder(responseData.data)
        })
    }
    return (<div>
        <Side />
        <div>
            <h1 style={{marginLeft:'25px'}}>Orders</h1>
        </div>
        <div style={{display: 'flex', flexDirection: "column", width:'500px', margin:'25px'}}>
        {   
            order.map((option) => (
                <Delivery key={option.checkoutId} checkoutId={option.checkoutId} caddressId={option.caddressId} total={option.total} customerId={option.customerId} />
            ))
        }        
        </div>
    </div>)
}


export default Orders;