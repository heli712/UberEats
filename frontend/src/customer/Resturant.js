import React from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Resturant.css'
import {Link,useHistory} from 'react-router-dom'


const Resturant = ({key, resId, des, Opens_at,imageKey,Name}) => {
    const history = useHistory();
    return (
        <div className="res_card">
            {/* <Link to={{}} style={{textDecoration:"none"}}>  */}
            <Link to={{ 
              pathname:`/showres/${resId}`
            }}>
            <Card sx={{ maxWidth: 345 }}>
      {imageKey && <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={`http://localhost:8080/images/${imageKey}`}
      /> }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {Name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {des}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites">
            <FavoriteIcon />
        </IconButton>
        <Button size="small">{Opens_at}</Button>
      </CardActions>
    </Card>
            </Link>
        </div>
    )
}


export default Resturant;