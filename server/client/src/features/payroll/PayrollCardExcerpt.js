export const PayrollCard = ({ data }) => {
  return (
    <div class="col d-flex justify-content-center">
      <div className="card" value={data[0]._id} style={{width: 300}}>
        <div className="card-body">
          <h5 className="card-title text-center">Employee's Calculated Payroll</h5>
          <hr/>
          <h5 className="card-title text-center">Service Total:</h5>
          <h5 className="card-title text-center">${data[0].serviceTotal}</h5>
          <h5 className="card-title text-center">Tip Total:</h5>
          <h5 className="card-title text-center">${data[0].tipTotal}</h5>
          <h5 className="card-title text-center">Gross Total:</h5>
          <h5 className="card-title text-center">${data[0].grossTotal}</h5>
          <h5 className="card-title text-center">Employee Paycheck Amount:</h5>
          <h5 className="card-title text-center">${data[0].EmployeePayCheck}</h5>
          <h5 className="card-title text-center">Employee Cash Amount:</h5>
          <h5 className="card-title text-center">${data[0].EmployeePayCash}</h5>
        </div>
      </div>
    </div>
  )
}