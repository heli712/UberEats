import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {addToCart} from '../app/dishActions';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Dish = ({key,resturantId, disId, Name, imageKey, des, ing, price, veg, nonVeg, vegan}) => {
  const user = useSelector((state) => state.user);
  const {basket} = useSelector((state) => state.basket);
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState();
  // const [flag, setFlag] = useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function addtocart(){
    setOpen(false);
    let flag = false;
    const quant = parseInt(quantity,10)
    const cart = {
      customerId : user.user.customerId,
      dishId: disId,
      resturantId: resturantId,
      quantity: quant
    }
    if(basket.lenght != 0){
      basket.forEach(element => {
        if(element.resturantId != resturantId)
          flag = true
          setMessage("Dish cannot be added")
      })
    }
      if(!flag){
        console.log("Inside else")
      axios.post("http://localhost:8080/customer/addtocart", cart).then(responseData => {
        dispatch(addToCart({
          name: Name,
          price: price, 
          ingredients: ing,
          des: des,
          imageKey : imageKey,
          resturantId: resturantId,
          dishId: disId,
          veg: veg, 
          nonVeg: nonVeg,
          vegan:vegan,
          quantity: quantity,
          cartId : responseData.data.insertId
        }))
      })
      }
  }
  const increment = () => {
    setQuantity(quantity + 1);
  }

  const decrement = () => {
    setQuantity(quantity - 1);
    if(quantity <= 0) {
      setQuantity(1);
    }
  }

    return (<div style={{margin:'25px'}}>
            <Card sx={{ maxWidth: 345 }}>
              <p>{message}</p>
            <CardActionArea>

            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:8080/images/${imageKey}`}
              alt="green iguana"
            />
          
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {des, veg, nonVeg, vegan,ing}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       <div style={{display:'flex', flexDirection: "row", justifyContent:'space-between'}}>
       <Button size="small" color="primary" onClick={handleOpen}>
          Add to cart
        </Button>
        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">{Name}</h2>
          <p id="child-modal-description">
            {des}
          </p>
          {veg == 'yes' ? <p style={{color:'green'}}>Veg</p> : <p></p>}
          {nonVeg == 'yes' ? <p style={{color:'red'}}>nonVeg</p> : <p></p>}
          <div style={{display: 'flex', flexDirection: "row"}}>
            <Button onClick={increment}>+</Button>
            <p>{quantity}</p>
            <Button onClick={decrement}>-</Button>
          </div>
          <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
          <Button onClick={addtocart}>Add</Button>
          <p>${price}</p>
          </div>
        </Box>
      </Modal>
        <p style={{marginLeft: '100px'}}>${price}</p>
       </div>
      </CardActions>
    </Card>
    </div>)
}

export default Dish;