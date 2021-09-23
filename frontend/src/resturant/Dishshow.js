import React,{useEffect, useState} from 'react';
import axios from 'axios';

const Dishshow = () => {
    const [key, setKey] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                    dishId: 1,
                }
                const res = await axios.post("http://localhost:8080/dish/key", resId)
                console.log("------",res)
                setKey(res.data.key)
                }catch(err){
                    console.log(err)
                }
            } 
            getkey()
        }, [])
    return (
    <div>
        <div className="showProfile">
            {key && <img src={`http://localhost:8080/images/${key}`} className="showProfile_img"/>}
        </div>
    </div>
    )
}

export default Dishshow;