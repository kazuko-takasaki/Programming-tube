import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {push} from "connected-react-router"
import {useDispatch,useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useState} from 'react';
import {deleteChannel} from '../../reducks/channel/operations';
import {getUserId} from '../../reducks/users/selectors'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('md')]: {
            margin: 16,
            width: 'calc(33.3333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
    }
}))

const ChannelCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector( (state) => state);
    const uid = getUserId(selector);

    const upUserId = props.uid;

    const [anchorEl,setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };


    return (
        <Card className={classes.root}>
                <div className="card__imgframe">
                    <div onClick={() => dispatch(push('/channel/' + props.id))}>
                        <img src={`https://img.youtube.com/vi/${props.thumbnail}/mqdefault.jpg`} alt='thumbnail'/>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className="channel__icon">
                        <img src={props.images[0].path} alt="icon" width='70px'/>
                    </div>
                    { uid === upUserId && (
                        <div >
                            <IconButton className={classes.icon}  onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    onClick={() => {dispatch(push('/channel/edit/' + props.id))
                                    handleClose()
                                    }}
                                >
                                    編集する
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        const result = window.confirm('削除してもよろしいですか？')
                                        if (result) dispatch(deleteChannel(props.id));
                                        handleClose()
                                    }}
                                >
                                    削除する
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </div>
                <CardContent className={classes.content}>
                    <div onClick={() => dispatch(push('/channel/' + props.id))}>
                        <Typography className={classes.productName} component="p">
                                {props.title}
                        </Typography>
                    </div> 
                </CardContent>
        </Card>
    )
}

export default ChannelCard;