//a protected component
import {Fragment} from "react";
import { useSelector } from "react-redux";
import { selectCurrentEmail } from "../auth/authSlice";
import Nav from "../../components/NavAuth";


const Home = () => {
  const email = useSelector(selectCurrentEmail)

  const home = email ? `Welcome ${email}! Charts Coming Soon!` : 'Welcome! Charts Coming Soon!'

  const content = (
    <Fragment>
      <Nav/>
      <div className='container'>
        <div className="row row-cols-1 gy-5 offset-1">
          <section className="welcome">
            <h1>{home}</h1>
          </section>
        </div>

        <img src="https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg" className="img-fluid" alt="Taken by Bui"></img>
      </div>
    </Fragment>
  )
  return content
}

export default Home