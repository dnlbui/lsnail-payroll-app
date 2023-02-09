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
        <div className="row row-cols-1 gy-5 offset-1">
          <section className="welcome">
            <h1>{home}</h1>
            <h6>Future features</h6>
            <ul>
              <li>Role based authorization</li>
              <li>Confirmation alerts for succesful actions</li>
              <li>In node create a route for creating an item to input price by creating a new item</li>
              <li>Charts</li>
              <li>Ability to edit items</li>
              <li>Have mobile view look more aligned and centered</li>
            </ul>
          </section>
        </div>

        <img src="https://media.cntraveler.com/photos/5eb18e42fc043ed5d9779733/16:9/w_2580,c_limit/BlackForest-Germany-GettyImages-147180370.jpg" className="img-fluid" alt="Taken by Bui"></img>
      </div>
    </Fragment>
  )
  return content
}

export default Home