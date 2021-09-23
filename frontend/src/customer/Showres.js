import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import Dish from './Dish';
import axios from 'axios';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import { useDispatch } from 'react-redux';
import { logout } from '../app/actions';
import { useHistory} from 'react-router-dom'
import {removingDetails} from '../app/detailActions';


const Showres = () => {
    let {resId} = useParams();
    const history = useHistory();
    const [dishes, setDishes] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        async function deldis() {
            try{
                const restId = {
                    resturantId: resId
                }
                await axios.post("http://localhost:8080/dish/findresturant", restId).then(responseData => {
                    console.log(responseData)
                    if(responseData.data.error){
                        console.log(responseData.data.error);
                    }
                    else{
                        setDishes(responseData.data);
                        console.log(responseData.data);
                    }
                })
            }catch(err){
                console.log(err);
                console.log("incatch");
            }
        }
        deldis()
    }, [])
    function signout() {
        dispatch(logout());
        dispatch(removingDetails())
        localStorage.setItem('token',null);
        history.push("/");
    }
    return (
        <div>
            <div className="search">
                <div className="search_icons">
                    <MenuIcon />
                    <img className="search__logo" 
                        src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
                        alt=""
                    />
                </div>
                <div className="search_bar">
                    <SearchIcon className="search_searchIcon" />
                    <input type="text" className="search_searchInput" placeholder="What are you craving?" />
                    <button className="search_button">Search</button>
                    <div className="search_cart">
                        <ShoppingCartIcon style={{fontSize:30, padding:10}}/>
                        <h2>1</h2>
                    </div>
                </div>
                <div className="search_signout" onClick={signout}>
                    Sign out
                </div>
            </div>
            { 
                dishes.map(dis => (
                    <Dish key={dis.dishId} disId={dis.dishId} Name={dis.dname} imageKey={dis.profilepic} ing={dis.ingredients} price = {dis.Price} veg={dis.veg} nonVeg={dis.nonVeg} des={dis.rdes}  />
                ))
            }
        
        </div>
    )
}



export default Showres;