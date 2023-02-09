//a protected component
import { useSelector } from "react-redux";
import { selectCurrentEmail, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom"
import {Fragment} from "react";
import Nav from "../../components/NavAuth";

const Welcome = () => {
  const user = useSelector(selectCurrentEmail)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}!` : 'Welcome!'
  const tokenAbbr = `${token.slice(0, 9)}...`

  const content = (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row gy-5">
          <div className="col">
          <section className="welcome">
            <h4>{welcome}</h4>
            <p>Token: {tokenAbbr}</p>
            <p>This app was made for my mom who records all the service tickets and calculates the payroll by hand.</p>
            <p>I tried to make this user friendly and have the least amount of typing possible.</p>
            <p>It is a work in progress and I will be adding more features as I go.</p>
            <p>Thank you for checking it out!</p>
            <p><Link to="/home">Go to the home page!</Link></p>
          </section>
          </div>
        </div>
        <div className="row">
        <img src="https://www.myyosemitepark.com/wp-content/uploads/2019/07/YO-HalfDome-halfdomecables_Ordelheide_2400.jpg?crop=535:301&width=1070&enable=upscale" className="img-fluid" alt="Taken by Bui"></img>
        </div>
      </div>
    </Fragment>
  )
  return content
}

export default Welcome