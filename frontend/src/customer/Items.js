import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { removeFromCart } from '../app/dishActions';
import axios from 'axios';

const Items = ({id, cartId, dishId, name, ingredients,price, quantity, imageKey}) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    async function remove(){
        console.log("fdewfef",id)
        dispatch(removeFromCart({
            id: id
        }));
        const removeCart = {
            cartId: cartId
        }
        const res = await axios.post("http://localhost:8080/customer/removefromcart", removeCart)
        console.log("ndjfn", res)
    }
    return (<div>
         <div style={{margin: '25px'}}>
                        <Card sx={{ display: 'flex', justifyContent:'space-between', width: '500px'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {ingredients}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    ${price}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {quantity}
                                </Typography>
                            </CardContent>
                             <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                             <Button onClick={remove}>Remove</Button>
                            </Box>
                        </Box>
                        <CardMedia
                        component="img"
                        sx={{ width: 200}}
                        image={`http://localhost:8080/images/${imageKey}`}
                        alt="Live from space album cover"
                        />
                    </Card>
                    </div>
    </div>)
}



export default Items;