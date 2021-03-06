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
} from '@material-ui/core';
import { useInput } from '../hooks/use-input';
import * as Validate from '../helpers/validate';
import { mainColor } from '../utils';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../reducers/auth';
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

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { id: userId } = queryString.parse(location.search);
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [resetSucceed, setResetSucceed] = useState(false);
  const { timer, setTimer, startCounterHandler } = useTimer(5);
  const {
    enteredInput: enteredCode,
    inputBlurHandler: codeBlurHandler,
    inputChangeHandler: codeChangeHandler,
    inputReset: codeReset,
  } = useInput(Validate.isNotEmpty);
  const {
    enteredInput: enteredPassword,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    inputChangeHandler: passwordChangeHandler,
    inputIsValid: passwordIsValid,
    inputReset: passwordReset,
  } = useInput(Validate.isNotEmpty);

  const {
    enteredInput: enteredConfirmPassword,
    hasError: confirmPasswordHasError,
    inputBlurHandler: confirmPasswordBlurHandler,
    inputChangeHandler: confirmPasswordChangeHandler,
    inputIsValid: confirmPasswordIsValid,
    inputReset: confirmPasswordReset,
  } = useInput((value) => Validate.isNotEmpty(value) && value === enteredPassword);

  const formIsValid = passwordIsValid && confirmPasswordIsValid;
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    try {
      setError('');
      setResetSucceed(false);
      await dispatch(
        resetPassword({
          userId,
          newPassword: enteredPassword,
          code: enteredCode,
        })
      ).unwrap();

      setResetSucceed(true);
      startCounterHandler(true);

      passwordReset();
      confirmPasswordReset();
      codeReset();

      setTimeout(() => {
        history.push('/login');
      }, 5100);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    document.title = "Kh??i ph???c t??i kho???n"
  });
  useEffect(() => {
    setTimer(5);
  }, [setTimer]);

  if (!userId) {
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
                Kh??i ph???c t??i kho???n
              </Typography>
              <form noValidate autoComplete="off" onSubmit={formSubmitHandler}>
                <FormControl className={classes.formControl}>
                  <TextField
                    // error
                    label="M?? x??c nh???n"
                    type="text"
                    helperText="Nh???p m?? trong email"
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={enteredCode}
                    onBlur={codeBlurHandler}
                    onChange={codeChangeHandler}
                    autoComplete="off"
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    // error
                    label="M???t kh???u m???i"
                    type="password"
                    error={passwordHasError}
                    helperText={passwordHasError && "M???t kh???u m???i kh??ng ???????c tr???ng"}
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={enteredPassword}
                    onBlur={passwordBlurHandler}
                    onChange={passwordChangeHandler}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <TextField
                    // error
                    label="Nh???p l???i m???t kh???u"
                    type="password"
                    error={confirmPasswordHasError}
                    helperText={confirmPasswordHasError && "Nh???p l???i m???t kh???u kh??ng ch??nh x??c"}
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={enteredConfirmPassword}
                    onBlur={confirmPasswordBlurHandler}
                    onChange={confirmPasswordChangeHandler}
                  />
                </FormControl>

                {error?.length > 0 && (
                  <FormHelperText error style={{ marginBottom: 10 }}>
                    {error}
                  </FormHelperText>
                )}
                {resetSucceed && (
                  <Typography variant="h6" style={{ color: 'green' }}>
                    ?????t m??t kh???u l???i th??nh c??ng {timer}s
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={!formIsValid}
                  type="submit"
                  className={classes.button}>
                  X??c nh???n
                </Button>
              </form>
              <div className={classes.actions}>
                <Link to="/forgot-password">
                  <Typography variant="body2">Quay l???i</Typography>
                </Link>
              </div>
            </Box>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
