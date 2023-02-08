import './styles.css'
import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import TicketForm from "./TicketFormExcert";
import TicketsSearch from './TicketsSearchExcert';

const Tickets = () => {

  return (
    <Fragment>
      <Nav/>
      <br></br>
      <div className='container'>
        <div className="row row-cols-md-2 row-cols-1 gy-10">
          <div classname="col">
            <TicketForm/>
          </div>
          <div classname="col">
            <TicketsSearch/>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </Fragment>
  )
}

export default Tickets;