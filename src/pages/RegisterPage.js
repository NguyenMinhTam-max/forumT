import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import {
	FormControl,
	Container,
	makeStyles,
	Button,
	TextField,
	Typography,
	Grid,
	Box,
	FormHelperText,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useInput } from "../hooks/use-input";
import * as Validate from "../helpers/validate";
import { Link } from "react-router-dom";
import { mainColor } from "../utils";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../reducers/auth";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		maxHeight: "-webkit-fill-available",
	},
	content: {
		padding: "20vh 0",
	},
	title: {
		marginBottom: 25,
		[theme.breakpoints.down("sm")]: {
			fontSize: 25,
			padding: "0 95px",
		},
	},
	phoneInput: {
		height: "255px ",
	},
	form: {
		width: "45rem",
		background: "#fff",
		maxWidth: "100%",
		margin: "0 auto",
		borderRadius: theme.shape.borderRadius,
		padding: "50px 25px",
		[theme.breakpoints.down("xs")]: {
			padding: "35px 15px",
		},
	},
	formControl: {
		display: "block",
		marginBottom: 15,
		width: "100%",
	},
	button: {
		"&:disabled": {
			cursor: "not-allowed",
			pointerEvents: "all !important",
		},
	},
	forwardTo: {
		marginTop: 10,
		"& > a": {
			color: mainColor,
		},
	},
	inputInvalid: {
		borderColor: theme.palette.error.main + "!important",
		"& ~ div": {
			borderColor: theme.palette.error.main + "!important",
		},
	},
	formHelperText: {
		color: theme.palette.error.main,
	},
}));

