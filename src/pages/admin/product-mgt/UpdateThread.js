import ProductModal from './ProductModal';
import {
  Box,
  Button,
  FormControl,
  makeStyles,
  Select,
  NativeSelect,
  TextField,
  Typography,
} from '@material-ui/core';
import { Form } from 'react-bootstrap'; //, Row, Col, Dropdown
import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Container } from 'react-bootstrap';
import { uiActions } from '../../../reducers/ui';
import { getListPostByThread } from '../../../reducers/admin/thread';
import { Markup } from 'interweave';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: '10vh',
    width: '100%',
    background: "#DCDCDC"
  },
  content: {
    background: '#DCDCDC',
    padding: theme.spacing(2),
  },
  title: {
    fontWeight: 'bold',

  },
  subTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  mainImage: {
    height: '400px',
    borderRadius: theme.shape.borderRadius,
    background: '#f1f4fb',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 50px)',
    },
  },
  listUpload: {},
  iconAdd: {
    marginBottom: theme.spacing(1),
    background: '#f1f4fb',
  },
  textField: {
    marginBottom: theme.spacing(1),

    '& > p': {
      width: 300,
      fontWeight: 'bold',
    },
  },
  threadInfomation: {
    width: 'calc(100% - 320px)',

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },

  },
  image: {
    width: 300,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  menuPaper: {
    maxHeight: 300,
  },
  section: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  miniImage: {
    position: 'relative',
    width: 60,
    height: 60,
  },
  iconDel: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
    background: '#fff',
  },


  ovlContainer: {
    "&:hover": {
      "& $ovlOverlay": {
        opacity: 1,
      }
    },
    position: "relative",
    width: 60,
    height: 60,
  },

  ovlImage: {
    display: "block",
    width: "100%",
    height: "auto",
  },

  ovlOverlay: {
    position: "absolute",
    display: "block",
    top: 0,
    height: "100%",
    width: "100%",
    opacity: 0,
    transition: ".3s ease",
    "background-color": "rgba(0,0,0,0.3)",
    padding: '1',
  },

  ovlAdd: {
    opacity: 0.7,
    "background-color": "rgba(0,0,0,0.3)",
    "&:hover": {
      opacity: 1,
      transition: ".3s ease",
      "background-color": "rgba(0,0,0,0.3)",
    },
  },

  ovlIcon: {
    color: "white",
    "font-size": 40,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "-ms-transform": "translate(-50%, -50%)",
    "text-align": "center",
  },
  ovlAddIcon: {
    color: "primary",
    "font-size": 40,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    "-ms-transform": "translate(-50%, -50%)",
    "text-align": "center",
  },
  postTitleInfo: {
    color: "white",
    "background-color": "#2C553C",
    marginTop: "8px",
    height: '40px',
    padding: '5px'
  },
  postBodyInfo: {
    border: "black",
    border: '2px solid Gainsboro',
    border_radius: '25px',
    "background-color": "#F8F8FF",
  },
  post: {

  },
  ButtonSave: {
    background: "#006400",
    marginTop: '5px',
    width: '450px'
  },
  ButtonCancel: {
    background: "#8B0000",
    marginTop: '5px',
    width: '90px',
    position: "absolute",
    right: '5px',
  },
  ButtonCancelPost: {
    background: "#8B0000",
    marginBottom: '9px',
    width: '90px',
    height: '30px',
    position: "absolute",
    right: '40px',
  },
  pagination: {
    '& > *': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
}));

const UpdateThread = ({ threadInfo, isOpen, onClose, showSuccess, textAlert }) => {
  const classes = useStyles();
  const [selectedCat, setSelectedCat] = useState('');//ID of parent category selected by select box
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.dataResult);
  const [page, setPage] = useState(1);
  const [postInfo, setPostInfo] = useState([]);
  const [numPage, setNumPage] = useState(1);

  const categoryChangeHandler = async (value) => {
    setSelectedCat(value)
  };

  const closeModalHandler = () => {
    onClose();
  };



  const getListPostByThreadHandler = useCallback(
    async (postThreadId, page = 1) => {
      try {
        const limit = 10;
        const response = await dispatch(getListPostByThread({ postThreadId, page, limit })).unwrap();
        setPostInfo(response.ListPost);
        setNumPage(response.numPage)
      } catch (err) {
        //setError(err);
      }

    },
    [dispatch]
  );

  const pageChangeHandler = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    dispatch(uiActions.hideModal());
    if (threadInfo)
      getListPostByThreadHandler(threadInfo.thread_id)
  }, [dispatch, getListPostByThreadHandler, page, threadInfo]);//we will put 'page' and 'threadInfo' variable here to let useEffect know what need to be loaded on the first time


  return (



    <ProductModal isOpen={isOpen} onClose={closeModalHandler}>

      <div className={classes.root}>
        <Box borderRadius={6} className={classes.content}>
          <Box marginBottom={4} marginTop={2}>
            <Typography variant="h5" className={classes.title}>
              {threadInfo?.thread_title}
            </Typography>
          </Box>
          <div encType="multipart/form-data" className={classes.section}>
            <Box marginBottom={2} className={classes.image}>
              <div className={classes.mainImage}>
                <img
                  alt=""
                  src={threadInfo?.thread_image}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

            </Box>
            <Box className={classes.threadInfomation}>

              <div style={{ display: "flex", justifyContent: "space-between" }}>

                <div className={classes.textField}>
                  <Typography variant="h8" component="p">
                    Trạng thái
                  </Typography>

                  <Select
                    className={classes.filterItem}
                    native
                    defaultValue={threadInfo?.thread_status}
                    MenuProps={{ classes: { paper: classes.menuPaper } }}

                    inputProps={{ readOnly: true }}

                  >
                    <option value="0">Hoạt động</option>
                    <option value="1">Cấm</option>
                  </Select>



                </div>
                <div >
                  <input
                    type="search"
                    placeholder="Tìm kiếm..."
                    className="ml-6 mt-4"

                    aria-label="Search"
                  >
                  </input>
                </div>
              </div>
              <div>

              </div>


              <Box>
                <Container fluid>
                  {postInfo?.length > 0 &&
                    postInfo.map((post, index) => (
                      <div className={classes.post}>
                        <Row className={classes.postTitleInfo}>
                          {post?.acc_full_name}
                          <Button variant="contained" className={classes.ButtonCancelPost} onClick={onClose} style={{ color: "#red", backgroundColor: "#F4FFE7", width: "2px" }}>
                            <i class="fa fa-ban" aria-hidden="true"></i>
                          </Button>
                        </Row>

                        <Row className={classes.postBodyInfo}>
                          {/* {post?.post_body} */}
                          <div><Markup content={post?.post_body} /></div>
                        </Row>
                      </div>

                    ))}
                    
                  {!postInfo &&
                    postInfo.map((post, index) => (
                      <Typography variant="h6" className={classes.title}>
                        Chưa có bình luận
                      </Typography>
                    ))}

                </Container>
              </Box>

            </Box>
          </div>
          <div className={`${classes.pagination} ${classes.section}`}>
            <Pagination count={numPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} style = {{display:"block", margin:"auto"}}/>
          </div>
        </Box>
      </div>
    </ProductModal>
  );
};

export default UpdateThread;
