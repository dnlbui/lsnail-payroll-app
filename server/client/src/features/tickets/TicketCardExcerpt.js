//Returns a card for each product
export default function TicketCard ({element}) {
  let {serviceDate, serviceTotal, creditCardTip, _id} = element;
  return (
    <div className="card" value={_id} style={{width: 288}}>
      <div className="card-body">
        <h5 className="card-title">Service Date: {serviceDate}</h5>
        <h5 className="card-title">Service Total: {serviceTotal}</h5>
        <h5 className="card-title">Credit CardTip:: {creditCardTip}</h5>
      </div>
      <button type="button" value={_id} class="btn btn-danger">Delete</button>
    </div>
  )
}