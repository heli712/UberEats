import React, { useEffect , useState} from "react";
import axios from 'axios';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom'
import Resturant from './Resturant'
import { useSelector,useDispatch } from 'react-redux';
import './Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import Homeside from './Homeside';

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
 

    return(
        <div > 
                <div className="search">
                <div className="search_icons">
                    <Homeside />
                </div>
                <div className="search_bar">
                    <div className="search_searchIcon"><SearchIcon  fontSize="large" /></div>
                    <input type="text" className="search_searchInput" placeholder="What are you craving?" value={name} onChange={(e) => setName(e.target.value)}/>
                    <button onClick={searchRestaurant} className="search_button">Search</button>
                    <div className="search_cart">
                        <div style={{padding:'5px'}}><ShoppingCartIcon/></div>
                        <h3>1</h3>
                    </div>
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

