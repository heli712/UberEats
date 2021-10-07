import React, { useEffect , useState} from "react";
import axios from 'axios';
import M from 'materialize-css';
import { useHistory, Link } from 'react-router-dom'
import Resturant from './Resturant'
import { useSelector,useDispatch } from 'react-redux';
import './Dashboard.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Search.css'
import Homeside from './Homeside';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const Home =()=>{

    const history = useHistory()
    const dispatch = useDispatch();
    const {basket} = useSelector((state) => state.basket);
    const [restaurants, setRestaurants] = useState([])
    const [name, setName] = useState();
    const user = useSelector((state) => state.user);
    const [searchFlag, setSearchflag] = useState(false);
    const [searchData, setSearchdata] = useState([])
    const [mode, setMode] = useState("delivery");
    const [type, setType] = useState("veg");
    const [filtermode, setFiltermode] = useState([]);
    const [filtertype, setFiltertype] = useState([]);

    useEffect(()=>{

        getRestaurants()
    }, []);

    useEffect(() => {
        switch(mode){
            case "delivery" :
                setFiltermode(restaurants.filter(item => item.delivery == 'Yes'))
            case "pickup" :
                setFiltermode(restaurants.filter(item => item.pickup == 'Yes'))
            default:
                setFiltermode(restaurants)
        }
        switch(type){
            case "veg":
                setFiltertype(restaurants.filter(item => item.veg == 'Yes'))
            case "nonVeg":
                setFiltertype(restaurants.filter(item => item.nonVeg == 'Yes'))
            case "vegan":
                setFiltertype(restaurants.filter(item => item.vegan == 'Yes'))
        }
    },[])
    const getRestaurants = async () =>{
        const cusCity = {
            city : user.user.city ? user.user.city : ''
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
                    <Link to="/cart">
                    <div className="search_cart">
                        <div style={{padding:'5px'}}><ShoppingCartIcon/></div>
                        <h3>{basket && basket.length}</h3>
                    </div>
                    </Link>
                </div>
            </div>
           <div style={{display: 'flex', flexDirection: "row"}}>
           <div style={{height:'100vh',width:'200px',margin:'25px'}}>
                <div style={{borderBottom:'1px solid grey'}}>
                    <RadioGroup name="use-radio-group" onChange={(e) => setMode(e.target.value)}>
                        <FormControlLabel value="delivery" label="delivery"  control={<Radio />} />
                        <FormControlLabel value="pickup" label="pickup" control={<Radio />} />
                    </RadioGroup>
                    <p>{mode}</p>
                </div>
                <div>
                    <RadioGroup name="use-radio-group"  onChange={(e) => setType(e.target.value)}>
                        <FormControlLabel value="veg" label="veg" control={<Radio />} />
                        <FormControlLabel value="nonVeg" label="nonVeg" control={<Radio />} />
                        <FormControlLabel value="vegan" label="vegan" control={<Radio />} />
                    </RadioGroup>
                    <p>{type}</p>
                </div>
           </div>
            <div>
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
           </div>
        </div>
    )
}

export default Home;

