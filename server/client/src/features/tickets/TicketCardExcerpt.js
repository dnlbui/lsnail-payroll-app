import { Fragment } from 'react';
import { useDeleteTicketMutation } from './TicketsApiSlice';

//Returns a card for each product
export default function TicketCard ({element}) {
  let {serviceDate, serviceTotal, creditCardTip, _id} = element;
  let stringDate = new Date(serviceDate).toString().slice(0,16);
 
  let [deleteTicket] = useDeleteTicketMutation();

  const handleClick = () =>{
    deleteTicket(_id);
  }

  return (
    <Fragment>
    <div className='col'>
      <div className="card" value={_id} style={{width: 180}}>
        <div className="card-body">
          <h5 className="card-title text-center">{stringDate}</h5>
          <hr/>
          <h5 className="card-title text-center">Service Total:</h5>
          <h5 className="card-title text-center">${serviceTotal}</h5>
          <h5 className="card-title text-center">Credit CardTip:</h5>
          <h5 className="card-title text-center">${creditCardTip}</h5>
        </div>
        <button type="button" value={_id} className="btn btn-danger" onClick={handleClick}>Delete</button>
      </div>
    </div>
    <br></br>
    </Fragment>
  )
}