import { CircularProgress, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../Firebase'
import Navbar from './Navbar'
import './Profile.css'
import './Posts.css'
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Like2 from './Like2.js'
import AddComment from './AddComment'
import Comments from './Comments'

function Profile() {
    // const {id} = useParams()
    const { user } = useContext(AuthContext)
    const [userData, setUserData] = useState('')
    const [posts, setPosts] = useState(null) || []
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        database.users.doc(user.uid).onSnapshot((snap) => {
            setUserData(snap.data())
        })
    }, [user.uid])

    useEffect(async () => {
        if (userData != null) {
            let parr = []
            for (let i = 0; i < userData?.postIds?.length; i++) {
                let postData = await database.posts.doc(userData.postIds[i]).get()
                parr.push({ ...postData.data(), postId: postData.pId })
            }
            setPosts(parr)
        }
    }, [userData])

    return (
        <div>
            {
                user != null ?
                    <div>
                        {/* <img src={userData.profileUrl}></img> */}
                        <Navbar userData={userData} />
                        <div className="spacer"></div>
                        <div className="container">
                            <div className='upper-part'>
                                <div className='profile-img'>
                                    <img src={userData.profileUrl} style={{}}></img>
                                </div>
                                <div className='info'>
                                    <Typography variant="h5">
                                        Name : {userData.fullName}
                                    </Typography>
                                    <Typography variant="h5">
                                        Email : {userData.email}
                                    </Typography>
                                    <Typography variant="h6">
                                        {/* Posts : {userData.postIds.length} */}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />
                            <div className='profile-videos'>
                                {
                                    posts == null ? <CircularProgress /> :
                                        posts.map((post, index) => (
                                            <React.Fragment key={index}>
                                                <div className="videos">
                                                    <video src={post.pUrl} onClick={() => handleClickOpen(post.pId)}></video>
                                                    <Dialog
                                                        open={open == post.pId}
                                                        onClose={handleClose}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                        fullWidth={true}
                                                        maxWidth="md"
                                                    >
                                                        <div className='modal-container'>
                                                            <div className='video-modal'>
                                                                <video autoPlay={true} muted="muted" controls>
                                                                    <source src={post.pUrl} />
                                                                </video>
                                                            </div>
                                                            <div className='comment-modal'>
                                                                <Card className='card1' style={{ padding: '1rem' }}>
                                                                    <Comments postData={post} />
                                                                </Card>
                                                                <Card variant="outlined" className='card2'>
                                                                    <Typography style={{ padding: '0.2rem' }}>{post.likes.length == 0 ? '' : `Liked by ${post.likes.length} users`}
                                                                    </Typography>
                                                                    <div style={{ display: "flex" }}>
                                                                        <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                        <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} postData={post} userData={userData} />
                                                                    </div>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </Dialog>
                                                </div>
                                            </React.Fragment>
                                        ))
                                }
                            </div>
                        </div>
                    </div> :
                    <CircularProgress />
            }
        </div>
    )
}

export default Profile