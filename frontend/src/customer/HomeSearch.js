import React from 'react';
import './HomeSearch.css'

const HomeSearch = () => {
    return (
        <div className="homesearch">
            <div className="homesearch_title">
                <h1>Order your neighborhood's top spots</h1>
                <div className="homesearch__input">
                    <div className="homesearch__address">
                        <input placeholder="Enter delivery address"></input>
                    </div>
                    <div className="homesearch__space"></div>
                    <div className="homesearch__delivery">
                        <input placeholder="Deliver now"></input>
                    </div>
                    <div className="homesearch__space"></div>
                    <button>Find Food</button>
                </div>
            </div>
        </div>
    )
}


export default HomeSearch;