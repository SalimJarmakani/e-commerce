import React, {useState, useEffect} from 'react'
import {Paper, Stepper,Step,StepLabel,Typography,CircularProgress, Divider, Button} from '@material-ui/core';
import {commerce} from '../../lib/commerce';
import useStyles from './Styles'
import AddressForm from './AddresForm';
import PaymentForm from './PaymentForm';
const steps=['Shipping adress', 'Payment details'];
const Checkout = ( {cart, order, onCaptureCheckout, error}) => {

    const [activeStep, setActiveStep] = useState(0);

    const [checkoutToken, setCheckoutToken] = useState(null);

    const [shippingData,setShippingData] = useState({});
    const classes=useStyles();

    useEffect(()=>{

      const generateToken= async () => {

        try {
           const token= await commerce.checkout.generateToken(cart.id,{type: 'cart'});

    

           setCheckoutToken(token);
        } catch (error) {
          
        }
      }

        generateToken();
    },[cart]);

    const nextStep = ()=> setActiveStep((prevActiveStep)=>prevActiveStep+1);
    const backStep= ()=> setActiveStep((prevActiveStep)=>prevActiveStep-1);

    const next = (data)=>{

      setShippingData(data);

      nextStep();

    };

    const Confirmation = () => (

      <div>
         confirmation
      </div>
    )

    const Form = () => activeStep ===0 ? <AddressForm next={next} checkoutToken={checkoutToken}/> : 
                                         <PaymentForm backStep={backStep} checkoutToken={checkoutToken} shippingData={shippingData}
                                         onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>;
  return (
    <>

      <div className={classes.toolbar}/>

      <main className={classes.layout}>

         <Paper className={classes.paper}>
           
             <Typography variant="h4" align="center">Checkout</Typography>
             <Stepper activeStep={activeStep} className={classes.stepper}>

                 {steps.map((step) => (
                   <Step key={step}>

                      <StepLabel>{step}</StepLabel>
                   </Step>
                 ))}
             </Stepper>

             {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
         </Paper>
      </main>
    
    </>
  )
}

export default Checkout