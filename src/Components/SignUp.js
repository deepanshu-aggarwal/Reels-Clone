import * as React from 'react';
import { useState, useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles";
import './SignUp.css';
import insta from '../Assets/insta.png'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database, storage } from '../Firebase';

export default function SignUp() {
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            height: '8vh',
            marginTop: '2%'
        }
    })
    const classes = useStyles();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { signup } = useContext(AuthContext)

    const handleClick = async () => {
        if (file == null) {
            setError("Please upload your profile photo")
            setTimeout(() => {
                setError('')
            }, 2000)
            return
        }
        try {
            setError('')
            setLoading(true)
            let userObj = await signup(email, password)
            let uid = userObj.user.uid
            console.log(uid)
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3)
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(`upload is ${progress} % done.`)
            }
            function fn2(error) {
                setError(error)
                setTimeout(() => {
                    setError('')
                }, 2000)
                setLoading(false)
                return
                // console.log('error', error)
            }
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    console.log(url)
                    database.users.doc(uid).set({
                        email: email,
                        userId: uid,
                        fullName: name,
                        profileUrl: url,
                        createdAt: database.getTimeStamp()
                    })
                })
                setLoading(false)
                navigate('/')
            }
        } catch (err) {
            setError(err)
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }

    // const history = useHistory()
    return (
        <div className="signupWrapper">
            <div className="signupCard">
                <Card variant="outlined">
                    <div className='insta-logo'>
                        <img src={insta}></img>
                    </div>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Sign up to see photos and videos from your friends.
                        </Typography>
                        {error != '' && <Alert severity="error">{error}</Alert>}
                        <div>
                            <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size="small" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <Button variant="outlined" fullWidth={true} color="secondary" margin="dense" component="label" /*startIcon={<CloudUploadIcon/>}*/>
                            Upload Profile Image
                            <input type="file" accept="image/*" hidden onChange={(e) => setFile(e.target.files[0])}></input>
                        </Button>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" fullWidth={true} color="primary" disabled={loading} onClick={handleClick}>
                            Sign Up
                        </Button>
                    </CardActions>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant="outlined" className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant="subtitle1">
                            Having an account ? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>

    );
}
