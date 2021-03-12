import React,{useEffect, useState} from "react";
import {signup,authenticate} from "../../util/staffApi";
import {useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import redImage from '../student/Dashboard/raspberries.jpg'
import greenImage from '../student/Dashboard/grapes.jpg'
import blueImage from '../student/Dashboard/blueberry2.jpg'
import orangeImage from '../student/Dashboard/pasta.jpg'
import yellowImage from '../student/Dashboard/mango1.jpg'
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';

import redLogo from '../../logos/redLogo.png'
import greenLogo from '../../logos/greenLogo.png'
import blueLogo from '../../logos/blueLogo.png'
import orangeLogo from '../../logos/orangeLogo.png'
import yellowLogo from '../../logos/yellowLogo.png'

const Signup=()=>{
const history=useHistory();
  //initialised state
  const [staff,setStaff]=useState({
    email:"",
    password:"",
    name:"",
    hostel:"",
    errors:{}
  });

  //destructured
  const {email,password,name,hostel,errors}=staff;

//handle changes in form
  const handleChange=(name)=>(event)=>{
    setStaff({...staff,errors:false,[name]:event.target.value});
  };

//handle submit of form
  const handleSubmit=(event)=>{
  event.preventDefault()
   const hostelId=hostel.toUpperCase();
  setStaff({...staff,errors:false});

  signup({email,password,name,hostelId})
  .then(data=>{
    //console.log(data);
    if(data.errors){
      setStaff({...staff,errors:data.errors})
    }else{
      //on success authenticate by adding token to localstorage
    authenticate(data,()=>{
  setStaff({
        ...staff,
        email:"",
        password:"",
        name:"",
        hostel:"",
        errors:{}
    })
    });
    history.push("/dashboard/staff")
  }
})
}

useEffect(() => {
  applyAccent()
  console.log("yaya dfsdfjkjs");
}, []);
//ugly demo
  return(
    <div>
      <div id='dashboard-wrapper'>
      <div className="dashboard__title__wrapper">
        <div> 
          <div id="dashboard__logo__wrapper">
            <img src='' />
          </div> 
          Messmate
        </div>

        <div>
          STAFF
          <div>
          <IconButton aria-label="delete" onClick={()=>{
              history.push("/");
            }}>
            <HomeIcon
            className="logoutButton"
        />
          </IconButton>
          </div>
        </div>
      </div>
      <div id='cardgrid'>
        <div className='cardgrid__card' id='card4'>
        <div className="Loginheader">
            <h3 className="student-card-heading">Staff Signup</h3>
        </div>
        <form className="signup_form">
          <input placeholder="Name" name="name" type="text" value={name} onChange={handleChange("name")}/>
          {errors.name&& (<Typography variant="body2" className="customError">
           {errors.name}
         </Typography>)}
           <input placeholder="Email" name="email" type="email" value={email} onChange={handleChange("email")}/>
             {errors.email&& (<Typography variant="body2" className="customError">
              {errors.email}
            </Typography>)}
           <input placeholder="Password" name="password" type="password" value={password} onChange={handleChange("password")}/>
             {errors.password&& (<Typography variant="body2" className="customError">
              {errors.password}
            </Typography>)}
           <input placeholder="HostelId" name="hostel" type="text" value={hostel} onChange={handleChange("hostel")}/>
             {errors.hostelId&& (<Typography variant="body2" className="customError">
              {errors.hostelId}
            </Typography>)}
            {errors.general&& (<Typography variant="body2" className="customError">
             {errors.general}
           </Typography>)}
            <Button className="login_button" variant="contained" color="primary"onClick={handleSubmit}>Signup</Button>
            <p>Already have an accout? <span className="redirect" onClick={() => history.push('/login/staff')}>Sign in</span></p>
        </form>
        </div>
      </div>
    </div>
    <div id='messImg-wrapper'>
        <div></div>
      </div>

    </div>
  )
}
function applyAccent() {
  let accentNum = localStorage.getItem('accentNum') || 0
  let accentCodes = ['235, 50, 50', '0, 200, 33', '232, 232, 0', '0, 96, 206', '255, 61, 12']
  let backgroundImages = [redImage, greenImage, yellowImage, blueImage, orangeImage]
  let logoImages = [redLogo, greenLogo, yellowLogo, blueLogo, orangeLogo]
  document.querySelector('#dashboard__logo__wrapper > img').src = logoImages[accentNum]
  document.querySelector(':root').style.setProperty('--accent', accentCodes[accentNum])
  document.getElementById('messImg-wrapper').style.backgroundImage = `url(${backgroundImages[accentNum]})`
  document.getElementById('messImg-wrapper').style.backgroundSize = "cover"
  document.body.style.overflow = 'hidden'
  if(window.innerWidth <= 1300) {
    document.body.style.overflow = 'auto'
    document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
    document.body.style.backgroundSize = "cover"
  }
  document.body.onresize = () => {
    if(window.innerWidth <= 1300) {
      document.body.style.overflow = 'auto'
      document.body.style.backgroundImage = `url(${backgroundImages[accentNum]})`
      document.body.style.backgroundSize = "cover"
    }
    else {
      document.body.style.backgroundImage = "none"
      document.body.style.overflow = 'hidden'
    }
  }
  
  if(accentNum == 4)
  document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'saturate(15) contrast(1) brightness(1) hue-rotate(10deg) opacity(0.8)'
  else if(accentNum == 3) 
  document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'saturate(15) contrast(0.5) brightness(0.8) hue-rotate(40deg) opacity(0.8)'
  else 
  document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'saturate(15) contrast(1) brightness(1) opacity(0.8)'
  if(window.innerWidth <= 1300) document.querySelector('#dashboard__logo__wrapper > img').style.filter = 'brightness(15) saturate(0) contrast(10)'
}
export default Signup;
