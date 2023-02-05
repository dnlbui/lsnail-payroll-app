/* import TicketsList ;
import TicketForm ; */
import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
//import TicketForm from "./TicketFormExcert";
import TicketsExcert from "./TicketsExcert";

const Tickets = () => {

  return (
    <Fragment>
      <Nav/>
      <br></br>
      <div className="row row-cols-3 gy-10 offset-5">
        <div className="col ">
          <div className="jumbotron jumbotron-fluid ">
            <div className="container">
              <h1 className="display-8 text-center">Ticket List</h1>
            </div>
          </div>
        </div>
      </div>
      {/* <TicketForm/> */}
      <TicketsExcert/>

    </Fragment>
  )
}

export default Tickets;