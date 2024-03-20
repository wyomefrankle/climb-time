import { Link } from 'react-router-dom';
import "../App.css";

export default function Home() {
  return (
    <div className='home-container'>
      <h1>Welcome to ClimbTime!</h1>
      <h3>The no.1 app for tracking your climbs across multiple locations</h3>
      <Link to="/login">
        <div className='img-container'>
          <img src="https://cdn11.bigcommerce.com/s-hgn1l9sh63/images/stencil/300w/attribute_rule_images/11499_source_1664430489.png" className="image"/>
          <div className="overlay">
            <div className="text">Log in</div>
          </div>
        </div>
      </Link>
    </div>
  )
}