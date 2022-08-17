import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',

    marginBottom: '7%'
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
      marginTop:'2%'
    },
  },
  checkoutButton: {
    minWidth: '150px',
    marginTop:'2%'
  },
  link: {
    textDecoration: 'none',

  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    marginBottom:'10%',
    width: '100%',
    justifyContent: 'space-between',


  },
  space: {

    marginBottom:'2%',
    marginTop: '1%'
  }
}));