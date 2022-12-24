import { Avatar, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { database } from '../Firebase'

function Comments({ postData }) {
    const [comments, setComments] = useState(null)
    useEffect(async() => {
        let arr = []
        for(let i=0; i<postData.comments.length; i++){
            let data = await database.comments.doc(postData.comments[i]).get()
            arr.push(data.data())
        }
        setComments(arr)
    }, [postData])
    return (
        <div>
            {
                comments == null ? <CircularProgress /> :
                <>
                {
                    comments.map((comment, index) => (
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Avatar src={comment.uProfileImage} />
                            &nbsp;&nbsp;
                            <p><span style={{fontWeight:'bold'}}>{comment.uName}</span> &nbsp;&nbsp; {comment.text}</p>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Comments