
/*
Using Redirect:
if (!id || user?.accStatus === 0) {
    return <Redirect to="/" />;
  }
using useHistory & useLocation: refer to header search & this page or register & account activation
*/
import {useLocation } from 'react-router-dom';//the function in library support to redirect
import ProductInfoCard from '../components/ProductCard/ProductInfoCard';
import { Card } from 'react-bootstrap';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { listProductSearch } from '../reducers/unauthorizedProduct';
import { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { mainColor } from '../utils';
import {
    Container,
    makeStyles,
} from '@material-ui/core';
import '../index.css';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '50vh',
        maxHeight: '-webkit-fill-available',
    },
    section: {
        borderRadius: theme.shape.borderRadius,
        background: 'white',
        boxShadow: '0px 2px 8px rgba(0,0,0,.1)',
        padding: theme.spacing(2),
        // marginBottom: theme.spacing(2),
        margin: theme.spacing(2),
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
    },
    pagination: {
        '& > *': {
            justifyContent: 'center',
            display: 'flex',
        },
    },
    content: {
        padding: '5vh 0',
    },
}));

function Home() {
    const classes = useStyles()
    const location = useLocation();
    const dispatch = useDispatch();
    const searchKeyWord = location.search.slice(15);//get search keyword
    const [searchProductInfo, setSearchProductInfo] = useState({});
    const [error, setError] = useState('');
    let { listProduct, numberProduct, numberOfPage } = searchProductInfo;//object destructuring from productInfo
    const [page, setPage] = useState(1);
    console.log(listProduct);
    const getListProductSearchHandler = useCallback(
        async (page = 1, searchKey) => {
            try {
                //default search page info
                const limit = 10;
                const filterField = 'prod_created_date';//sort by created date
                const AndOrCondition = 'or';//get product with name = searchKey or category name = searchKey
                const orderBy = 'desc'
                const response = await dispatch(listProductSearch({
                    searchKey,
                    limit,
                    page,
                    orderBy,
                    filterField,
                    AndOrCondition
                })).unwrap();


                setSearchProductInfo(response);
            } catch (error) {
                setError(error);
            }
        },
        [dispatch]
    );

    const pageChangeHandler = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        document.title = 'Tìm kiếm sản phẩm';
    }, []);

    useEffect(() => {
        getListProductSearchHandler(page, searchKeyWord)
    }, [dispatch, getListProductSearchHandler, page, searchKeyWord]);//when page change, get the new list

    return (
        <>
            <div className={classes.root}>
                <Header />
                <div className={classes.content}>
                    <Container>
                        <div className="container">

                            <section className="text-center mt-5" >

                                {/* Grid row */}
                                <div className="row justify-content-center flex-fill">
                                    {listProduct?.length > 0 &&
                                        listProduct.map((prod, index) => (
                                            <div key={prod.prod_id} className="col-4">
                                                <Card className="h-100">
                                                    <Card.Body>
                                                        <ProductInfoCard
                                                            id={prod.prod_id}
                                                            title={prod.prod_name}
                                                            description={prod.prod_description}
                                                            image={prod.prod_main_image}
                                                            price={prod.prod_price}
                                                            endDate={prod.prod_end_date}
                                                            currentPrice={prod.prod_price_current}
                                                            catName={prod.cate_name}
                                                            holder={prod.prod_price_holder}
                                                            seller={prod.prod_seller_id}
                                                            numberBid={prod.number_bid}
                                                            createdDate={prod.created_date}
                                                            priceHolder={prod.prod_price_holder}

                                                        />
                                                    </Card.Body>

                                                </Card>
                                                {/* Card */}
                                            </div>

                                        ))}


                                </div>
                            </section>

                        </div>

                    </Container>
                    <div className={`${classes.pagination} ${classes.section}`}>
                        <Pagination count={numberOfPage} color="primary" variant="outlined" shape="rounded" page={page} onChange={pageChangeHandler} />
                    </div>
                </div>
            </div>

            <div className={classes.content}>
                <Footer />
            </div>
        </>
    );
}

export default Home;