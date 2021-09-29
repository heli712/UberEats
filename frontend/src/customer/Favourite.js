import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Resturant from './Resturant'
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import Homeside from './Homeside';

function Favourite(){
  const user = useSelector((state) => state.user);
  const [restaurants, setRestaurants] = useState([])

  useEffect(()=>{
    const cus = {
      customerId : user.user.customerId
    } 
      axios.post("http://localhost:8080/favorite/show", cus)
      .then(response => {
          console.log("res",response);
          if (response.data.error) {
              console.log("res",response);
          }
          else {
                  console.log(response.data)
                  setRestaurants(response.data)
              
          }
      })
     
  }, []);

  
  return(
      <div>
        <div className="search">
                <div className="search_icons">
                    <Homeside />
                </div>
                <div className="search_bar">
                    <div className="search_searchIcon"><SearchIcon  fontSize="large" /></div>
                    <input type="text" className="search_searchInput" placeholder="What are you craving?" />
                    <button className="search_button">Search</button>
                    <div className="search_cart">
                        <div style={{padding:'5px'}}><ShoppingCartIcon/></div>
                        <h3>1</h3>
                    </div>
                </div>
            </div>
            <div>
              <h1 style={{marginLeft:'50px'}}>Favourites</h1>
            </div>
            <div style={{display: 'flex', flexDirection: "row"}}>
          {
              restaurants.map(restaurant =>(
                  <Resturant id ={restaurant.restaurantId}  resId={restaurant.resturantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
              ))
          } 
          </div>
      
  </div>
  )
}

export default Favourite;