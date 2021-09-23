import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Showdish = ({key, dishId, Name, imageKey, ingredients}) => {
    const resturant = useSelector((state) => state.resturant);
    async function deldish() {
        try {
            const deld = {
                dishId: dishId,
                resturantId: resturant.resturant.resturantId
            }
            const res = await axios.post("http://localhost:8080/dish/delete",deld)
            console.log(res)
        }
        catch(err) {
            console.log(err)
            console.log("in catch")
        }
    }
    return <div style={{margin:"25px"}}>
        <Card sx={{ maxWidth: 345 }}>
            {imageKey && 
                <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={`http://localhost:8081/images/${imageKey}`}
              />
            }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ingredients}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">edit</Button>
        <Button size="small" onClick={deldish}>Delete</Button>
      </CardActions>
    </Card>
    </div>;
}


export default Showdish;