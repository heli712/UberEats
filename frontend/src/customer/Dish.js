import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


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

const Dish = ({key, disId, Name, imageKey, des, ing, price, veg, nonVeg, vegan}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    return (<div style={{margin:'25px'}}>
            <Card sx={{ maxWidth: 345 }}>
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
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <img src={`http://localhost:8080/images/${imageKey}`} style={{width:'300px',height:'200px'}}></img>
          <h2 id="child-modal-title">{Name}</h2>
          <p id="child-modal-description">
            {des}
          </p>
          <p>{veg}</p> <p>{nonVeg}</p> 
          <div style={{display: 'flex', flexDirection: "row", justifyContent:'space-between'}}>
          <Button onClick={handleClose}>Close</Button>
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