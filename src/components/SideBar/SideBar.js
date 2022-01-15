import { IconButton, makeStyles } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../reducers/ui';
import SearchInput from '../UI/SearchInput';
import SideBarTablet from './SideBarTablet/SideBarTablet';

const useStyles = makeStyles((theme) => ({
  cateDesktop: {
    display: 'block',
    position: 'fixed',
    left: 0,
    top: 64,
    zIndex: 10,
    background: '#F4FFE7',
    height: 'calc(100% - 64px)',
    overflow: 'auto',
    width: '260px',
    boxShadow: '0px 2px 8px rgba(0,0,0,.5)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cateTablet: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 0',
  },
  search: {
    margin: '80px 20px 0',
  },
  iconClose: {
    position: 'absolute',
    right: 8,
  },
}));

const SideBar = ({ children }) => {
  const classes = useStyles();
  const isOpenSideBar = useSelector((state) => state.ui.isOpenSideBar);
  const dispatch = useDispatch();
  const toggleSideBarHandler = () => {
    dispatch(uiActions.toggleSideBar());
  };
  return (
    <>
      <div className={classes.cateDesktop}>{children}</div>
      
    </>
  );
};

export default SideBar;
