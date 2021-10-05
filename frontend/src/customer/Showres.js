import React,{useState, useEffect} from 'react';
import Dish from './Dish';
import axios from 'axios';
import './Search.css'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,useParams,Link} from 'react-router-dom'
import Homeside from './Homeside';
import SearchIcon from '@mui/icons-material/Search';
import Resdetails from './Resdetails';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Showres = () => {
    let {resId} = useParams();
    const history = useHistory();
    const {basket} = useSelector((state) => state.basket);
    const [dishes, setDishes] = useState([]);
    const dispatch = useDispatch();
    console.log("showdishe", resId)
    useEffect(() => {
        async function deldis() {
            try{
                const restId = {
                    resturantId: resId
                }
                console.log("res", resId);
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

    return (
        <div>
             <div className="search">
                <div className="search_icons">
                    <Homeside />
                </div>
                <div className="search_bar">
                    <div className="search_searchIcon"><SearchIcon  fontSize="large" /></div>
                    <input type="text" className="search_searchInput" placeholder="What are you craving?" />
                    <button className="search_button">Search</button>
                    <Link to="/cart">
                    <div className="search_cart" >
                        <div style={{padding:'5px'}}><ShoppingCartIcon/></div>
                        <h3>{basket && basket.length}</h3>
                    </div> 
                    </Link>
                </div>
            </div>
            <div>
                <Resdetails resId={resId}/>
            </div>
            <div style={{display: 'flex', flexDirection: "row"}}>
            { 
                dishes.map(dis => (
                    <Dish key={dis.dishId} resturantId = {resId} disId={dis.dishId} Name={dis.dname} imageKey={dis.profilepic} ing={dis.ingredients} price = {dis.Price} veg={dis.veg} nonVeg={dis.nonVeg} des={dis.rdes}  />
                ))
            }
            </div>
        
        </div>
    )
}



export default Showres;