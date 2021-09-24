import React, {useState}from 'react';
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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';




const Resturant = ({key, resId, des, Opens_at,imageKey,Name}) => {
  const [fav, setFav] = useState(false);
  const user = useSelector((state) => state.user);
  async function addFav() {
    setFav(true);
    const cusFav = {
      customerId: user.user.customerId,
      resturantId: resId
    }
    const res = await axios.post("http://localhost:8080/favorite/add", cusFav)
    console.log("res",res)
  }
  async function delFav() {
    setFav(false);
    const cusFav = {
      customerId: user.user.customerId,
      resturantId: resId
    }
    const res = await axios.post("http://localhost:8080/favorite/remove", cusFav)
    console.log("res",res)
  }
  console.log(resId)
    return (
        <div className="res_card">
            {/* <Link to={{}} style={{textDecoration:"none"}}>  */}
    
            <Link to={{ 
              pathname:`/showres/${resId}`
            }} style={{textDecoration:"none"}}>
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
           {fav ?  <FavoriteIcon onClick={delFav}/> : <FavoriteBorderIcon onClick={addFav}/>}
        </IconButton>
        <Button size="small">{Opens_at}</Button>
      </CardActions>
    </Card>
            </Link>
        </div>
    )
}


export default Resturant;