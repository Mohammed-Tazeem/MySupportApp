import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getTicket,closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote} from '../features/notes/noteSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../Components/Spinner'
import BackButton from '../Components/BackButton'
import { useNavigate } from 'react-router-dom'
import NoteItem from '../Components/NoteItem'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'



const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }

  Modal.setAppElement('#root')



function Ticket() {

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState(false)

    const {ticket, isLoading,isError,message}  = useSelector((state)=>state.tickets)
    const {notes, isLoading:notesIsLoading}  = useSelector((state)=>state.notes)

    // eslint-disable-next-line
    const params = useParams()
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    const {ticketId} = useParams() 
     

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        
        dispatch(getTicket(ticketId))
        
        dispatch(getNotes(ticketId))

    },[message,isError,ticketId])

    // Close ticket
    const onTicketClose = ()=>{
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Close')
        navigate('/tickets')
    }

    //Create note Submit
    const onNoteSubmit = (e) =>{
        e.preventDefault()
        dispatch(createNote({noteText,ticketId}))
        closeModal()
    }

    const openModal = ()=>{ setModalIsOpen(true) }
    const closeModal = ()=>{ setModalIsOpen(false) }

    if(isLoading || notesIsLoading){
        return <Spinner/>
    }

    if(isError){
        return <h3>Something Went Wrong</h3>
    }



  return (
    <div className='ticket-page'>
        
        <header className="ticket-header">
            <BackButton url='/tickets'/>
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                    {ticket.status}
                </span>
            </h2>
            <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
            <h3>Product: {ticket.product}</h3>
            <hr/>
            <div className="ticket-desc">

                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
            </div>
            <h2>Notes</h2>
        </header>
        {ticket.status !== 'closed' && (
            <button className='btn' onClick={openModal}><FaPlus/>Add Note</button>
        )}

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
            <h2>Add Note</h2>
            <button className='btn-close' onClick={closeModal}>
                X
            </button>
            <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                    <textarea id='noteText' name='noteText' className='form-control' placeholder='Note Text'
                    value={noteText}
                    onChange={(e)=>setNoteText(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className="form-group">
                    <button className='btn' type='submit'> Submit</button>
                </div>
            </form>
        </Modal>

      {notes.map((note) => (
            <NoteItem key={note._id} note ={note} />
            ))}

            

        {ticket.status !== 'closed' && (
            <button className='btn btn-danger btn-block' onClick={onTicketClose}>
                Close Ticket
            </button>
        )}
    </div>
  )
}

export default Ticket