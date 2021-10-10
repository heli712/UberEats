import React, {useState, useEffect}from 'react';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {emptyBasket} from '../app/dishActions'
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const Order = ({caddressId,delivery,pickup}) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const {basket} = useSelector((state) => state.basket);
    const [subtotal, setSubTotal] = useState();
    const [total, setTotal] = useState();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false)
        dispatch(emptyBasket())
        setSubTotal(0);
        setTotal(0);
    }
    async function placeorder() {
        try{
            const addbasket = {
                dishes: basket,
                customerId: user.user.customerId,
                resturantId: basket[0].resturantId,
                caddressId: caddressId,
                delivery: delivery,
                pickup: pickup
            }
            const res = await axios.post("http://localhost:8080/customer/order",addbasket);
            if(res.data.message == 'Order placed'){
                setOpen(true)
            }
            console.log("response in cart ", res);
        } catch(err){
            console.log(err);
            console.log("incatch");
        }
    }
    console.log("order page", basket.length);
    useEffect(() => {
        const getTotal = () => {
            var tot = 0
            basket.forEach(element => {
                tot = tot + element.price*element.quantity
            })
            setSubTotal(tot);
            var ftot = 0;
            ftot = tot + tot*0.1
            var floatot = parseFloat(ftot).toFixed(2);
            setTotal(floatot)
        }
        getTotal()
    },[total])
    return (
    <div style={{alignItems:'center',marginLeft:'70px'}}>
        { delivery == 'Yes' ? caddressId == 0  ? 
            <div style={{display: 'flex', flexDirection: "column"}}>
                <p style={{marginLeft:'25px'}}>Select delivery address</p>
                <Button style={{marginLeft:'25px', backgroundColor:'green', color:'white', width:'400px',height:'50px',border:'1px solid green'}} disabled>Place Order</Button>
            </div> : <Button style={{margin:'25px', backgroundColor:'green', color:'white', width:'400px',height:'50px',border:'1px solid green'}} onClick={placeorder}>Place Order</Button>
            : pickup == 'Yes' ? 
            <Button style={{margin:'25px', backgroundColor:'green', color:'white', width:'400px',height:'50px',border:'1px solid green'}} onClick={placeorder}>Place Order</Button> : <Button style={{marginLeft:'25px', backgroundColor:'green', color:'white', width:'400px',height:'50px',border:'1px solid green'}} disabled>Place Order</Button>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Order placed Successfull
                </Typography>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography> */}
                </Box>
            </Modal>
        
        <div style={{width: "400px",marginLeft:'25px',marginTop:'-25px',borderBottom:'0.5px solid grey'}}>
            <p style={{fontSize:'12px',color:'grey'}}>If you’re not around when the delivery person arrives, they’ll leave your order at the door. By placing your order, you agree to take full responsibility for it once it’s delivered.</p>
        </div>
        <div style={{width: "400px",borderBottom:'0.5px solid grey',marginLeft:'25px'}}>
        <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
            <p >SubTotal</p>
            <p style={{marginLeft:'25px'}}>${subtotal}</p>
        </div>
        <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
            <p >Taxes & Fees</p>
            <p style={{marginLeft:'25px'}}>${subtotal*0.1}</p>
        </div>
        </div>
        <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between',width: "400px",marginLeft:'25px'}}>
            <h2>Total</h2>
            <h2>${total}</h2>
        </div>
    </div>)
}


export default Order;