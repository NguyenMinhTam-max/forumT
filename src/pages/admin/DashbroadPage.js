import { mainColor } from '../../utils';
import { Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  makeStyles,
  Grid,
  Typography,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '20vh 0',
  },
  title: {
    marginBottom: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
    },
  },
  form: {
    width: '30rem',
    background: '#fff',
    maxWidth: '100%',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    padding: '50px 25px',
    [theme.breakpoints.down('xs')]: {
      padding: '35px 15px',
    },
  },
  formControl: {
    display: 'block',
    marginBottom: 15,
  },
  button: {
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'all !important',
    },
  },
  actions: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& a': {
      color: mainColor,
    },
  },
}));

function Home() {
  
    const classes = useStyles()
    // const location = useLocation();
    const admin = useSelector((state) => state.auth);
    if (admin.user == null) return <Redirect to='/login' />;

    return (
        <></>
    );
  }
  
  export default Home;