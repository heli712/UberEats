import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Homeside from './Homeside';
import Items from './Items';
import { Button } from '@mui/material';
import axios from 'axios';
import Showaddress from './Showaddress';

const Cart = () => {
    const user = useSelector((state) => state.user);
    const {basket} = useSelector((state) => state.basket);
    const [total, setTotal] = useState();
    console.log("dhwd",basket[0].resturantId);
    async function placeorder() {
        try{
            const addbasket = {
                dishes: basket,
                customerId: user.user.customerId,
                resturantId: basket[0].resturantId
            }
            const res = await axios.post("http://localhost:8080/customer/order",addbasket);
            console.log("response in cart ", res);
        } catch(err){
            console.log(err);
            console.log("incatch");
        }
    }
    useEffect(() => {
        const getTotal = () => {
            var tot = 0
            basket.forEach(element => {
                tot = tot + element.price*element.quantity
            })
            setTotal(tot);
        }
        getTotal()
    },[total])
    return (
        <div>
            <div className="search_icons">
                <Homeside />
            </div>
            
            
            <div style ={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
                <div>
                    <div >
                    { 
                        basket.map(cart => (
                            <Items id={cart.dishId} cartId = {cart.cartId} disId={cart.dishId} name={cart.name} ingredients={cart.ingredients} price={cart.price} quantity={cart.quantity} imageKey={cart.imageKey} />
                        ))
                    }
                    </div>
                    <p style={{marginLeft:'25px'}}>Total:${total}</p>
                    <div>
                        <Button style={{margin:'25px', backgroundColor:'green', color:'white', width:'500px',height:'50px',border:'1px solid green'}} onClick={placeorder}>Place Order</Button>
                    </div>
                </div>
                <div style={{marginRight:'200px'}}>
                    <Showaddress />
                </div>
            </div>
        </div>
    )
}

export default Cart;