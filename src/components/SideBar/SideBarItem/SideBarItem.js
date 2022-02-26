import { alpha, makeStyles, Typography } from '@material-ui/core';
import { ChevronRight, ExpandMore } from '@material-ui/icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: '#38761D',
  },
  navLink: {
    padding: '12px 20px',
    width: '100%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    transition: 'all .5s',
    textDecoration: 'none',
    color: '#333',
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
    '&.active': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    textDecoration: 'none',
    color: '#38761D',
    display: 'block',
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
    justifySelf: 'flex-end',
  },
  items: {
    maxHeight: 200,
    overflow: 'auto',
    'scrollbar-width': 'none',
    '-ms-overflow-style': 'none',
    listStyle: 'none',
    animation: '$toggle .5s ease-in-out',
    '&::-webkit-scrollbar': {
      display: 'none',
      width: 0,
      height: 0,
    },
    '& li,a': {
      display: 'block',
      transition: 'all .5s',
    },
    '& li:hover': {
      background: alpha(theme.palette.primary.main, 0.4),
    },
  },
  item: {
    display: 'block',
    padding: '0px 0px 12px 5px',
    '& a': {
      textDecoration: 'none',
      color: 'rgba(0,0,0,.8)',
    },
  },
  '@keyframes toggle': {
    '0%': {
      maxHeight: 0,
    },
    '100%': {
      maxHeight: 200,
    },
  },
  itemActive: {
    color: theme.palette.primary.main + '!important',
    '& > h6': {
      color: theme.palette.primary.main,
    },
  },
  settingIcon:{
    cursor: 'pointer',
    display: 'flex',
    padding: '0px 0px 0px 30px',
    '& a': {
      textDecoration: 'none',
      color: 'rgba(0,0,0,.8)',
    },
  }
}));
export const SideBarItem = ({ IconComponent, title, link, subItems }) => {
  const classes = useStyles();
  const [toggleList, setToggleList] = useState(false);
  const toggleListHandler = () => {
    setToggleList((prevState) => !prevState);
  };
  return (
    
    <li className={classes.root}>
      {link ? (
        <NavLink to={link} className={classes.navLink} activeClassName={classes.itemActive}>
          <IconComponent className={classes.icon} />
          <Typography variant="subtitle1" className={classes.title}>
            {title}
          </Typography>
        </NavLink>
      ) : (
        <div className={classes.navLink}>
          <IconComponent className={classes.icon} />
          <Typography
            variant="subtitle1"
            className={classes.title}
            style={{ fontWeight: '500' }}
            onClick={toggleListHandler}>
            {title}
          </Typography>
          {subItems?.length > 0 && (
            <>
              {toggleList && <ExpandMore className={classes.arrowIcon} />}
              {!toggleList && <ChevronRight className={classes.arrowIcon} />}
            </>
          )}
        </div>
      )}

      {toggleList && subItems?.length > 0 && (
        <ul className={classes.items}>
          {subItems.map((item, index) => (
            <div className={classes.settingIcon} key={index}>
              <item.icon className={classes.icon} />
              <li className={classes.item} >
                <NavLink to={item.link} activeClassName={classes.itemActive}>
                  {item.title}
                </NavLink>
              </li>
            </div>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SideBarItem;
