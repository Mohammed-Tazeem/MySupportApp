import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getTickets,reset } from '../features/tickets/ticketSlice'
import Spinner from '../Components/Spinner'
import BackButton from '../Components/BackButton'
import TicketItem from '../Components/TicketItem'


function Tickets() {

    const {tickets, isLoading,isSuccess} = useSelector((state)=> state.tickets)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTickets())

    },[dispatch])

    useEffect(()=>{
        return () =>{
            if(isSuccess){
                dispatch(reset())
            }
        }
    },[dispatch,isSuccess])

    if(isLoading){
        <Spinner/>
    }


  return (
    <>
    <BackButton url='/' />
    <h1>Tickets</h1>
    <div className="tickets">
        <div className="ticket-heading">
            <div >Date</div>
            <div >Product</div>
            <div >Status</div>
            
            {tickets.map((ticket)=>(
                <TicketItem key={ticket._id} ticket={ticket} />
            ))}
            

        </div>
    </div>
    
    </>
  )
}

export default Tickets