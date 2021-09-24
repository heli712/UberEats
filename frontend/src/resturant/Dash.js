import React,{useState,useEffect} from 'react';
import Resheader from './Resheader'
import Resbutton from './Resbutton'
import './Dash.css'
import Showdish from './Showdish'
import axios from 'axios';
import M from 'materialize-css';
import { useSelector } from 'react-redux';


const Dash = () => {
    const resturant = useSelector((state) => state.resturant);
    const [dishes, setDishes] = useState([]);

    useEffect(()=>{
        getDishes()
    }, []);

    const getDishes = async () =>{
        const resId = {
            resturantId : resturant.resturant.resturantId
        } 
        await axios.post("http://localhost:8080/dish/findresturant", resId)
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
                M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
            }
            else{
                    setDishes(responseData.data)
                    console.log(responseData.data)
            }
        })

    }

    return (
        <div>
            <div className="dash">
                <Resheader />
                <Resbutton />
            </div>
            <div style={{display:"flex", flexDirection:"row"}}>
            {
                dishes.map(dish =>(
                    <Showdish key ={dish.dishId} dishId = {dish.dishId} des={dish.rdes} Name ={dish.dname} price={dish.Price} imageKey={dish.profilepic} ingredients={dish.ingredients} cuisine={dish.cuisineId} category={dish.categoryId}/>
                ))
            }
            </div>
        </div>
        
    )
}



export default Dash;