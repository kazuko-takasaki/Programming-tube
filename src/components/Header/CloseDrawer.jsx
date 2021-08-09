import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';
import {signOut} from '../../reducks/users/operations'

const useStyle = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 256,
            flexShrink: 0,
        }
    }
}));

const CloseDrawer = (props) => {
    const classes = useStyle()
    const {container} = props;
    const dispatch = useDispatch();

    const selectMenu = (e, path) => {
        dispatch(push(path));
        props.onClose(e);
    };

    const filters = [
        {func: selectMenu, label: 'All', id: "all", value: "/"},
        {func: selectMenu, label: 'HTML/CSS', id: "p1", value: "/?category=HTML/CSS"},
        {func: selectMenu, label: 'Javascript', id: "p2", value: '/?category=Javascript'},
        {func: selectMenu, label: 'Ruby', id: "p3", value: '/?category=Ruby'},
        {func: selectMenu, label: 'PHP', id: "p4", value: '/?category=PHP'},
        {func: selectMenu, label: 'Kotlin', id: "p5", value: '/?category=Kotlin'},
        {func: selectMenu, label: 'React', id: "p6", value: '/?category=React'},
        {func: selectMenu, label: 'Python', id: "p7", value: '/?category=Python'},
        {func: selectMenu, label: 'others', id: "p8", value: '/?category=others'},
    ];
    
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
                    <List component="nav">
                        <ListItem button onClick={(e) => dispatch(signOut(),selectMenu(e))}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary='ログアウト'></ListItemText>
                        </ListItem>
                    </List>
                <Divider />
                    <List component="nav">
                        {filters.map(filter => (
                            <ListItem
                                button
                                key={filter.id}
                                onClick={(e) => filter.func(e,filter.value)}
                            >
                                <ListItemText primary={filter.label}></ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )
};

export default CloseDrawer