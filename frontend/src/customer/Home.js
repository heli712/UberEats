import React from 'react';
import './Home.css'

const Home = () => {
    return (
        <div>
            <div className="home__background">
            <div style={{backgroundImage: `url("https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/7f3767e1f1931a0b3d5e2af48b47575b.svg")`, 
                backgroundRepeat: 'no-repeat',
                width: '519px',
                height: '718px'
            }}>
            </div> 
                <div></div>     
                <div style={{backgroundImage: `url("https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/57dc47b168662ba80b01c66ed1e1420c.svg")`, 
                    backgroundRepeat: 'no-repeat',
                    width: '556px',
                    height: '718px'
                }}></div>
            </div>
        </div>
    )
}


export default Home;