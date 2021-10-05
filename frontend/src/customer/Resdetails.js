import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Resdetails.css';

const Resdetails = ({resId}) => {
    const [restaurant, setRestaurant] = useState([]);
    useEffect(() => {
        function getRest(){
            try {
                const restId = {
                    resturantId: resId
                }
                console.log("res in details", resId);
                axios.post("http://localhost:8080/resturant/findResturant", restId).then(responseData => {
                    console.log("In res details",responseData.data)
                    if(responseData.data.error){
                        console.log(responseData.data.error);
                    }
                    else{
                        setRestaurant(responseData.data);
                        console.log(responseData.data);
                    }
                })
            }catch(err){
                console.log(err);
                    console.log("incatch");
            }
        }
        getRest()     
    }, [])
    console.log("______",restaurant.profilepic)
    return (<div>
        {restaurant.profilepic &&
            <img
                className="res__image" 
                src={`http://localhost:8080/images/${restaurant.profilepic}`}
            />
        }
        <div>
            <span style={{ marginLeft: '25px',  fontSize: '34px'}}><b>{restaurant.rname}</b></span>
        </div>
        <div style={{margin:'25px'}}>
            <p>{restaurant.cdes}</p>
      </div>
        <div style={{display: 'flex', flexDirection: "row",justifyContent:'space-between',width:'50%',margin:'25px'}}>
        <div style={{display: 'flex', flexDirection: "row"}}>
            <span style={{padding:'5px'}}><b>Timings</b></span>
            <span style={{padding:'5px'}}><b>{restaurant.start}</b></span>
            <span style={{padding:'5px'}}><b>to</b></span>
            <span style={{padding:'5px'}}><b>{restaurant.close}</b></span>
        </div>
        <div style={{display: 'flex', flexDirection: "row", marginTop:'-20px'}}>
            { restaurant.delivery == 'Yes' ? <p style={{padding:'5px'}}>Delivery</p> : <p></p>}
            { restaurant.pickup == 'Yes' ? <p style={{padding:'5px'}}>Pickup</p> : <p></p>}
        </div>
        <div style={{display: 'flex', flexDirection: "row",marginTop:'-20px'}}>
            {restaurant.veg == 'yes' ? <p style={{color:'green'}}>Veg</p> : <p></p>}
            {restaurant.nonVeg == 'yes' ? <p style={{color:'red'}}>nonVeg</p> : <p></p>}
            {restaurant.Vegan == 'yes' ? <p style={{color:'blue'}}>Vegan</p> : <p></p>}
        </div>
        </div>
        
    </div>)
};

export default Resdetails;