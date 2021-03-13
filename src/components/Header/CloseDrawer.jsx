import {useEffect} from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';
import {signOut} from '../../reducks/users/operations'
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"


const useStyle = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
        }
    },
    toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
    },
}));

const CloseDrawer = (props) => {
    const classes = useStyle()
    const {container} = props;
    const dispatch = useDispatch();

    console.log(props);

    const selectMenu = (e, path) => {
        dispatch(push(path));
        props.onClose(e,false);
    };

    const filters = [
        {func: selectMenu, label: 'All', id: "all", value: "/"},
        {func: selectMenu, label: 'HTML/CSS', id: "p1", value: "/?category=HTML/CSS"},
        {func: selectMenu, label: 'Javascript', id: "p2", value: '/?category=Javascript'},
        {func: selectMenu, label: 'Ruby', id: "p3", value: '/?category=Ruby'},
        {func: selectMenu, label: 'PHP', id: "p4", value: '/?category=PHP'},
        {func: selectMenu, label: 'Typescript', id: "p5", value: '/?category=Typescript'},
    ];
    
    const menus = [
        {func: selectMenu, label: "チャンネル登録",    icon: <AddCircleIcon/>, id: "add", value: "/channel/edit"},
        {func: selectMenu, label: "お気に入り",   icon:<FavoriteBorderIcon/> ,id: "history",  value: "/order/history"},
    ];

    useEffect( () => {},[])

    return (
        <nav className={classes.drawer}>
            <Drawer
                container={container}
                variant='temporary'
                anchor='right'
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div>
                    <List>
                        {menus.map(menu => (
                                    <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                        <ListItemIcon>
                                            {menu.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={menu.label} />
                                    </ListItem>
                            ))}
                        <ListItem button key='logout' onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary={'ログアウト'}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                        {filters.map(filter => (
                            <ListItem
                                button
                                key={filter.id}
                                onClick={(e) => filter.func(e,filter.value)}
                            >
                                <ListItemText primary={filter.label}></ListItemText>
                            </ListItem>
                        ))}
                </div>

            </Drawer>

        </nav>
    )

};

export default CloseDrawer