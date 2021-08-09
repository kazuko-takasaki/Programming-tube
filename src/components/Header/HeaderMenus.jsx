import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';

const HeaderMenus = (props) => {
    const dispatch = useDispatch();

    return (
        <>
            <IconButton onClick={() => dispatch(push('/channel/add'))}>
                <AddCircleIcon />
                <h2>PR動画の登録</h2>
            </IconButton>
            <IconButton onClick={(e) => props.open(e)}>
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default HeaderMenus