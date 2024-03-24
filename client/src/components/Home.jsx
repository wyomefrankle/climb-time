import { Link } from 'react-router-dom';
import "../App.css";

export default function Home() {
  return (
    <div className='home-container'>
      <div className='row'>
        <div className='col text-center'>
          <br/>
          <h1 className=" fw-bold ">Welcome to ClimbTime!</h1>
          <h5 className="fw-light"> The no.1 app for tracking your climbs across multiple locations</h5>
          <Link to="/login">
            <div className='img-container'>
              <img src="https://cdn11.bigcommerce.com/s-hgn1l9sh63/images/stencil/300w/attribute_rule_images/11499_source_1664430489.png" className="rounded mx-auto d-block"/>
              <div className="overlay">
                <div className="text">Log in</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}