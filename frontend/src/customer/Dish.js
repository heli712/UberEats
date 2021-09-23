import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const Dish = ({key, disId, Name, imageKey, des, ing, price, veg, nonVeg, vegan}) => {
    console.log(price);
    return (<div>
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
            {imageKey &
            <CardMedia
              component="img"
              height="140"
              image={`http://localhost:8081/images/${imageKey}`}
              alt="green iguana"
            />
            }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {des, veg, nonVeg, vegan,ing}
            <p>{price}</p>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to cart
        </Button>
      </CardActions>
    </Card>
    </div>)
}

export default Dish;