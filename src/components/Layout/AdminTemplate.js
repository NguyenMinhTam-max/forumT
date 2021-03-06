import { AdminMenu } from './AdminMenu';
import HeaderAdmin from './HeaderAdmin';
import { Person, Menu, Loyalty, ListAlt, Category, Comment, AddComment,
  SupervisorAccount, MarkunreadMailbox, LocalLibrary} from '@material-ui/icons';
import SideBar from '../SideBar/SideBar';
import AdminInfomation from '../UserInfomation/AdminInfomation';
import Footer from './Footer';
import { makeStyles } from '@material-ui/core';

const options = [
  {
    icon: Menu,
    title: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    icon: ListAlt,
    title: 'Diễn đàn',
    subItems: [
      {
        icon: MarkunreadMailbox,
        title: 'Chuyên mục',
        link: '/admin/categories',
      },
      {
        icon: Category,
        title: 'Chuyên mục con',
        link: '/admin/sub-categories',
      },
      {
        icon: Comment,
        title: 'Chủ đề',
        link: '/admin/products',
      },
      {
        icon: AddComment,
        title: 'Bài viết',
        link: '/admin/products',
      },
    ],
  },
  {
    icon: Person,
    title: 'Người dùng',
    // link: '/admin/users',
    subItems: [
      {
        icon: SupervisorAccount,
        title: 'Admin',
        link: '/admin/user/admins',
      },
      {
        icon: Person,
        title: 'User',
        link: '/admin/user/sellers',
      },
      {
        icon: LocalLibrary,
        title: 'Mod',
        link: '/admin/user/bidders',
      },
    ],
  },
  // {
  //   icon: AttachMoney,
  //   title: 'Orders',
  //   link: '/admin/orders',
  // },
];

const useStyles = makeStyles((theme) => ({
  navBar: {

  },
  main: {
    background: '#ddd',
    minHeight: '80vh',
    maxHeight: 'calc(100% - 129px)',
    paddingTop: 64,
    marginBottom: 65,
    width: 'calc(100% - 300px)',
    marginLeft: 280,
    marginTop: 20,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: 80,
      marginBottom: 85,
    },
  },
  maginn:{
    marginTop:50
  }
}));

const user = JSON.parse(localStorage.getItem('user'));
export const AdminTemplate = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <HeaderAdmin showMenu />
      <SideBar>
        <AdminInfomation
          avatar={user?.accAvatar || "http://themes.pixelstrap.com/multikart/assets/images/dashboard/man.png"}
          name={user?.accFullName || ""}
          user={user || null}
          position="ADMIN"
        />
        <AdminMenu options={options} />
      </SideBar>
      <main className={classes.main}>{children}</main>
      <Footer hasSideBar />
    </>
  );
};
