/* import TicketsList ;
import TicketForm ; */
import Nav from "../../components/NavAuth";
import { Fragment } from 'react';
import TicketForm from "./TicketFormExcert";

const Tickets = () => {

  return (
    <Fragment>
      <Nav/>
      <TicketForm/>
      {/* <TicketsList/> */}

    </Fragment>
  )
}

export default Tickets;