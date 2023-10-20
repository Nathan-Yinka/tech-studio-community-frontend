import techstudioLogo from "../assets/TSA community 3.svg";
import "../styles/PasswordReset.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "./Alert";
import Loader from "./Loader";

const PasswordReset = () => {
  const apiURL = "https://techstudiocommunity.onrender.com";
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({})

  const validateForm = () => {
    const errorsObject = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isFormatValid = emailPattern.test(email);

    if (!email) {
      errorsObject.email = "Email is required!";
    } else if (!isFormatValid) {
      errorsObject.email = "Enter a valid email!";
    }

    return errorsObject;
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        var requestData = {
          email: email,
        };

        var requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        };

        const response = await fetch(
          `${apiURL}/auth/reset-password/`,
          requestOptions
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An error occurred");
        }

        const result = await response.json();
        setAlertMessage({message:result.message,status:true})
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 6000);
      } catch (error) {
          setAlertMessage({message:error.message,status:false})
          setAlert(true)
            setTimeout(() => {
              setAlert(false)
            }, 6000);
      } finally {
        setLoading(false);
      }

    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className="password-reset position-relative">
      <div>
      <div className="header">
        <Link to={"/"}>
          <img src={techstudioLogo} alt="" />
        </Link>
      </div>
      {alert && <Alert message={alertMessage.message} status={alertMessage.status}/>}
      <div className="container">
        <div className="body">
          
          <h1>Reset Your Password.</h1>
          <p className="message">
            To reset your password, enter the email address associated with your
            account. We’ll send you a link to create a new password.
          </p>
          <form onSubmit={handleSubmit} >
            <input
              className={errors.email ? "error px-2" : "px-2"}
              id="email"
              value={email}
              placeholder="Enter your email address..."
              onChange={(e) => {
                setEmail(e.target.value);
                {
                  errors.email = null;
                }
              }}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
            <button type="submit" className="btn btn-primary mt-3">
              {loading?<Loader/>:<strong>Request Password Reset</strong>}
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PasswordReset;
