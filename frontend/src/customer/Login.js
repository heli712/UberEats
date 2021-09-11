import React, {useState} from 'react';
import axios from 'axios';

function Login() {

    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
           // const loginAdmin = {
             //   email,
              //  pwd,
            //};
            //console.log("------",loginAdmin)
            console.log("local", localStorage.getItem('token'))
            const res = await axios.get(
                "http://localhost:8080/inside",
                {
                    headers : {
                        'authorization' : localStorage.getItem('token') 
                    }
                }
            );
           // localStorage.setItem('token', res.data.token)
            console.log("response", res);
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }

    return(
    <div>
        <form>
            <input type="text" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
            <button onClick={cuslogin}>Login</button>
        </form>
    </div>
    )
}



export default Login;