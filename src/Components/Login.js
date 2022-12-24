import * as React from 'react';
import {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { makeStyles } from "@mui/styles";
import './Login.css';
import insta from '../Assets/insta.png'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Link, useNavigate} from 'react-router-dom';
import bg from '../Assets/login-image.png';
import {AuthContext} from '../Context/AuthContext'

export default function Login() {
    const store = useContext(AuthContext)
    console.log(store)
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            textAlign: "center"
        },
        card2: {
            height: '8vh',
            marginTop: '2%'
        }
    })
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const {login} = useContext(AuthContext)

    const handleClick = async() => {
        try{
            setError('')
            setLoading(true)
            let res = await login(email, password);
            setLoading(false)
            navigate('/')
        } catch(err){
            setError(err)
            setTimeout(() => {
                setError('')
            },2000)
            setLoading(false)
        }
    }

    return (
        <div className="loginWrapper">
            <div className='imgcar' style={{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover' }}>
                {/* <div className='car'>
                    <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={125}
                        totalSlides={3}>
                        <Slider>
                            <Slide index={0}>I am the first Slide.</Slide>
                            <Slide index={1}>I am the second Slide.</Slide>
                            <Slide index={2}>I am the third Slide.</Slide>
                        </Slider>
                    </CarouselProvider>
                </div> */}
            </div>

            <div className="loginCard">
                <Card variant="outlined">
                    <div className='insta-logo'>
                        <img src={insta}></img>
                    </div>
                    <CardContent>
                        {error!='' && <Alert severity="error">{error}</Alert>}
                        <div>
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <Typography className={classes.text2} color="primary" variant="subtitle1">
                            Forgot Password ?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth={true} color="primary" onClick={handleClick} disabled={loading}>
                            Login
                        </Button>
                    </CardActions>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Don't have an account ? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign up</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}
