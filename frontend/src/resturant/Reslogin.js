import React, {useState} from 'react';
import './Reslogin.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { loginResturant } from '../app/resActions';

const Reslogin = () => {
    const dispatch = useDispatch();
    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");

    const history = useHistory();
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
            const loginRes = {
                email,
                pwd,
            };
            console.log("------",loginRes)
            const res = await axios.post("http://localhost:8080/resturant/login",loginRes);
            localStorage.setItem('token', res.data.token);
            if(res.data.success == 1) {
                dispatch(loginResturant({
                    email: res.data.email,
                    resturantId: res.data.id,
                    name: res.data.name,
                    loggedIn: true, 
                }))
              history.push("/resdetails")
            }
            console.log("response", res);
        }catch(err){
            console.error(err);
            console.log("incatch")
        }
    }

    return(
    <div className ="res_login_cen">
    <div className ="res_logi">
            <img className="res_login__logo" 
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
            />
        <div className ="res_login_wc">
            <h4>Welcome back</h4>
            <div className ="res_login__container">
                <p>Sign in with your email and password</p>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                    <button onClick={cuslogin} className="res_login__button">Next</button>
                </form>
                <div className="res_login__text">
                    <p>New to Uber?</p>
                    <Link to="/resregister" className="res_login_ul"><p className="res_login__create">Create an account</p></Link>
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}


export default Reslogin;