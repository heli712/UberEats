import React, { useEffect , useState} from "react";
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../app/actions';
import {removingDetails} from '../app/detailActions';
import { SwipeableDrawer, Switch } from "@mui/material";
import Resturant from './Resturant'


/**
 * 
 */
const Fav = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user);
    const [restaurants, setRestaurants] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        getfav()
    },[])
    async function getfav() {
        const cus = {
            customerId : user.user.customerId
        } 
        await axios.post("http://localhost:8080/favorite/show", cus)
    //     .then((response) => 
    //   {
    //     return JSON.parse(response)
    //   })
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
            }
            else {
                    //setcustomerData(responseData.data)
                    setRestaurants(responseData.data)
                    console.log(responseData.data)
            }
        })
    }
    function signout() {
        dispatch(logout());
        dispatch(removingDetails());
        localStorage.setItem('token',null);
        history.push("/");
    }
    return (<div>
        <div className="search">
                <div className="search_icons">
                    <MenuIcon />
                    {/* <SwipeableDrawer
                        anchor='left'
                        open={drawerOpen}
                        onClose={setDrawerOpen(false)}
                        onOpen={setDrawerOpen(true)}
                    >
                        Heli Patel
                    </SwipeableDrawer> */}
                    <Link to='/dashboard'>
                    <img className="search__logo" 
                        src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
                        alt=""
                    /> </Link>
                </div>
                <div className="search_bar">
                    <SearchIcon className="search_searchIcon" fontSize="large" />
                    <input type="text" className="search_searchInput" placeholder="What are you craving?"/>
                    <button className="search_button">Search</button>
                    <div className="search_cart">
                        <ShoppingCartIcon style={{fontSize:30, padding:10}}/>
                        <h2>1</h2>
                    </div>
                </div>
                
                <div className="search_signout" onClick={signout}>
                    sign out
                </div>
            </div>
            <div className="res_home">
                {
                    restaurants.map(rest =>(
                        <Resturant key ={rest.restaurantId} resId = {rest.resturantId} Name ={rest.rname} Opens_at={rest.start} des={rest.cdes} imageKey={rest.profilepic}/>
                    ))
                }
            </div>
                 
    </div>)
}



export default Fav;