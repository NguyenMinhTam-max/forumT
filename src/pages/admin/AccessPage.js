
import { useCallback, useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams } from "react-router-dom";
import {accessWeb} from "../../reducers/auth";
import {Redirect} from "react-router-dom";

function Access() {
 
    const dispatch = useDispatch();
    
    const {atkP,accidP, rftP } = useParams();
    
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const accessHandler = useCallback(async () => {
        try {
            var response = await dispatch(accessWeb({atkP,accidP, rftP})).unwrap();
        } catch (err) {
            alert(err);
        }
    }, [dispatch]);
    useEffect(() => {
        document.title = 'Authenticating';
    });
    useEffect(() => {
        accessHandler();
    }, [accessHandler]);


    return <Redirect to='/admin' />;
}

export default Access;