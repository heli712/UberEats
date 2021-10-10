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
    console.log("______",restaurant)
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
        <div style={{display: 'flex', flexDirection: "row",justifyContent:'space-between',width:'80%',margin:'25px'}}>
        <div style={{display: 'flex', flexDirection: "row"}}>
            <span style={{paddingLeft:'5px'}}><b>Timings</b></span>
            <span style={{paddingLeft:'5px'}}><b>{restaurant.start}</b></span>
            <span style={{paddingLeft:'5px'}}><b>to</b></span>
            <span style={{paddingLeft:'5px'}}><b>{restaurant.close}</b></span>
        </div>
        <div style={{display: 'flex', flexDirection: "row", marginTop:'-20px'}}>
            { restaurant.delivery == 'Yes' ? <p style={{padding:'5px'}}>Delivery</p> : <p></p>}
            { restaurant.pickup == 'Yes' ? <p style={{padding:'5px'}}>Pickup</p> : <p></p>}
        </div>
        <div style={{display: 'flex', flexDirection: "row",marginTop:'-20px'}}>
            {restaurant.veg == 'Yes' ? <p style={{color:'green'}}>Veg</p> : <p></p>}
            {restaurant.nonVeg == 'Yes' ? <p style={{color:'red',marginLeft:'5px'}}>nonVeg</p> : <p></p>}
            {restaurant.vegan == 'Yes' ? <p style={{color:'blue',marginLeft:'5px'}}>Vegan</p> : <p></p>}
        </div>
        <div style={{marginTop:'-20px'}}>
            <div style={{display: 'flex', flexDirection: "row"}}>
                <p><b>Address:</b></p>
                <div style={{display: 'flex', flexDirection: "column"}}>
                    <div style={{marginLeft:'10px', display: 'flex', flexDirection: "row", marginBottom:'-30px'}}>
                        <p>{restaurant.street},</p>
                        <p style={{marginLeft:'5px'}}>{restaurant.city}</p>
                    </div>
                <div style={{marginLeft:'10px', display: 'flex', flexDirection: "row"}}>
                    <p>{restaurant.state},</p>
                    <p style={{marginLeft:'5px'}}>{restaurant.country}</p>
                </div>
                </div>
            </div>
        </div>
        <div style={{display: 'flex', flexDirection: "row",marginTop:'-20px'}}>
            <p><b>Phone No:</b>{restaurant.mobileNo}</p>
        </div>
        </div>
       
    </div>)
};

export default Resdetails;