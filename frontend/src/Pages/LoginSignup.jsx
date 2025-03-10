import React, { useContext, useState } from "react";
import "./CSS/LoginSignup.css";


const LoginSignup = () => {
   const url="https://backend-p5n2.onrender.com"
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed", formData);
    let responseData;
   await fetch(url+'/login',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-type':'application/json',
    },
    body:JSON.stringify(formData),
   }).then((response)=>response.json())
   .then((data)=>responseData=data)

if (responseData.success){
  localStorage.setItem('auth-token',responseData.token);
  alert('Login Successful')
  window.location.replace('/')
}
else{
  alert(responseData.errors)
}

  };

  const signup = async () => {
    console.log("Signup function executed".formData);
    let responseData;
   await fetch(url+'/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-type':'application/json',
    },
    body:JSON.stringify(formData),
   }).then((response)=>response.json())
   .then((data)=>responseData=data)

if (responseData.success){
  localStorage.setItem('auth-token',responseData.token);
  alert('Signup Successful')
  window.location.replace('/')
}
else{
  alert(responseData.error)
}


  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup_fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              id=""
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={changeHandler}
            value={formData.email}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            id=""
          />
        </div>
        <button onClick={() => (state === "Login"?login():signup() )}>
          Submit
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account{" "}
            <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click Here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing ,I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
