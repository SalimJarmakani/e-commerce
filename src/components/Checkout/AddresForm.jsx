import React , {useState, useEffect} from 'react'

import { InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form';

import {commerce} from '../../lib/commerce';
import CustomTextField from './CustomTextField';
const AddressForm = ({checkoutToken, next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions,setShippingOptions] = useState([]);
  const [shippingOption,setShippingOption] = useState('');


  const methods= useForm();


  const fetchShippingCountries = async (checkoutTokenId) => {

    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0])

  };

  const countries = Object.entries(shippingCountries).map(([code,actual])=> ({id:code,label:actual}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code,actual])=> ({id:code,label:actual}));

  const options = shippingOptions.map((sO)=> ({id: sO.id,label:`${sO.description} - (${sO.price.formatted_with_symbol})`}));
  const fetchSubdivisions = async (countryCode) => {

    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

    console.log(subdivisions);

    setShippingSubdivisions(subdivisions);

    setShippingSubdivision(Object.keys(subdivisions)[0]);

  };

  const fetchShippingOptions = async (checkoutTokenId,country,region=null)=> {

    const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});

    setShippingOptions(options);
    setShippingOption(options[0].id);

  };
  useEffect(()=>{

    fetchShippingCountries(checkoutToken.id);
  },[]);

  useEffect(()=>{

    if(shippingCountry) fetchSubdivisions(shippingCountry);

  },[shippingCountry]);


  useEffect(()=>{

    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id,shippingCountry,shippingSubdivision);

  },[shippingSubdivision]);

  return (
    <>
       <Typography variant="h6" gutterBottom> Shipping Address</Typography>

       <FormProvider {...methods}>

          <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingCountry,shippingSubdivision,shippingOption}))}>
             
             <Grid container spacing={3}>

                <CustomTextField required name='firstName' label='First Name'/>
                <CustomTextField required name='LastName' label='Last Name'/>
                <CustomTextField required name='Address1' label='Address'/>
                <CustomTextField required name='Email' label='Email'/>
                <CustomTextField required name='City' label='City'/>
                <CustomTextField required name='City' label='City'/>
                
                <Grid item xs={12} sm={6}>
                    <InputLabel> Shipping country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>

                      {countries.map((country)=>(

                        
                        <MenuItem key={country.id} value={country.id}> 

                           {country.label}
                        
                        </MenuItem>

                      ))}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel> Shipping Subdivision</InputLabel>
                    <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                    {subdivisions.map((subdivision)=>(
                       
                       <MenuItem key={subdivision.id} value={subdivision.id}> 
                       
                            {subdivision.label}
                       
                       </MenuItem>

))}
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel> Shipping options</InputLabel>
                    <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>

                      {options.map((option)=>(
                        <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                      ))}
                    </Select>
                </Grid>
             </Grid>

             <br/>
                <div style={{display: "flex", justifyContent: "space-between"}}>

                   <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                   <Button type="submit" variant="contained" color="primary">Next</Button>

                </div>
             
          </form>
       </FormProvider>
    </>
  )
}

export default AddressForm