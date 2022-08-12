import React , {useState} from 'react'

import { InputLabe, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';

import {useForm, FormProvider} from 'react-hook-form';

import {commerce} from '../../lib/commerce';
import CustomTextField from './CustomTextField';
const AddresForm = () => {
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

  };
  return (
    <>
       <Typography variant="h6" gutterBottom> Shipping Address</Typography>

       <FormProvider {...methods}>

          <form onSubmit=''>
             
             <Grid container spacing={3}>

                <CustomTextField required name='firstName' label='First Name'/>
                <CustomTextField required name='LastName' label='Last Name'/>
                <CustomTextField required name='Address1' label='Address'/>
                <CustomTextField required name='Email' label='Email'/>
                <CustomTextField required name='City' label='City'/>
                <CustomTextField required name='City' label='City'/>
                
                {/*<Grid item xs={12} sm={6}>
                    <InputLabel> Shipping country</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}> 
                        
                        Select Me
                        
                        </MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel> Shipping Subdivision</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}> 
                        
                        Select Me
                        
                        </MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputLabel> Shipping options</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}> 
                        
                        Select Me
                        
                        </MenuItem>
                    </Select>
                </Grid>*/}
             </Grid>
          </form>
       </FormProvider>
    </>
  )
}

export default AddresForm