//try out layout modal in rsuite
import './styles.css'
import React, {Fragment} from 'react';
import TicketListSearchBar from './TicketsListSearchBarExcert';
//import { /* useRef, */ useState, /* useEffect */ } from 'react';
// import {useNavigate} from 'react-router-dom';


// import { useRegisterTicketMutation } from './TicketsApiSlice';



//Returns a card for each product
const TicketsList = () => {
  // const userRef = useRef()
  // const errRef = useRef()
  // const [name, setName] = useState('')

  // const [errMsg, setErrMsg] = useState('')
  // const navigate = useNavigate()

  // const [registerTicket, { isLoading }] = useRegisterTicketMutation()
  //useEmployeesListQuery

  // useEffect(()=> {
  //   userRef.current.focus()
  // },[])

  // useEffect(()=>{
  //   setErrMsg('')
  // },[startDate,endDate,name])
  
  // const handleSubmit = async(e) => {
  //   e.preventDefault()




  
  // const handleNameInput = (e) => setName(e.target.value);

  return (
    <Fragment>
    <div className='container '>
    <div className='row row-cols-1'>
      <TicketListSearchBar/>
    </div>
    </div>
    </Fragment>
  )
}

export default TicketsList;