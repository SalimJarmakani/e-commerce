import React from 'react'
import { Typography, Card, CardActions, CardContent, CardMedia, Button } from '@material-ui/core';

import useStyles from './cartStyles';
const CartItem = ({ item, onRemove, onUpdate }) => {
  const classes= useStyles();
  return (

    <Card>
        <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>

        <CardContent className={classes.cardContent}>

            <Typography variant="h4"> {item.name} </Typography>
            <Typography variant="h5"> {item.price.formatted_with_symbol} </Typography>

        </CardContent>

        <CardActions className={classes.cardActions}>

            <div className={classes.buttons}>

                <Button type="button" size="small" onClick= {() => onUpdate(item.id,item.quantity-1)}> - </Button>
                <Typography> {item.quantity} </Typography>
                <Button type="button" size="small" onClick={()=> onUpdate(item.id,item.quantity+1)}> + </Button>

            </div>

            <Button type="button" variant="contained" color="secondary" onClick={()=> onRemove(item.id)}> Remove </Button>
            
        </CardActions>
    </Card>
  )
}

export default CartItem