import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Homeside from './Homeside';
import {useSelector} from 'react-redux'
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Deliveryaddress from './Deliveryaddress';

const Orderdishes = () => {
    const user = useSelector((state) => state.user);
    let {checkoutId} = useParams();
    const [dish, setDish] = useState([]);
    useEffect(() => {
        getpast()
    },[])
    const getpast = () => {
        const cusId = {
            checkoutId: checkoutId
        }
        console.log("======", cusId)

        axios.post("http://localhost:8080/resturant/pastorders",cusId).then(responseData => {
            console.log("pastorders", responseData)
            setDish(responseData.data)
        })
    }
    console.log("dish addedIS")
    return (
    <div>
        <div style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
                 <div >
                    <Homeside />
                </div>
                <div style={{backgroundColor:'#ededed',width:'600px'}}></div>
           </div>

        <div style={{display: 'flex', flexDirection: "row",justifyContent:'space-between'}}>
        <div style={{margin:'25px'}}>
        <h1 style={{marginLeft:'25px'}}>Ordered dishes</h1>
            {
                dish.map((option) => (
                    <div>
                    <Card sx={{ display: 'flex', justifyContent:'space-between', width: '600px',margin:'25px'}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {option.dname}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {option.ingredients}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    ${option.Price}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    qty:{option.quantity}
                                </Typography>
                            </CardContent>
                        </Box>
                        {option.profilepic &&
                            <CardMedia
                            component="img"
                            sx={{ width: 200}}
                            image={`http://localhost:8080/images/${option.profilepic}`}
                            alt="Live from space album cover"
                            />
                        }
                    </Card>
                    </div>
                ))
            }
        </div>
        <div style={{backgroundColor:'#ededed',width:'600px', minHeight:'100%', height:'100vh', alignItems: 'center'}}>
             <Deliveryaddress street={dish[0]?.street} city={dish[0]?.city} state={dish[0]?.state} country={dish[0]?.country} status={dish[0]?.statusf} total={dish[0]?.total} date={dish[0]?.checkoutDate}/>
        </div>
        </div>
    </div>
    )
}



export default Orderdishes;