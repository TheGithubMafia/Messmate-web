const {db}=require("../admin");
const firebase=require("firebase");

const {validateSignup,validateLogin}=require("../middlewares/validation");

exports.studentSignup=(req,res)=>{
  const newStudent={
    password:req.body.email,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword,
    name:req.body.name,
    college:req.body.college,
    collegeId:req.body.collegeId
  };

  const { valid, errors } = validateSignup(newStudent);
  if (!valid) return res.status(400).json(errors);


  let studenttoken,studentId;
  firebase.auth().createUserWithEmailAndPassword(newStudent.email,newStudent.password)
  .then(data=>{
    studentId=data.user.uid;
    return data.user.getIdToken();
  })
  .then(token=>{
    studenttoken=token;
    const studentCredentials={
      name:newStudent.name,
      email:newStudent.email,
      college:newStudent.college,
      collegeId:newStudent.collegeId,
      createdAt:new Date().toISOString(),
      studentId
    };

    return db.doc(`student/${studentId}`).set(studentCredentials);
  })
  .then(()=>{
    return res.status(201).json({studenttoken});
  })
  .catch(err=>{
    console.error(err);
    if(err.code==="auth/email-already-in-use"){
      return res.status(400).json({email:"Email is already in use"});
    }else
    return res.status(500).json({error:err.code});
  })
}

exports.studentLogin=(req,res)=>{
  const student={
    email:req.body.email,
    password:req.body.password
  };

  const { valid, errors } = validateLogin(student);
  if (!valid) return res.status(400).json(errors);

  let studenttoken;
  firebase.auth().signInWithEmailAndPassword(student.email,student.password)
  .then(data=>{
    return data.user.getIdToken();
  })
  .then(token=>{
    studenttoken=token;
    return res.json({studenttoken});
  })
  .catch(err=>{
    console.error(err);
    return res.status(403).json({general:"Wrong credentials, please try again"});
  })
}
