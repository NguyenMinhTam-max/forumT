import { Container, makeStyles, Typography } from "@material-ui/core";
import {Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {
		background: "#2C553C",
		minHeight: 65,

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingLeft: (props) => (props?.hasSideBar ? 300 : 0),
		[theme.breakpoints.down("xs")]: {
			minHeight: 85,
			marginTop: -85,
		},
		[theme.breakpoints.down("sm")]: {
			paddingLeft: "0 !important",
		},
	},
	container: {
		height: "100%",
	},
	content: {
		height: "100%",
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			padding: "10px 0",
		},
	},
	contact: {
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			marginTop: 10,
		},
		"& ul": {
			display: "flex",
			alignItems: "center",
			listStyle: "none",
			"& a": {
				marginLeft: 10,
			},
		},
	},
}));
const Footer = ({ hasSideBar }) => {
	const classes = useStyles({ hasSideBar });
	return (
		<footer className={classes.root}>
			<Container className={classes.container}>
				<div className={classes.content}>
					<Typography variant="body1" style = {{color:"white"}}>
						@Admistrator page - Forums T@
					</Typography>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
