import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';

function Login() {

    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
            const loginAdmin = {
                email,
                pwd,
            };
            console.log("------",loginAdmin)
            console.log("local", localStorage.getItem('token'))
            const res = await axios.post("http://localhost:8080/login",loginAdmin);
            localStorage.setItem('token', res.data.token)
            console.log("response", res);
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }

    return(
    <div className ="login_cen">
    <div className ="logi">
            <img className="login__logo" 
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
            />
        <div className ="login_wc">
            <h4>Welcome back</h4>
            <div className ="login__container">
                <p>Sign in with your email and password</p>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                    <button onClick={cuslogin} className="login__button">Next</button>
                </form>
                <div className="login__text">
                    <p>New to Uber?</p>
                    <p className="login__create">Create an account</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}



export default Login;