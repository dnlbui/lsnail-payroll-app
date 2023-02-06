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
      <TicketForm/>
      <div className="row row-cols-3 gy-10 offset-5">
        <div className="col ">
          <div className="jumbotron jumbotron-fluid ">
            <div className="container">
              <h1 className="display-8 text-center">Ticket List</h1>
            </div>
          </div>
        </div>
      </div>
      <TicketsSearch/>
      <br></br>
      <br></br>
    </Fragment>
  )
}

export default Tickets;