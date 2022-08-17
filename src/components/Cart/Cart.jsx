import React from 'react'

import {Container, Typography, Button, Grid} from '@material-ui/core';

import useStyles from './style';
import CartItem from './CartItem';

import {Link} from 'react-router-dom';

const Cart = ({cart, handleRemove, handleEmpty, handleCartQuantity}) => {

    const classes= useStyles();

    const handleEmptyCart = ()=> handleEmpty();

    const EmptyCart = () => (

        <Typography variant="subtitle1">
            you have no items in the cart

            <Link to='/'> Start adding some</Link>!
        </Typography>
    );

    if (!cart.line_items) return 'loading...!';
    const FilledCart = () => (

        <>
        <Grid container spacing={3}>

            {cart.line_items.map((item)=> (

                <Grid item xs={12} sm={4} key={item.id} >

                    <CartItem item={item} onRemove={handleRemove} onUpdate={handleCartQuantity}/>
                </Grid>
            ))}
        </Grid>
        
         <div className={classes.CardDetails}>
            <div className={classes.space}/>
            <Typography variant='h4' >
                Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>

            <div className={classes.space}/>

            <div>
                <Button className={classes.emptyButton} size='large' type="button" variant="contained" color='secondary' onClick={()=>handleEmptyCart()}>
                    Empty cart
                </Button>

                <Button component={Link} to="/checkout" className={classes.checkoutButton} size='large' type="button" variant="contained" color='primary'>
                    checkout
                </Button>
            </div>
         </div>
        </>
    );

    
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h3">
            Your Shopping Cart
        </Typography>

        { !cart.line_items.length ? EmptyCart() : FilledCart()}
    </Container>
  )
}

export default Cart