const RegisterPage = () => {
	const { t } = useTranslation();
	let history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();

	const loading = useSelector((state) => state.auth.loading);
	const [error, setError] = useState(null);

	const [phoneNumber, setPhoneNumber] = useState("");
	const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);

	const phoneNumberIsValid =
		Validate.isNotEmpty(phoneNumber) && Validate.isPhoneNumber(phoneNumber);
	const phoneNumberHasError = !phoneNumberIsValid && phoneNumberIsTouched;

	const {
		enteredInput: email,
		hasError: emailHasError,
		inputBlurHandler: emailBlurHandler,
		inputChangeHandler: emailChangeHandler,
		inputIsValid: emailIsValid,
		inputReset: emailReset,
	} = useInput(
		(value) => Validate.isNotEmpty(value) && Validate.isEmail(value)
	);

	const {
		enteredInput: password,
		hasError: passwordHasError,
		inputBlurHandler: passwordBlurHandler,
		inputChangeHandler: passwordChangeHandler,
		inputIsValid: passwordIsValid,
		inputReset: passwordReset,
	} = useInput(Validate.isNotEmpty);
	const {
		enteredInput: confirmPassword,
		hasError: confirmPasswordHasError,
		inputBlurHandler: confirmPasswordBlurHandler,
		inputChangeHandler: confirmPasswordChangeHandler,
		inputIsValid: confirmPasswordIsValid,
		inputReset: confirmPasswordReset,
	} = useInput((value) => Validate.isNotEmpty(value) && value === password);

	const {
		enteredInput: fullName,
		hasError: fullNameHasError,
		inputBlurHandler: fullNameBlurHandler,
		inputChangeHandler: fullNameChangeHandler,
		inputIsValid: fullNameIsValid,
		inputReset: fullNameReset,
	} = useInput(Validate.isNotEmpty);

	const phoneNumberChangeHandler = (value) => {
		setPhoneNumber(value);
	};

	const phoneNumberBlurHandler = () => {
		setPhoneNumberIsTouched(true);
	};

	const phoneNumberReset = () => {
		setPhoneNumber("");
		setPhoneNumberIsTouched(false);
	};
	const formIsValid =
		emailIsValid &&
		phoneNumberIsValid &&
		passwordIsValid &&
		confirmPasswordIsValid &&
		fullNameIsValid;
	const formSubmitHandler = async (event) => {
		event.preventDefault();
		if (!formIsValid) return;
		try {
			const result = await dispatch(
				register({
					fullName: fullName,
					username: email,
					password: password,
					email: email,
					phoneNumber: phoneNumber,
				})
			).unwrap();
			const location = {
				pathname: '/account-activation',
				state: { id: result.accId }
			}
			history.push(location);
			emailReset();
			phoneNumberReset();
			passwordReset();
			confirmPasswordReset();
			fullNameReset();
		} catch (rejectedValueOrSerializedError) {
			setError(rejectedValueOrSerializedError);
		}
	};

	useEffect(() => {
		document.title = "????ng k??";
	}, [t]);

	return (
		<>
			<div className={classes.root}>
				<Header />
				<div className={classes.content}>
					<Container>
						<Box className={classes.form} boxShadow={3}>
							<Typography variant="h3" className={classes.title}>
								????ng k??
							</Typography>
							<form
								noValidate
								autoComplete="off"
								onSubmit={formSubmitHandler}
							>
								<FormControl className={classes.formControl}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<TextField
												error={emailHasError}
												label="Email"
												type="email"
												helperText={
													emailHasError && "Vui l??ng nh???p email ????ng"
												}
												required
												fullWidth
												size="small"
												variant="outlined"
												value={email}
												onBlur={emailBlurHandler}
												onChange={emailChangeHandler}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<PhoneInput
												inputStyle={{
													height: "40px",
													width: "100%",
												}}
												inputClass={
													phoneNumberHasError &&
													classes.inputInvalid
												}
												country={"vn"}
												label="S??? ??i???n tho???i"
												placeholder="Nh???p s??? ??i???n tho???i"
												value={phoneNumber}
												onChange={
													phoneNumberChangeHandler
												}
												onBlur={phoneNumberBlurHandler}
											/>
											{phoneNumberHasError && (
												<FormHelperText
													variant="outlined"
													className={
														classes.formHelperText
													}
												>
													L??m ??n nh???p s??? ??i???n tho???i ????ng
												</FormHelperText>
											)}
										</Grid>
									</Grid>
								</FormControl>
								<FormControl className={classes.formControl}>
									<TextField
										error={fullNameHasError}
										label="H??? t??n"
										helperText={
											fullNameHasError &&
											"Vui l??ng nh???p h??? t??n h???p l??"
										}
										fullWidth
										size="small"
										variant="outlined"
										value={fullName}
										onBlur={fullNameBlurHandler}
										onChange={fullNameChangeHandler}
									/>
								</FormControl>
								<FormControl className={classes.formControl}>
									<TextField
										label="M???t kh???u"
										type="password"
										error={passwordHasError}
										helperText={
											passwordHasError &&
											"M???t kh???u kh??ng ???????c ????? tr???ng"
										}
										fullWidth
										size="small"
										variant="outlined"
										value={password}
										onBlur={passwordBlurHandler}
										onChange={passwordChangeHandler}
									/>
								</FormControl>
								<FormControl className={classes.formControl}>
									<TextField
										label="X??c nh???n m???t kh???u"
										type="password"
										error={confirmPasswordHasError}
										helperText={
											confirmPasswordHasError &&
											"M???t kh???u v?? m???t kh???u x??c nh???n kh??ng kh???p"
										}
										fullWidth
										size="small"
										variant="outlined"
										value={confirmPassword}
										onBlur={confirmPasswordBlurHandler}
										onChange={confirmPasswordChangeHandler}
									/>
								</FormControl>

								{error?.length > 0 && (
									<FormHelperText
										error
										style={{ marginBottom: 10 }}
									>
										{error}
									</FormHelperText>
								)}
								<Button
									variant="contained"
									color="primary"
									fullWidth
									disabled={!formIsValid}
									type="submit"
									className={classes.button}
								>
									{!loading
										? "????ng k??"
										: "??ang ????ng k??"}
								</Button>
								<Typography
									className={classes.forwardTo}
									variant="body2"
								>
									B???n ???? c?? t??i kho???n? 
									<Link to="/login">
										 ????ng nh???p
									</Link>
								</Typography>
							</form>
						</Box>
					</Container>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default RegisterPage;
