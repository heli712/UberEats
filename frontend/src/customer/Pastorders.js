import React, {useState, useEffect}from 'react';
import Homeside from './Homeside';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Orderdetails from './Orderdetails';

const Pastorders = () => {
    const user = useSelector((state) => state.user);
    const [past, setPast] = useState([]);
    useEffect(() => {
        getorders()
    },[])
    const getorders = () => {
        const cusId = {
            customerId : user.user.customerId
        }
        axios.post("http://localhost:8080/resturant/pasto", cusId).then(responseData => {
            console.log("response data on past order page", responseData.data)
            setPast(responseData.data)
        })
    }
    return (
    <div>
       <Homeside />
       <h1 style={{marginLeft:'25px'}}>Past Orders</h1>
       <div>
            {
                past.map(option => (
                    <Orderdetails key={option.checkoutId} rname={option.rname} resId= {option.resturantId} status={option.statusf} total = {option.total} delivery={option.delivery} pickup={option.pickup} date={option.checkoutDate}/>
                ))
            }
       </div>
    </div>)
}


export default Pastorders;