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
import {useEffect, useState} from 'react';
import {deleteChannel} from '../../reducks/channel/operations';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import {favoriteAdd,deleteFavorites} from '../../reducks/users/operations';
import FavoriteIcon from "@material-ui/icons/Favorite";
import {db} from '../../firebase';

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

    console.log(props)

    const uid = selector.users.uid;
    const upUserId = props.uid;
    const channel_Id = props.id;

    const [anchorEl,setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    };

    const handleClose = () => {
        setAnchorEl(null)
    };

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        console.log('fetch')
        db.collection('users').doc(uid).collection('favorite').get()
            .then(snapshots => {
                snapshots.docs.forEach(doc => {
                    const data = doc.data();

                    const post_id = data.channelId
                    if(channel_Id === post_id) {
                        setSaved(true)
                    }
                })
            })
    },[channel_Id,uid])

    const handleClickFav = (e) => {
        if (saved === false) {
            setSaved(true);
        } else {
            setSaved(false);
        }
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
                                        dispatch(deleteChannel(props.id));
                                        handleClose()
                                    }}
                                >
                                    削除する
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                    <div>
                        { saved === true ?
                        <IconButton onClick={(e) => dispatch(deleteFavorites(props.id,uid),handleClickFav(e))}>
                            <FavoriteIcon />
                        </IconButton>
                        :
                        <IconButton onClick={(e) => dispatch(favoriteAdd(props.id,props.title,uid),handleClickFav(e))}>
                            <FavoriteBorderIcon />
                        </IconButton>
                        }
                    </div>
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