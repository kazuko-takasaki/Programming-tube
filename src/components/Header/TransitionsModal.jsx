
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Divider from '@material-ui/core/Divider'
import {useSelector,useDispatch} from "react-redux";
import {getUserFavorites} from '../../reducks/users/selectors'
import {fetchFavorites} from '../../reducks/users/operations';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#ffffff',
    padding: '50px',
    border: '5px solid #f0f8ff',
    outline: 'none',
    borderRadius:'5px'
  },
}));

const TransitionsModal = ( ) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector( (state) => state);
  const favoriteChannels = getUserFavorites(selector);
  const [open, setOpen] = React.useState(false);

  const uid = String(selector.users.uid);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button onClick={() => dispatch(fetchFavorites(uid),handleOpen())}>
          <ListItemIcon>
              <FavoriteBorderIcon  />
          </ListItemIcon>
          <ListItemText primary='お気に入り'></ListItemText>
      </ListItem>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {favoriteChannels.map(Channel => ( 
              <div key={Channel.channelId}>
                <Divider/>
                  <div className="module-spacer--small" />
                  <h2 id="transition-modal-title" >
                    {Channel.title} 
                  </h2>
                  <div className="module-spacer--small" />
                <Divider />
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal