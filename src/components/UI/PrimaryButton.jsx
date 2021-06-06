import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles( {
    'button': {
        backgroundColor: '#B0E0E6',
        color: '#000',
        fontsize: 16,
        height: 48,
        marginButton: 16,
        width: 256
    }
});

const PrimaryButton = (props) => {
    const classes = useStyles();
    return (
        <Button className={classes.button} variant="contained" onClick={()=> props.onClick()}>
            {props.label}
        </Button>
    )
};

export default PrimaryButton;



