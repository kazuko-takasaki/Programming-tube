import {useState,useCallback} from 'react'
import {makeStyles} from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {useDispatch, useSelector} from "react-redux";
import {getSignedIn} from "../../reducks/users/selectors";
import {HeaderMenus,CloseDrawer} from './index';
import logo from '../../assets/images/logo.png';
import {push} from 'connected-react-router';

const useStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuBar: {
        backgroundColor: '#add8e6',
        color: '#008b8b'
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto',
        color: '#008b8b'
    }
}));

const Header = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    const [open, setOpen] = useState(false);

    const handleDrawerToggle = useCallback((e) => {
        if(e.type === 'keydown' && (e.type === 'Tab' || e.type === 'Shift')) {
            return;
        }
        setOpen(!open)
    },[setOpen, open])

    console.log(isSignedIn);

    return (
        <div className={classes.root}>
            <AppBar position='fixed' className={classes.menuBar}>
                <Toolbar className={classes.toolBar}>
                    <img src={logo} alt='logo' width='180px'
                        onClick={() => dispatch(push('/'))}
                    />

                    {isSignedIn && (
                        <div className={classes.iconButtons}>  
                            <HeaderMenus  open={handleDrawerToggle}/>
                        </div>
                    )} 
                    
                </Toolbar>
            </AppBar>
            <CloseDrawer open={open} onClose={handleDrawerToggle} />
        </div>
    )
};

export default Header