import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './exploreMenu.css';
const Explore = () => {

    const navigate = useNavigate();
  return (
    <div className='exploreContainer'><div style={{width:'30%'}}>
      <p>Save a dime. Serve on time.</p>
    </div>
    <div style={{}}>
        <Link  onClick={navigate('/')} style={{color:'white', padding:'5px', border:'2px solid white', borderRadius:"10px", background:'teal',position: 'absolute',
         top: '80%', left: '50%',transform: 'translate(-50%, -50%)',width:'25%',height:'10%',textAlign:'center',fontWeight:'bold',fontSize:'35px',textDecoration:'none'}}>
         Explore Menu
        </Link>
    </div>
    </div>
  )
}

export default Explore