import React from 'react'
import { useSelector } from 'react-redux'

function NoteItem({ note }) {
    const { user } = useSelector((state) => state.auth)
    return (
        <div className='note' style={{
            backgroundColor:note.isStaff ? 'rgba(0,0,0,0.7)' : '#fff'
        }}>
            
           <h4>Note From {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
           <p className='note-date'>
            {new Date(note.createdAt).toLocaleString('en-US')}
           </p>
        </div>
    )
}

export default NoteItem