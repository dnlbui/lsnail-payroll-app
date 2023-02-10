//a protected component
import {Fragment} from "react";
import { useSelector } from "react-redux";
import { selectCurrentEmail } from "../auth/authSlice";
import Nav from "../../components/NavAuth";


const Home = () => {
  const email = useSelector(selectCurrentEmail)

  const home = email ? `Welcome ${email}!` : 'Welcome! '

  const content = (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row row-cols-1 gy-5">
          <section className="welcome">
            <h4>{home}</h4>
            <br></br>
            <h6>Coming soon...</h6>
            <ul>
              <li>Item editing</li>  
              <li>Charts (chart.js)</li>
              <li>More UI/UX for practice</li>
              <li>Role based authorization</li>
              <li>Alerts for succesful submissions</li>
              <li>Adding date range to payroll card response</li>
              <li>Input price attached to itemized object for stripe API</li>                      
            </ul>
              <p>I plan to restructure the DB to be scalable and used by multiple business owners.</p>
              <p>Did not think about this since it wasn't in my scope while putting everything together.</p>   
              <br></br>
          </section>
        </div>
        <img src="https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg" className="img-fluid" alt="Taken by Bui"></img>
      </div>
    </Fragment>
  )
  return content
}

export default Home