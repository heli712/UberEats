import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Homeside from './Homeside';
import Items from './Items';
import Order from './Order';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Link} from 'react-router-dom';

const Cart = () => {
    
    const {basket} = useSelector((state) => state.basket);
    const user = useSelector((state) => state.user);
    const [address, setAddress] = useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        console.log("Inside handleChange")
        setValue(event.target.value);
    };

    useEffect(() => {
        const getAddress = () => {
            console.log("show address", user.user.customerId)
            const cusId = {
                customerId : user.user.customerId
            }
            axios.post("http://localhost:8080/customer/getAddress", cusId).then(responseData => {
                console.log("response", responseData)
                setAddress(responseData.data)
            })
        }
        getAddress()
    }, [])
    return (
        <div>
           <div style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
                 <div >
                    <Homeside />
                </div>
                <div style={{backgroundColor:'#ededed',width:'600px'}}></div>
           </div>
            <div style ={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
                <div>
                    <div style={{marginRight:'200px'}}>
                    <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between',width:'500px'}}>
                        <h3 style={{marginLeft:'25px'}}>Select delivery Address</h3>
                        <Link to="address" style={{textDecoration:'none'}}><div style={{ backgroundColor:'#ededed',height:'45px',padding:'10px',borderRadius:'25px',color:'black',marginTop:'10px'}}>+ Add Address</div></Link>
                           
                        </div>
                        <div style={{display: 'flex', flexDirection: "column", marginLeft:'25px'}}>
                            <p>{value}</p>
                            <RadioGroup name="use-radio-group" onChange={handleChange}>
                                {   
                                    address.map(option => (
                                        <div>
                                        <FormControlLabel key={option.caddressId} value={option.caddressId} control={<Radio />}  label={option.street} />
                                            <div style={{display: 'flex', flexDirection: "row"}}>
                                                <p style={{marginRight:'10px',marginTop:'-10px', marginLeft:'20px'}}>{option.city},</p>
                                                <p style={{marginTop:'-10px'}}>{option.state}</p>
                                            </div>
                                            <p style={{marginTop:'-15px', marginLeft:'20px'}}>{option.country}</p>
                                        </div>
                                        ))
                                    }
                            </RadioGroup>
                        </div>
                    </div>
                    <div >
                        <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between',width:'500px'}}>
                            <h2 style={{marginLeft:'25px',marginBottom:'-20px'}}>Your items</h2>
                            {
                                basket.length == 0 ? <Link to='/dashboard' style={{textDecoration:'none'}}><div style={{ backgroundColor:'#ededed',height:'45px',padding:'10px',borderRadius:'25px',color:'black',marginTop:'10px'}}>+ Add items</div></Link>
                                : <Link to={{ pathname:`/showres/${basket[0].resturantId}`}} style={{textDecoration:'none'}}><div style={{ backgroundColor:'#ededed',height:'45px',padding:'10px',borderRadius:'25px',color:'black',marginTop:'10px'}}>+ Add items</div></Link>
                            }
                            </div>
                    {   basket.length == 0
                        ? <h1 style={{marginLeft:'25px'}}>Your Cart is empty</h1>
                        :
                        basket.map(cart => (
                            <Items id={cart.dishId} cartId = {cart.cartId} disId={cart.dishId} name={cart.name} ingredients={cart.ingredients} price={cart.price} quantity={cart.quantity} imageKey={cart.imageKey} />
                        ))
                    }
                    </div>
                    
                </div>
                <div style={{backgroundColor:'#ededed',width:'600px', height:'100vh',minHeight:'100%',alignItems: 'center'}}>
                   { basket.length == 0 ? <p style={{marginLeft:'25px'}}>Your cart is empty</p> : <Order caddressId={value}/>} 
                </div>
            </div>
        </div>
    )
}

export default Cart;