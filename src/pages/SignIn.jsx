import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {database, errors} from "../Database/Data.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignIn() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [uname, setUname] = useState();
  const [pass, setPass] = useState();

  let navigate = useNavigate();

  const handleUname = (event) =>{
      setUname(event.target.value);
  }

  const handlePassword = (event) =>{
      setPass(event.target.value);
  }


  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    // Find user login info
    const userData = database.find((user) => user.username === uname);

    // Compare user info
    if (userData) {
      if (userData.password !== pass) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
        toast.error("Invalid Password!")
      } else {
        navigate("/home")
        toast.success("Login Successful!")
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
      toast.error("Username not found")
    }
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required onChange={(event) => handleUname(event)} />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required onChange={(event) => handlePassword(event)}/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" className="login-button" />
        </div>
      </form>
    </div>
  );

  return (
    <>
        <div className="login-app">
            <div className="login-form">
                <div className="title">Sign In with MarkLogic</div>
                {renderForm}
            </div>
        </div>
    </>
  );
}

export default SignIn;