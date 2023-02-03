//try out layout modal in rsuite
import './styles.css'
import React, {Fragment} from 'react';
import { /* useRef, */ useState, /* useEffect */ } from 'react';
// import {useNavigate} from 'react-router-dom';
import { Form,Button, DateRangePicker, Dropdown } from 'rsuite';

// import { useRegisterTicketMutation } from './TicketsApiSlice';



//Returns a card for each product
const TicketForm = () => {
  // const userRef = useRef()
  // const errRef = useRef()
  // const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
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

        const CustomDropdown = ({ ...props }) => (
          <Dropdown {...props}>
            <Dropdown.Item>New File</Dropdown.Item>
            <Dropdown.Item>New File with Current Profile</Dropdown.Item>
            <Dropdown.Item>Download As...</Dropdown.Item>
            <Dropdown.Item>Export PDF</Dropdown.Item>
            <Dropdown.Item>Export HTML</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>About</Dropdown.Item>
          </Dropdown>
        );



  const handleStartDateInput = async (value) => {
    //console.log(value)
    setStartDate(value);

    //console.log(`Start date ${startDate} and End date ${endDate}`)
  }
  const handleEndDateInput = async (value) => {
    //console.log(value)

    setEndDate(value);
    //console.log(`Start date ${startDate} and End date ${endDate}`)
  }
  
  // const handleNameInput = (e) => setName(e.target.value);

  return (
    <Fragment>
    <div className='container '>
    <div className='row row-cols-1'>
    <div className='col-lg-6 offset-lg-3 '>
      <Form layout="inline">
        <CustomDropdown title="Clack" trigger="click" />

        <DateRangePicker
          format="yyyy-MM-dd hh:mm aa"
          showMeridian
          defaultCalendarValue={[new Date('2022-02-01 00:00:00'), new Date('2022-05-01 23:59:59')]}
          hoverRange="week" 
          isoWeek ranges={[]}
          onChange={(value)=>{ handleStartDateInput(value[0]); handleEndDateInput(value[1]);}}
        />

        <Button>Submit Ticket Filter</Button>
      </Form>


    </div>
    </div>
    </div>
    </Fragment>
  )
}

export default TicketForm;