import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { database } from '../Firebase';

function AddComment({userData, postData}) {
    const [text, setText] = useState('')
    const handleClick = () => {
        let obj = {
            text:text,
            uProfileImage:userData.profileUrl,
            uName:userData.fullName
        }
        database.comments.add(obj).then((doc) => {
            database.posts.doc(postData.postId).update({
                comments:[...postData.comments, doc.id]
            })
        })
        setText('')
    }
    return (
        <div style={{width:'100%', display:'flex', alignItems:'center'}}>
            <TextField id="outlined-basic" label="Add comment" variant="outlined" size="small" sx={{width:'70%'}} value={text} onChange={(e) => setText(e.target.value)}/>
            <Button style={{marginLeft:'10px'}} variant="contained" onClick={handleClick}>Post</Button>
        </div>
    )
}

export default AddComment