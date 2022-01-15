
import {
  makeStyles,
} from '@material-ui/core';

import '../index.css';
import {Redirect} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '5vh 0',
  },
}));

function Home() {
  
}


export default Home;