import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Container,
  makeStyles,
  Button,
  TextField,
  Typography,
  Box,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { useInput } from '../hooks/use-input';
import * as Validate from '../helpers/validate';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { mainColor } from '../utils';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../reducers/auth';
import { useTimer } from '../hooks/user-timer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    maxHeight: '-webkit-fill-available',
  },
  content: {
    padding: '20vh 0',
  },
  title: {
    marginBottom: 25,
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
    },
  },
  form: {
    width: '30rem',
    background: '#fff',
    maxWidth: '100%',
    margin: '0 auto',
    borderRadius: theme.shape.borderRadius,
    padding: '50px 25px',
    [theme.breakpoints.down('xs')]: {
      padding: '35px 15px',
    },
  },
  formControl: {
    display: 'block',
    marginBottom: 15,
  },
  button: {
    '&:disabled': {
      cursor: 'not-allowed',
      pointerEvents: 'all !important',
    },
  },
  actions: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      color: mainColor,
    },
  },
}));

const ForgotPasswordPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);
  const { timer, setTimer, startCounterHandler } = useTimer(5);

  const {
    enteredInput: enteredEmail,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    inputIsValid: emailIsValid,
    inputReset: emailReset,
  } = useInput(Validate.isEmail);

  const formIsValid = emailIsValid;
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    try {
      setError('');
      const { accId } = await dispatch(forgotPassword(enteredEmail)).unwrap();
      setUserId(accId);

      //start counter
      startCounterHandler();

      //redirect after 5 seconds
      setTimeout(() => {
        history.push(`/recovery-password?id=${accId}`);
      }, 5100);

      emailReset();
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    document.title = "Qu??n m???t kh???u"
  });

  useEffect(() => {
    setUserId(null);
    setTimer(5);
  }, [setTimer]);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className={classes.root}>
        <Header />
        <div className={classes.content}>
          <Container>
            <Box className={classes.form} boxShadow={3}>
              <Typography variant="h3" className={classes.title}>
                Qu??n m???t kh???u
              </Typography>
              {userId && (
                <Typography variant="h6" style={{ color: 'g reen' }}>
                  M?? x??c nh???n ???? g???i ?????n email. Ti???n h??nh b?????c ?????n ti???p theo {timer}s
                </Typography>
              )}
              {!userId && (
                <>
                  <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
                    <FormControl className={classes.formControl}>
                      <TextField
                        error={emailHasError}
                        label="Email"
                        type="email"
                        helperText={emailHasError && "Email kh??ng h???p l???"}
                        fullWidth
                        size="small"
                        variant="outlined"
                        value={enteredEmail}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}
                      />
                    </FormControl>
                    {error?.length > 0 && (
                      <FormHelperText error style={{ marginBottom: 10 }}>
                        {error}
                      </FormHelperText>
                    )}
                    {loading ? (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={true}
                        type="submit"
                        className={classes.button}
                        startIcon={<CircularProgress size={22} />}
                      />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!formIsValid}
                        type="submit"
                        className={classes.button}>
                        G???I EMAIL
                      </Button>
                    )}
                  </form>
                  <div className={classes.actions}>
                    <Typography variant="body2">
                      T???o m???i t??i kho???n?
                      <Link to="/register"> ????ng k??</Link>
                    </Typography>

                    <Link to="/login">
                      <Typography variant="body2">Quay l???i</Typography>
                    </Link>
                  </div>
                </>
              )}
            </Box>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
