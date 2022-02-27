import { Box, Button } from '@material-ui/core';
import { makeStyles, Modal, Typography, TextField} from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateStatus} from '../../reducers/admin/thread'
const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    width: '50rem',
    margin: '20vh auto 0',
    background: 'white',
    padding: theme.spacing(2),
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));



const ModalConfirm = ({ title, isOpen, onClose, onConfirm, selectedId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const deleteThreadHandler = async () => {
  //   if (!selectedId) return;
  //   try {
  //     //delete selected cat
  //     await dispatch(updateStatus({ catID: selectedId })).unwrap();
  //     //load data again
  
  //     setText('Khóa bài viết thành công!!!');
  //     setShowSuccess(true);
  //   } catch (err) {
  //     setText(err);
  //     setShowFailed(true);
  //   }

  //   closeModalHandler();
  // };

  return (
    <Modal
      className={classes.root}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <Box className={classes.content} borderRadius={6}>
        <Box marginBottom={2}>
          <Typography variant="h6" component="p" style={{ textAlign: 'center', marginBottom: 16 }}>
            {title}
          </Typography>
          <TextField id="outlined-basic" label="Nhập lý do muốn khóa chủ đề" variant="outlined" style = {{width:"100%"}}/>
        </Box>
        <Box display="flex" className={classes.actions}>
          <Button
            onClick={onClose}
            startIcon={<Close style={{ color: '#0000FF' }} />}
            variant="outlined"
            color="primary"
            style={{
              fontWeight: 'bold',
              marginRight: 16,
              color: '#0000FF',
              fontWeight: 'bold',
            }}>
            Huỷ
          </Button>
          <Button
            // onClick={deleteThreadHandler}
            startIcon={<Delete style={{ color: '#B51200' }} />}
            variant="outlined"
            style={{
              border: '1px solid #B51200',
              color: '#B51200',
              fontWeight: 'bold',
            }}>
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
