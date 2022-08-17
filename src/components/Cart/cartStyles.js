import { makeStyles } from "@material-ui/core";

export default makeStyles(()=>({

    media: {
        height:260,
        marginBottom:'2%'
    },
    cardContent : {

        display : 'flex',

        justifyContent: 'space-between',

        marginBottom: '2%'
    },

    cartActions: {

        justifyContent: 'space-between',
    },

    buttons: {

        display: 'flex',

        alignItems: 'center',
    },
    
}));