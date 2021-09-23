import React , {useState} from 'react';
import Dheader from '../customer/Dheader.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {useSelector } from 'react-redux';
import '../customer/Details.css'
import Dishpic from './Dishpic'
import Dishshow from './Dishshow'

const categories = [
    {
        value: '1',
        label: 'Appetizer',
      },
      {
        value: '2',
        label: 'Salads',
      },
      {
        value: '3',
        label: 'MainCourse',
      },
      {
        value: '4',
        label: 'Desserts',
      },
      {
          value: '5',
          label: 'Beverages'
      },
]

const cuisiness = [
    {
      value: '1',
      label: 'Chinese',
    },
    {
      value: '2',
      label: 'Indian',
    },
    {
      value: '3',
      label: 'Mediterrian',
    },
    {
      value: '4',
      label: 'Lebanese',
    },
    {
        value: '5',
        label: 'Italian'
    },
    {
        value: '6',
        label: 'thai'
    },
    {
        value: '8',
        label: 'mexican'
    },
  ];

const dropd = [
    {
        value: 'Yes',
        label: 'Yes'
    },
    {
        value: 'No',
        label: 'No'
    }
];



const Dish = () => {
    const resturant = useSelector((state) => state.resturant);
    const [name, setName] = useState();
    const [ingredients, setIngredients] = useState();
    const [des, setDes] = useState();
    const [veg, setVeg] = useState();
    const [nonVeg, setNonveg] = useState();
    const [vegan, setVegan] = useState();
    const [cuisine, setCuisine] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    async function updatingDetails(event) {
        event.preventDefault();
       try{
        const sendDish = {
            dname: name,
            rdes: des,
            cuisineId: cuisine,
            categoryId: category,
            ingredients,
            veg,
            nonVeg,
            vegan,
            price,
            resturantId: resturant.resturant.resturantId
        }
        console.log("res data", sendDish);
        const response = await axios.post("http://localhost:8080/dish/add",sendDish)
        console.log("respoionjnjfn", response)
       }catch(err){
           console.log(err)
           console.log("incatch");
       }
    }

    return (
    <div>
        <Dheader />
        <div className="details">
            <div className="details_title">
               <div className="details_edit">
                    <h1 className="details_customer">{resturant.resturant.rname}</h1>
               </div>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                 }}
                noValidate
                 autoComplete="off"
                >
                    <div className="details_input">
                    <TextField
                        style ={{width: "350px"}}
                        id="filled-name-input"
                        label="Dish Name"
                        type="text"
                        autoComplete="current-name"
                        variant="filled"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        style ={{width: "350px"}}
                        id="filled-name-input"
                        label="Price"
                        type="text"
                        autoComplete="current-name"
                        variant="filled"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        style ={{width: "350px"}}
                        id="filled-name-input"
                        label="Ingredients"
                        type="text"
                        autoComplete="current-name"
                        variant="filled"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                    />
                    <TextField style ={{width: "350px"}}
                        id="filled-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        variant="filled"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        helperText="Please select your cuisine"
                        variant="filled"
                    >
                    {cuisiness.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>    
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={veg}
                        onChange={(e) => setVeg(e.target.value)}
                        helperText="Veg"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField> 
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={nonVeg}
                        onChange={(e) => setNonveg(e.target.value)}
                        helperText="Non Veg"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>  
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={vegan}
                        onChange={(e) => setVegan(e.target.value)}
                        helperText="Vegan"
                        variant="filled"
                    >
                    {dropd.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField> 
                     <TextField
                        id="filled-select-cuisine"
                        select
                        label="Select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        helperText="Category"
                        variant="filled"
                    >
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>          
                     <Button variant="contained" className = "details_save" onClick={updatingDetails}>Save Changes</Button>
                    </div>
                </Box>
            </div>
            <div className="details_img">
                <Dishshow /> 
                <div>
                    <form onSubmit={submit} className="profile_chose">
                        <input onChange={fileSelected} type="file" accept="image/*" className="profile_browse"></input>
                        <button type="submit" className="profile_button">Submit</button>
                    </form>
                </div>
            </div>
        </div>  
    </div>
    )
}


export default Dish;