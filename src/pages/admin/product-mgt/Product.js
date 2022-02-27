import {
  makeStyles,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  NativeSelect,
} from '@material-ui/core';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Pagination from '@material-ui/lab/Pagination';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { uiActions } from '../../../reducers/ui';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAuctionProduct, getListThreadByCategory } from '../../../reducers/admin/thread';
import UpdateThread from './UpdateThread';
import TableError from '../../../components/Table/TableError';
import TableLoading from '../../../components/Table/TableLoading';
import ThreadModalConfirmDeleteWithReason from '../../../components/Modal/ThreadModalConfirmDeleteWithReason';
import { toast } from 'react-toastify';
import { getListCategory } from '../../../reducers/category';
const useStyles = makeStyles((theme) => ({
  root: {
    // padding: theme.spacing(2),
    // minHeight: '100vh',
    // maxHeight: '-webkit-fill-available',
  },

  section: {
    borderRadius: theme.shape.borderRadius,
    background: '#F4FFE7',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
  },

  bodytable: {
    borderRadius: theme.shape.borderRadius,
    background: '#F4FFE7',
    boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    marginLeft: theme.spacing(6),
    marginRight: theme.spacing(6),
    minHeight: '40vh',
    maxHeight: '350vh',
    // maxHeight: '-webkit-fill-available',
  },
  title: {
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    color: '#006400',
  },
  topContent: {
    borderRadius: theme.shape.borderRadius,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    background: '#fff',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    margin: 0,
    padding: theme.spacing(1),
  },
  filter: {
    marginTop: theme.spacing(2),
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
  label: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 70,
    },
  },
  select: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F39148',
    marginLeft: theme.spacing(1),
    '& svg': {
      color: theme.palette.common.white,
    },
  },
  addButton: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  search: {
    border: '1px solid #ddd',
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    width: '20%',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
    },
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  tableHead: {
    fontWeight: 'bold',
    background: "#2C553C",
    
  },
  colorBackground: {
    background: "#F4FFE7"
  },
  filterItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      width: '100%',
      justifyContent: 'space-between',
      '&:not(:last-child)': {
        marginRight: 0,
      },
    },
  },
}));

