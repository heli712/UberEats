import React, {useState,useEffect}from 'react';
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
  const [icon, setIcon] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const req = {
      customerId: user.user.customerId,
      restaurantId: resId,
    };
    console.log("rebhdbhj",req)
    axios
      .post("http://localhost:8080/favorite/check", req)
      .then((response) => {
        console.log("res", response);
        if (response.data === "success") {
          console.log("res", response);
          setIcon(true);
        } else {
          console.log("--------",response.data);
          setIcon(false);
        }
      });
  },[icon]);
  async function addFav() {
    setIcon(true)
    const cusFav = {
      customerId: user.user.customerId,
      resturantId: resId
    }
    const res = await axios.post("http://localhost:8080/favorite/add", cusFav)
    console.log("res",res)
  }
  async function delFav() {
    setIcon(false)
    const cusdf = {
      customerId : user.user.customerId,
      resturantId: resId
    }
    console.log("Delete",cusdf)
    const res = await axios.post(" http://localhost:8080/favorite/remove",cusdf)
    console.log("res",res)
  }
  
  console.log(resId)
    return (
        <div className="res_card">
    
            <Card sx={{ maxWidth: 345 }}>
            <Link to={{ 
              pathname:`/showres/${resId}`
            }} style={{textDecoration:"none"}}>
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
      </Link>
      <CardActions>
      <IconButton aria-label="add to favorites">
            <div>
              {icon ? (
                <span
                  onClick={() => {
                    delFav();
                  }}
                >
                  {" "}
                  <FavoriteIcon />{" "}
                </span>
              ) : (
                <span
                  onClick={() => {
                    addFav();
                  }}
                >
                  {" "}
                  <FavoriteBorderIcon />{" "}
                </span>
              )}
            </div>
          </IconButton>
        
        <Button size="small">{Opens_at}</Button>
      </CardActions>
    </Card>
        </div>
    )
}


export default Resturant;