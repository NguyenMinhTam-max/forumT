
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  FormControl,
  NativeSelect,
  InputBase,
  withStyles,
  Box,
  Modal,
  Fade,
  Backdrop
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../reducers/admin/category'
import { addSubCategory } from '../../../reducers/admin/subCategory';
import { Alert } from 'react-bootstrap';
const useStyles = makeStyles((theme) => ({
  content: {
    padding: '10vh 0',
  },
  paper: {
    width: '30rem',
    maxWidth: '90%',
    margin: '20vh auto 0',
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(5)
  },
  form: {
    marginTop: '9px',
  },
  textField: {
    margin: theme.spacing(0),
  },
  modalTitle: {
    margin: theme.spacing(2),
    color:'#006400'
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#006400',
    paddingLeft: theme.spacing(6),
    marginTop: theme.spacing(2),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  label: {
    fontSize:"16",
    marginTop: theme.spacing(2),
  },
  search: {
    marginTop: theme.spacing(1),
  },
  save: {
    color: '#fff',
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#006400',
  },
}));
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(2),
    },
  }
}))(InputBase);

const ModalSubCategory = ({ catParentID, subCatInfo, action, catParentList, reloadTable, isOpenModal, closeModalHandler }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState(subCatInfo?.cate_name || '');
  const [catParent, setCatParent] = useState(catParentID || '');
  console.log(subCatInfo)
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    if (action === 'INSERT') {
      setSubCategoryName('');
    }
    setCatParent(catParentID);
  }, [action]);
  const subCatNameChangeHandler = (e) => {
    //get value when the input changed, and set into subcat name
    setSubCategoryName(e.target.value);
  };
  const parentCategoryChangeHandler = (value) => {
    setCatParent(value);
  };

  const addSubCategoryHandler = async () => {
    setText('');
 
    if (subCategoryName.trim().length == 0) {
      setText('Tên chuyên mục con không được phép rỗng!');
      setShowFailed(true);
      return;
    }

    if (action === 'INSERT') {
      try {
        await dispatch(
          addSubCategory({
            catName: subCategoryName,
            catParentID: +catParent,
          })
        ).unwrap();
        setText("Thêm chuyên mục con thành công");
        setShowSuccess(true);
        reloadTable();
      } catch (error) {
        setText(error);
        setShowFailed(true);
      }
    }
    if (action === 'UPDATE') {
      try {
        await dispatch(
          updateCategory({
            catParentID: +catParent,
            catID: subCatInfo.cate_id,
            catName: subCategoryName,
          })
        ).unwrap();
        setText("Cập nhật chuyên mục con thành công");
        setShowSuccess(true);
        reloadTable();
      } catch (error) {
        setText(error);
        setShowFailed(true);
      }
    }
  };

  return (
    <>
      <Modal
        open={isOpenModal}
        onClose={closeModalHandler}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <div className={classes.paper}>
          <form noValidate autoComplete="off">
            <Typography
              variant="h5"
              style={{ textAlign: 'center', color: '#006400' }}
              className={classes.modalTitle}>
              {action == 'INSERT' ? 'Thêm chuyên mục con' : 'Cập nhật chuyên mục con'}
            </Typography>
            <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
              <Alert.Heading>{text}</Alert.Heading>
            </Alert>
            <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
              <Alert.Heading>{text}</Alert.Heading>
            </Alert>
            <FormControl className={classes.form} fullWidth>


              <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                <Typography variant="caption" component="p" className={classes.textField}>
                  Tên chuyên mục:
                </Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={subCategoryName}
                  onChange={subCatNameChangeHandler}
                  fullWidth
                  className={classes.textField}
                />
              
                <Typography variant="subtitle2" className={classes.label}>
                  Chọn chuyên mục cha :
                </Typography>
                <NativeSelect
                  className={classes.select}
                  value={catParent}
                  onChange={(e) => parentCategoryChangeHandler(e.target?.value)}
                  name="price"
                  input={<BootstrapInput />}
                  >
                  <option aria-label="None" value="" />
                  {catParentList.map((row, index) => (
                    <option style={{ color: '#2d51a6' }} value={row.cate_id} key={index}>
                      {row.cate_name}
                    </option>
                  ))}
                </NativeSelect>
              </Box>
            </FormControl>
            <Button
              className={classes.save}
              variant="contained"
              fullWidth
              component="label"
              onClick={addSubCategoryHandler}
            >
              Xác nhận
            </Button>
          </form>
        </div>
      </Modal>

    </>
  );
};
export default ModalSubCategory;
