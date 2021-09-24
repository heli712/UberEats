import React , {useState} from 'react';
import Dheader from '../customer/Dheader.js';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import {useSelector } from 'react-redux';
import '../customer/Details.css'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';


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



const Dish = () => {
    const resturant = useSelector((state) => state.resturant);
    const [name, setName] = useState();
    const [ingredients, setIngredients] = useState();
    const [des, setDes] = useState();
    const [type, setType] = useState("");
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
                veg: type === "veg" ? "yes" : "no",
                nonVeg: type === "nonVeg" ? "yes" : "no",
                vegan: type === "vegan" ? "yes" : "no",
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
                        id="Cuisine"
                        select
                        label="Select"
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                        helperText="cuisine"
                        variant="filled"
                    >
                    {cuisiness.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                     </TextField>      
                     <TextField
                        id="Category"
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
                     <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            label="Age"
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value={"veg"}>Veg</MenuItem>
                            <MenuItem value={"nonVeg"}>Non Veg</MenuItem>
                            <MenuItem value={"vegan"}>Vegan</MenuItem>
                        </Select>
                     <Button variant="contained" className = "details_save" onClick={updatingDetails}>Save Changes</Button>
                    </div>
                </Box>
            </div>
            <div className="details_img">
            </div>
        </div>  
    </div>
    )
}


export default Dish;