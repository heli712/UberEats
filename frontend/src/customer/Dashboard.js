import React, { useEffect , useState} from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Resturant from './Resturant'
import { useSelector } from 'react-redux';
import './Dashboard.css'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import { useDispatch } from 'react-redux';
import { logout } from '../app/actions';
import {removingDetails} from '../app/detailActions';
import { SwipeableDrawer, Switch } from "@mui/material";

const Home =()=>{

    const history = useHistory()
    const dispatch = useDispatch();
    const [restaurants, setRestaurants] = useState([])
    const [name, setName] = useState();
    const userDetails = useSelector((state) => state.userDetails);
    const [searchFlag, setSearchflag] = useState(false);
    const [searchData, setSearchdata] = useState([])




    useEffect(()=>{

        getRestaurants()
    }, []);

    const getRestaurants = async () =>{
        const cusCity = {
            city : userDetails.userDetails.city
        } 
        console.log("city", cusCity)
        await axios.post("http://localhost:8080/resturant/location", cusCity)
    //     .then((response) => 
    //   {
    //     return JSON.parse(response)
    //   })
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
                M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
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
    async function searchRestaurant (){
        setSearchflag(true)
        try{
            const sendS = {
                name: name
            }
            console.log(sendS)
           await axios.post("http://localhost:8080/dish/find",sendS)
        
            .then(responseData => {
                console.log("res",responseData);
                if (responseData.data.error) {
                    console.log("res",responseData);
                    M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
                }
                else {
                        setSearchdata(responseData.data)
                        console.log(responseData.data)
                }
            })
        }catch(err){
            console.log("error",err)
            console.log("in catch")
        }

    }

    const [drawerOpen, setDrawerOpen] = useState(false); 

    return(
        <div > 
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
                    <img className="search__logo" 
                        src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
                        alt=""
                    />
                </div>
                <div className="search_bar">
                    <SearchIcon className="search_searchIcon" fontSize="large" />
                    <input type="text" className="search_searchInput" placeholder="What are you craving?" value={name} onChange={(e) => setName(e.target.value)}/>
                    <button onClick={searchRestaurant} className="search_button">Search</button>
                    <div className="search_cart">
                        <ShoppingCartIcon style={{fontSize:30, padding:10}}/>
                        <h2>1</h2>
                    </div>
                </div>
                
                <div className="search_signout" onClick={signout}>
                    sign out
                </div>
            </div>
            { searchFlag ? 
            <div className="res_home">
            {
                searchData.map(restaurant =>(
                    <Resturant key ={restaurant.restaurantId} resId = {restaurant.resturantId} Name ={restaurant.rname} Opens_at={restaurant.start} des={restaurant.cdes} imageKey={restaurant.profilepic}/>
                ))
            }
            </div>
                 :
                 <div className="res_home">
                {
                    restaurants.map(rest =>(
                        <Resturant key ={rest.restaurantId} resId = {rest.resturantId} Name ={rest.rname} Opens_at={rest.start} des={rest.cdes} imageKey={rest.profilepic}/>
                    ))
                }
                </div>
                 
        }
        </div>
    )
}

export default Home;

