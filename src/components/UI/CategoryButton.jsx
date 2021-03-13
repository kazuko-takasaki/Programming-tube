import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles( {
    'button': {
        backgroundColor: '#f0f8ff',
        color: '#444',
        fontsize: 16,
        height: 30,
        marginButton: 16,
        width: '100%',
        cursor: 'auto',
        '&:hover': {
            backgroundColor: '#f0f8ff'
        }
    }
})

const CategoryButton = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} variant="contained">
            {props.label}
        </Button>
    )
};

export default CategoryButton