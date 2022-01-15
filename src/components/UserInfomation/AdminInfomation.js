import { makeStyles, Typography } from '@material-ui/core';
import { Image, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { useState } from 'react';
import UpdateProduct from '../../pages/admin/user-mgt/UpdateProduct';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100',
    borderBottom: '7px solid #dddddd',
    display: 'flex',
    flexDirection: 'column',
    padding: `${theme.spacing(5)}px 20px`,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0,.5,0,0)',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    marginBottom: theme.spacing(1),
  }
}));

const AdminInfomation = ({ avatar, name, position, user }) => {
  const classes = useStyles();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openUpdateModalHandler = (item) => {
    setSelectedItem(user);
    setOpenUpdateModal(true);
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
  };

  return (
    <div className={classes.root}>
      {/* <img src={avatar} alt={name} className={classes.avatar} /> */}
     
      <OverlayTrigger
        trigger={["click","hover"]}
        delay={{ show: 100, hide: 10000 }}
        placement="right"
        overlay={(props) => ( <Tooltip id="button-tooltip" {...props}> Cập nhật thông tin cá nhân </Tooltip> )}
        className={classes.avatar}
      >
        {({ ref, ...triggerHandler }) => (
         
            <Image className={classes.avatar}
              ref={ref}
              // roundedCircle
              src={avatar} 
              alt={name}
            />
          
        )}
      </OverlayTrigger>

      <Typography variant="subtitle1" style={{color:'#38761D', fontWeight: 'bold'}}>{name}</Typography>
      {/* <Typography variant="caption" color="primary">
        {position}
      </Typography> */}
    </div>
  );
};

export default AdminInfomation;