const ProductManager = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [threadInfo, setThreadInfo] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showFailed, setShowFailed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState('');
  const [selectedCat, setSelectedCat] = useState();//ID of parent category selected by select box
  const [ListThread, setListThread] = useState([]);
  //get category data from local store, data is gotten in getListCategoryHandler 
  const categories = useSelector((state) => state.category.dataResult);
  let { loading, numPage } = threadInfo;
  const openAddModalHandler = () => {
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setText('');
  };

  const openUpdateModalHandler = (item) => {
    setSelectedItem(item);
    setOpenUpdateModal(true);
    setOpenDeleteModal(false);
    setText('');
  };
  const openDeleteModalHandler = (id) => {
    setSelectedId(id);
    setOpenUpdateModal(false);
    setOpenDeleteModal(true);
    setText('');
  };

  const closeModalHandler = () => {
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setText('');
  };

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };

  const productDeleteHandler = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteAuctionProduct(selectedId)).unwrap();
      ListThread = ListThread.filter(
        (product) => product.prodId !== selectedId
      );
    } catch (err) {
      toast.error(err);
    }
    closeModalHandler();
  };

  const getListThreadByCategoryHandler = useCallback(
    async (selectedCat, page = 1) => {
      if (!selectedCat || selectedCat.length <= 0) {
        return;
      }
      try {
        const limit = 10;
        //IMPORTANT NOTE : parameter in reducer and parameter in handler, API need to have the same name if we don't pass parameter with key
        const response = await dispatch(getListThreadByCategory({category : selectedCat, page, limit })).unwrap();
        
        setThreadInfo(response);
        setListThread(response.ListThread)
      } catch (err) {
        //setError(err);
      }
      
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(uiActions.hideModal());
    //setSelectedCat(categories[0].subCategories[0].cateId)
    getListThreadByCategoryHandler(selectedCat, page)
  }, [dispatch, getListThreadByCategoryHandler, page]);

  useEffect(() => {
    document.title = 'Quản Lý Chủ đề bài viết';
  }, [t]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const errImg = window.location.origin + '/img/no-image-available.jpg';

  const handleVisible = useCallback(() => {
    if (showSuccess === true) {
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000);
    }
  }, [showSuccess]);

  const getListCategoryHandler = useCallback(async () => {
    try {
     
      const page = 1;
      const limit = 10000;
      //get data from API, then store to local store, this data will be used by categories variable
      const response = await dispatch(getListCategory({page, limit})).unwrap();

      if(response.paginationResult.length > 0){
        if(response.paginationResult[0].subCategories[0].length > 0){
          setSelectedCat(response.paginationResult[0].subCategories[0][0].cateId);
          getListThreadByCategoryHandler(response.paginationResult[0].subCategories[0][0].cateId, 1);
        }
      }
    } catch (err) {
      console.log('Lỗi không có chuyên mục', err);
    }
  }, [dispatch]);

  const categoryChangeHandler = async (value) => {
    setListThread([])
    setPage(1);
    setSelectedCat(value);
    if (value) {
      getListThreadByCategoryHandler(value, 1); 
    }
  };

  useEffect(() => {
    handleVisible();
    getListCategoryHandler();
  }, [handleVisible]);

  return (
    <>
      <div className={classes.root}>
        <Container >
          <UpdateThread
            threadInfo={selectedItem}
            isOpen={openUpdateModal}
            onClose={closeModalHandler}
            showSuccess={setShowSuccess}
            textAlert={setText}
          />

          <ThreadModalConfirmDeleteWithReason
            title="Khóa chủ đề"
            isOpen={openDeleteModal}
            onClose={closeModalHandler}
            //onConfirm={productDeleteHandler}
            threadID = {selectedId}
          />
        </Container>
      </div>
      <div className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          Quản Lý Chủ Đề Bài Viết
        </Typography>
        {/* <div className={classes.filter}>
          <div className={classes.search}>
            <SearchInput />
          </div>
        </div> */}
        <div className={classes.textField}>
          <Typography variant="caption" component="p">
            Danh mục
          </Typography>
          <div className={classes.filterItem}>
            <NativeSelect
              native
              valie = {selectedCat}
              MenuProps={{ classes: { paper: classes.menuPaper } }}
              onChange={(e) => categoryChangeHandler(e.target?.value)}
              >
              {categories?.length === 0 && (<option aria-label="None" value="" />)}
              {categories?.length > 0 &&
                categories.map((cate, index) => (
                  <optgroup label={cate.cateName} key={index}>
                    {cate.subCategories?.length > 0 &&
                      cate.subCategories[0].map((subCate, index) => (
                        <option value={subCate.cateId} key={index}>
                          {subCate.cateName}
                        </option>
                      ))}
                  </optgroup>
                ))}
            </NativeSelect>
            </div>
        </div>
      </div>
      <div className={classes.bodytable}>
        <Alert variant="danger" show={showFailed} onClose={() => setShowFailed(false)} dismissible>
          <Alert.Heading style={{ textAlign: "center" }}>{text}</Alert.Heading>
        </Alert>
        <Alert variant="success" show={showSuccess} onClose={() => setShowSuccess(false)} dismissible>
          <Alert.Heading style={{ textAlign: "center" }}>{text}</Alert.Heading>
        </Alert>
        <TableContainer component={Paper}>
          
          <Table aria-label="a dense table" >
            <TableHead >
              <TableRow className={classes.tableHead} >
                <TableCell style = {{color:"white"}}>STT</TableCell>
                <TableCell style = {{color:"white"}}>Tên chủ đề</TableCell>
                <TableCell style = {{color:"white"}}>Hình ảnh chủ đề</TableCell>
                <TableCell style = {{color:"white"}}>Người tạo</TableCell>
                <TableCell style = {{color:"white"}} >Ngày tạo</TableCell>
                <TableCell align="center" style = {{color:"white"}} >Thao tác</TableCell>
              </TableRow>
            </TableHead>
            {loading ? (<TableLoading />) : error?.length > 0 ?
              (
                <TableError message={error} onTryAgain={getListThreadByCategoryHandler} />
              ) : ListThread?.length > 0 ? (
                <>
                  <TableBody>
                    {ListThread.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {index + 1 + (page - 1) * 10}
                        </TableCell>
                        <TableCell>{row?.thread_title}</TableCell>
                        <TableCell>
                          <img
                            src={row?.thread_image || errImg}
                            alt={row?.thread_title}
                            style={{ width: 100, height: 80, objectFit: 'cover' }}
                          />
                        </TableCell>
                        <TableCell>{row?.created_by}</TableCell>
                       
                        <TableCell>{moment(new Date(row?.thread_date)).format("DD/MM/YYYY HH:mm")}</TableCell>
                    
                        <TableCell align="center" style={{ minWidth: 150 }}>
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon
                              fontSize="small"
                              style={{ cursor: 'pointer', marginLeft: "10px", color: "white" }}
                            />}
                            style={{ width: '40px', marginLeft: 5, background: "#0F881B" }}
                            fontSize="small"
                            onClick={() => openUpdateModalHandler(row)}//get selected item here
                          >
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<DeleteIcon
                              fontSize="small"
                              style={{ cursor: 'pointer', marginLeft: "10px", color: "white" }}
                            />}
                            style={{ width: '40px', marginLeft: 5, background: "#88170F" }}
                            fontSize="small"
                            onClick={() => openDeleteModalHandler(row.prodId)}
                          >
                          </Button>
                        </TableCell> 
                      </TableRow>
                    ))}
                  </TableBody>
                </>
              ) : (
                <TableError message="Không có dữ liệu" onTryAgain={getListThreadByCategoryHandler} />
              )}
           </Table>
        </TableContainer>
      </div>
      <div className={`${classes.pagination} ${classes.section}`}>
        <Pagination count={numPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
      </div>
    </>
  );
};
export default ProductManager;
