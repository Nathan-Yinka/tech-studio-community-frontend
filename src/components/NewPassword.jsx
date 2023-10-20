import techstudioLogo from "../assets/TSA community 3.svg";
import { Link, useParams } from "react-router-dom";
import "../styles/NewPassword.css";
import { useState } from "react";
import eyeclose from "../assets/eye-close.svg";
import eyeopen from "../assets/eye-open.svg";
import PasswordResetModal from "./PasswordResetModal";
import Alert from "./Alert";
import Loader from "./Loader";

const NewPassword = () => {
  const apiURL = "https://techstudiocommunity.onrender.com";
  const {uid,token} = useParams()
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [reveal2, setReveal2] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modal,setModal] = useState({status:"",message:""})
  const [alertMessage, setAlertMessage] = useState({})
  const [alert, setAlert] = useState(false)

  const validateForm = () => {
    const errorsObject = {};

    if (!newPassword) {
      errorsObject.newPassword = "Password is required!";
    }

    if (!confirmNewPassword) {
      errorsObject.confirmNewPassword = "Please confirm your new password";
    } else if (confirmNewPassword !== newPassword) {
      errorsObject.confirmNewPassword = "Both passwords must match";
    }

    return errorsObject;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);

        var requestData = {
          uid:uid,
          token:token,
          new_password:newPassword
        };

        var requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        };

        const response = await fetch(
          `${apiURL}/auth/confirm-password-reset/`,
          requestOptions
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An error occurred");
        }

        const result = await response.json();
        
        setModal((prevModal) => ({
          ...prevModal,
          status: true,
          message: result.message,
          login: true,
        }));

      } catch (error) {
          setAlertMessage({message:error.message,status:false})
          setConfirmNewPassword("")
          setNewPassword('')
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
  }

  const handleReveal = () => {
    setReveal(!reveal);
  };

  const handleReveal2 = () => {
    setReveal2(!reveal2);
  };
  return (
    <div className="new-password">
      <div className="header">
        <Link to={"/"}>
          <img src={techstudioLogo} alt="" />
        </Link>
      </div>
      {alert && <Alert message={alertMessage.message}/>}
      <div className="container">
        <div className="body">
          <p className="new-password-heading">
            To reset your password, please enter a new password below.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="my-4">
              <div className="d-flex flex-column gap-2 form-div">
                <label htmlFor="email">New Password</label>
                <input
                  className={errors.newPassword ? "error px-3" : "px-3"}
                  type={reveal ? "text" : "password"}
                  id="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    {
                      errors.newPassword = null;
                    }
                  }}
                />
                <img
                  className="eye"
                  onClick={handleReveal}
                  src={reveal ? eyeclose : eyeopen}
                  alt=""
                />
              </div>
              {errors.newPassword && (
                <p className="error-message mt-2">{errors.newPassword}</p>
              )}
            </div>
            <div className="my-4">
              <div className="d-flex flex-column form-div gap-2">
                <label htmlFor="email">Confirm Password</label>
                <input
                  className={errors.confirmNewPassword ? "error px-3" : "px-3"}
                  type={reveal2 ? "text" : "password"}
                  id="confirmpassword"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    {
                      errors.confirmNewPassword = null;
                    }
                  }}
                />
                <img
                  className="eye"
                  onClick={handleReveal2}
                  src={reveal2 ? eyeclose : eyeopen}
                  alt=""
                />
              </div>
              {errors.confirmNewPassword && (
                <p className="error-message mt-2">
                  {errors.confirmNewPassword}
                </p>
              )}
            </div>
            <button
              className="btn btn-primary mt-3 col-4"
            >
              {loading?<Loader/>:<strong>Reset Password</strong>}
            </button>
          </form>
        </div>
      </div>
      {modal.message !=="" && <PasswordResetModal message={modal.message} status={modal.status} login={modal.login}/>}
    </div>
  );
};

export default NewPassword;
