import React, { useState, useEffect } from 'react';
import bus from '../../assets/output-onlinegiftools.gif';
import right from '../../assets/rightside2.gif';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEyeSlash } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
import OtpInput from './onotp';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showOtpInput1, setShowOtpInput1] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [otpFormOpacity, setOtpFormOpacity] = useState(0);
  const [changeFormOpacity, setChangeFormOpacity] = useState(0);
  const [changeFormOpacity1, setChangeFormOpacity1] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [errorMessage4, setErrorMessage4] = useState('');
  const [errorMessage5, setErrorMessage5] = useState('');
  const [errorMessage6, setErrorMessage6] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);
  const [animateImage, setAnimateImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(bus);
  const [showRightImage, setShowRightImage] = useState(false);
  const [animateRightImage, setAnimateRightImage] = useState(false);
  const [inpOTP, setInpOTP] = useState(0)
  const [inpOTP2, setInpOTP2] = useState(0)
  const [formValues, setFormValues] = useState({
    rollNumber: '',
    password: '',
    rollNumber1: '',
    password1: '',
    password2: '',
    password3: '',
    email: '',
    email1: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  const togglePasswordVisibility3 = () => {
    setPasswordVisible3(!passwordVisible3);
  };
  const handleSignupClick = () => {
    setIsSignUpMode(true);
    setAnimateImage(true);
    setCurrentImage(bus);
    setShowRightImage(false);
    setAnimateRightImage(false);
    setTimeout(() => {
      setShowRightImage(true);
    }, 2000);
  };
  const handleSignInClick = () => {
    setIsSignUpMode(false);
    setTimeout(() => {
      setAnimateImage(false);
      setCurrentImage(bus);
    }, 2000);
    setShowRightImage(true);
    setAnimateRightImage(true);
  }

  const handleVerification = (e) => {
    e.preventDefault();
    const rollNumberRegex = /^[a-zA-Z0-9]+$/;
    const validLengths = [4, 10];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validatePassword = (password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[@$!%*?&]/.test(password);
      const isLongEnough = password.length >= 6;
      let errorMessages = [];
      if (!isLongEnough) {
        errorMessages.push("At least 6 characters");
      }
      if (!hasUppercase) {
        errorMessages.push("1 uppercase letter");
      }
      if (!hasLowercase) {
        errorMessages.push("1 lowercase letter");
      }
      if (!hasDigit) {
        errorMessages.push("1 digit");
      }
      if (!hasSpecialChar) {
        errorMessages.push("1 special character");
      }
      if (errorMessages.length > 0) {
        const errorMessage = `
          Password must also include
          ${errorMessages.join(',')}
        `.trim();
        return errorMessage;
      }
      return true;
    };
    if (!emailRegex.test(formValues.email)) {
      setErrorMessage2("Please enter a valid email address.");
    }
    else if (validatePassword(formValues.password1) !== true) {
      setErrorMessage2(validatePassword(formValues.password1));
    }
    else if (!rollNumberRegex.test(formValues.rollNumber1)) {
      setErrorMessage2("please enter a valid Roll Number");

    }
    else if (!validLengths.includes(formValues.rollNumber1.length)) {
      setErrorMessage2("please enter a valid Roll Number");
    }
    else {
      setShowOtpInput1(true);
      setTimeout(() => {
        setChangeFormOpacity1(1);
      }, 900);


      setTimeout(() => {
        setAnimateImage(false);
        setCurrentImage(bus);
      }, 2000);
      setShowRightImage(true);
      setAnimateRightImage(true);
      const myEmail = { email: formValues.email }
      axios.post("http://localhost:9000/send-mail", myEmail)
        .then(success => {
          console.log("OTP Sent Successfully")
        })
        .catch(err => {
          console.log(err)
        })
    }


  };
  const handleSignInClick2 = (e) => {
    e.preventDefault();
    const validatePassword = (password) => {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[@$!%*?&]/.test(password);
      const isLongEnough = password.length >= 6;
      let errorMessages = [];
      if (!isLongEnough) {
        errorMessages.push("At least 6 characters");
      }
      if (!hasUppercase) {
        errorMessages.push("1 uppercase letter");
      }
      if (!hasLowercase) {
        errorMessages.push("1 lowercase letter");
      }
      if (!hasDigit) {
        errorMessages.push("1 digit");
      }
      if (!hasSpecialChar) {
        errorMessages.push("1 special character");
      }
      if (errorMessages.length > 0) {
        const errorMessage = `
          Password must also include
          ${errorMessages.join(',')}
        `.trim();
        return errorMessage;
      }
      return true;
    };
    if (validatePassword(formValues.password2) !== true) {
      setErrorMessage1(validatePassword(formValues.password2));
    }
    else if (formValues.password2 !== formValues.password3) {
      setErrorMessage1("Passwords do not match. Please enter the same password.");
      return;
    }
    else {

      const upd = { email: formValues.email1, password: formValues.password2 }
      axios.post("http://localhost:9000/change-password", upd)
        .then(succ => {
          setIsSignUpMode(false);
          setIsForgotPasswordMode(false);
          setShowOtpInput(false);
          setChangePassword(false);
          setTimeout(() => {
            setAnimateImage(false);
            setCurrentImage(bus);
          }, 2000);
          setShowRightImage(true);
          setAnimateRightImage(true);
        })
        .catch(err => {
          console.log(err)
        })


    }
  };


  const handleForgotPasswordClick = () => {
    setShowRightImage(false);
    setAnimateRightImage(false);
    setIsForgotPasswordMode(true);
    setAnimateImage(true);
    setCurrentImage(bus);
    setTimeout(() => {
      setShowRightImage(true);
    }, 2000);
  };
  const handlePhoneSubmit = (e) => {

    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formValues.email1)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    else {
      const checkMail = { email: formValues.email1 }
      axios.post("http://localhost:9000/check-mail", checkMail)
        .then(succ => {
          succ.data ? axios.post("http://localhost:9000/send-mail", checkMail)
            .then(success => {
              console.log("OTP Sent Successfully")
              setShowOtpInput(true);
              setTimeout(() => {
                setChangeFormOpacity(1);
              }, 900);
              setTimeout(() => {
                setAnimateImage(false);
                setCurrentImage(bus);
              }, 2000);
              setShowRightImage(true);
              setAnimateRightImage(true);
            })
            .catch(err => {
              console.log(err)
            }) : setErrorMessage("Please Enter Valid Email Address")
        })
        .catch(err => {
          console.log(err)
        })
    }

  }
  const onOtpSubmit = (otp) => {
    // console.log("Login Successfull", otp);
    setInpOTP(otp)
  }
  const onOtpSubmit2 = (otp) => {
    setInpOTP2(otp)
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    axios.get("http://localhost:9000/otp-validation")
      .then(otpVerify => {
        console.log(otpVerify)
        console.log(inpOTP2)
        if (otpVerify.data == inpOTP2) {
          setChangePassword(true);
          setAnimateImage(true);
          setShowRightImage(false);
          setAnimateRightImage(false);
          setCurrentImage(bus);
          setTimeout(() => {
            setShowRightImage(true);
          }, 2000);
          setErrorMessage6("");
          setTimeout(() => {
            setOtpFormOpacity(1);
          }, 900);
        }
        else {
          console.log("Wrong OTP");
          setErrorMessage6("Please enter valid OTP");
        }
      })


  }

  const handleLogin = (e) => {
    e.preventDefault()
    const myData = { rollNumber: formValues.rollNumber, password: formValues.password }
    axios.post("http://localhost:9000/check-user-data", myData)
      .then(succ => {
        succ.data ? navigate('/home-page') : setErrorMessage3("Invalid Roll Number and Password")
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleVerify = (e) => {
    e.preventDefault()
    axios.get("http://localhost:9000/otp-validation")
      .then(otpVerify => {
        if (otpVerify.data == inpOTP) {
          const myData = { rollNumber: formValues.rollNumber1, password: formValues.password1, email: formValues.email }
          axios.post("http://localhost:9000/signup-data-insertion", myData)
            .then(suc => {
              console.log("New Account Created")
            })
            .catch(err => {
              console.log(err)
            })
          setErrorMessage4("")
          setErrorMessage5("New account created");
          setTimeout(() => {
            setIsSignUpMode(false)
            setTimeout(() => {
              setAnimateImage(false);
              setCurrentImage(bus);
            }, 2000);
            setShowRightImage(true);
            setAnimateRightImage(true);
            setShowOtpInput1(false)

          }, 1750);

        }
        else {
          console.log("Wrong OTP");
          setErrorMessage4("Please enter valid OTP");
          return;
        }
      })

  }

  return (
    <div className={`poojiloginContainer ${isSignUpMode ? 'sign-up-mode' : ''} ${isForgotPasswordMode ? 'forgot-mode' : ''} ${showOtpInput ? 'otp-mode' : ''} ${changePassword ? 'change-mode' : ''} ${showOtpInput1 ? 'verify-mode' : ''}`}>
      {isForgotPasswordMode ? (
        <div className='poojiforms-container'>
          <div className='poojisignin-signup'>
            <form className='sign-in-form loginform'>
              <h2 className='poojititle'>Sign in</h2>
              <div className='poojiinput-field'>
                <i className='my-auto'><FaUser /></i>
                <input className='LoginInput' name="rollNumber" value={formValues.rollNumber} onChange={handleChange} type='text' required />
                <span className={formValues.rollNumber ? 'fill' : ''}> Enter your Roll Number</span>
              </div>
              <div className='poojiinput-field'>
                <i className='my-auto'><FaLock /></i>
                <input className='LoginInput' name="password" value={formValues.password} onChange={handleChange} type='password' required />
                <span className={formValues.password ? 'fill' : ''}> Enter your password</span>
              </div>
              <div className='login_forgot'>
                <label><input type="checkbox" />Remember me</label>
                <a onClick={handleForgotPasswordClick}>Forgot password?</a>
              </div>

              <button className='btn' id='sign-in-btn' onClick={handleLogin} >Log in</button>
              <div className='login_signup' onClick={handleSignupClick}>
                <p>Don't have an account?<a>Sign up</a></p>
              </div>
            </form>
            {!showOtpInput ? (<form  className='forgot-form loginform' >
              <h2 className='poojititle1'>Forgot password?</h2>
              <div className='poojiinput-field'>
                <i className='my-auto'><MdEmail /></i>
                <input className='LoginInput' type='email' name="email1" value={formValues.email1} onChange={handleChange} required />
                <span className={formValues.email1 ? 'fill' : ''}>Enter your email id</span>
              </div>
              {errorMessage && <p className="poojierror-message">{errorMessage}</p>}
              <button className='btn' type="submit" onClick={handlePhoneSubmit}>Submit</button>
            </form>
            ) : (
              <div className='poojiforms-container'>
                <div className='poojisignin-signup'>
                  <form  className='forgot-form loginform' >
                    <h2 className='poojititle1'>Forgot password?</h2>
                    <div className='poojiinput-field'>
                      <i className='my-auto'><MdEmail /></i>
                      <input className='LoginInput' type='email' name="email1" value={formValues.email1} onChange={handleChange} required />
                      <span className={formValues.email1 ? 'fill' : ''}>Enter your email id</span>
                    </div>
                    <a> back to Log in?</a>
                    {errorMessage && <p className="poojierror-message">{errorMessage}</p>}
                    <button className='btn' type="submit" onClick={handlePhoneSubmit}>Submit</button>
                  </form>
                  {!changePassword ? (
                    <form  className='otp-form loginform' style={{ opacity: changeFormOpacity }} onSubmit={() => { }}>
                      <h2 className='poojititle'>OTP</h2>
                      <p>Enter otp send to {formValues.email1}</p>
                      <OtpInput length={6} onOtpSubmit={onOtpSubmit2} />
                      {errorMessage6 && <p className="poojierror-message">{errorMessage6}</p>}
                      <button className='btn' type="submit" onClick={handleChangePassword}>Submit</button>
                    </form>
                  ) : (
                    <div className='poojiforms-container'>
                      <div className='poojisignin-signup'>
                        <form  className='change-form loginform' style={{ opacity: otpFormOpacity }}>
                          <h2 className='poojititle1'>change password</h2>
                          <div className='poojiinput-field'>
                            <i className='my-auto'><FaLock /></i>
                            <input className='LoginInput' name="password2" value={formValues.password2} onChange={handleChange} type={passwordVisible2 ? 'text' : 'password'} required />
                            <span className={formValues.password2 ? 'fill' : ''}> Enter your password</span>
                            <i className='eye-icon' onClick={togglePasswordVisibility2}>
                              {passwordVisible2 ? <FaEyeSlash /> : <FaEye />}
                            </i>
                          </div>
                          <div className='poojiinput-field'>
                            <i className='my-auto'><RiLockPasswordLine /></i>
                            <input className='LoginInput' name="password3" value={formValues.password3} onChange={handleChange} type={passwordVisible3 ? 'text' : 'password'} required />
                            <span className={formValues.password3 ? 'fill' : ''}> confirm your password</span>
                            <i className='eye-icon' onClick={togglePasswordVisibility3}>
                              {passwordVisible3 ? <FaEyeSlash /> : <FaEye />}
                            </i>
                          </div>
                          {errorMessage1 && <p className="poojierror-message">{errorMessage1}</p>}
                          <button className='btn' id='sign-in-btn' onClick={handleSignInClick2}>Change</button>
                        </form>
                      </div></div>
                  )}
                </div>
              </div>
            )
            }
          </div>
        </div>
      ) : (
        <div className='poojiforms-container'>
          <div className='poojisignin-signup'>
            <form  className='sign-in-form loginform'>
              <h2 className='poojititle'>Sign in</h2>
              <div className='poojiinput-field'>
                <i className='my-auto'><FaUser /></i>
                <input className='LoginInput' name="rollNumber" value={formValues.rollNumber} onChange={handleChange} type='text' required />
                <span className={formValues.rollNumber ? 'fill' : ''}> Enter your Roll Number</span>
              </div>
              <div className='poojiinput-field'>
                <i className='my-auto'><FaLock /></i>
                <input className='LoginInput' name="password" value={formValues.password} onChange={handleChange} type={passwordVisible ? 'text' : 'password'} required />
                <span className={formValues.password ? 'fill' : ''}> Enter your password</span>
                <i className='eye-icon' onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
              <div className='login_forgot'>
                <label><input type="checkbox" />Remember me</label>
                <a onClick={handleForgotPasswordClick}>Forgot password?</a>
              </div>
              {errorMessage3 && <p className="poojierror-message">{errorMessage3}</p>}
              <button className='btn' id='sign-in-btn' onClick={handleLogin}>Log in</button>
              <div className='login_signup' onClick={handleSignupClick}>
                <p>Don't have an account?<a>Sign up</a></p>
              </div>
            </form>
            {!showOtpInput1 ? (<form  className='sign-up-form loginform'>
              <h2 className='poojititle'>Sign up</h2>
              <div className='poojiinput-field'>
                <i className='my-auto'><FaUser /></i>
                <input className='LoginInput' name="rollNumber1" value={formValues.rollNumber1} onChange={handleChange} type='text' required />
                <span className={formValues.rollNumber1 ? 'fill' : ''}> Enter your Roll Number</span>
              </div>
              <div className='poojiinput-field'>
                <i className='my-auto'><MdEmail /></i>
                <input className='LoginInput' type='email' name="email" value={formValues.email} onChange={handleChange} required />
                <span className={formValues.email ? 'fill' : ''}>Enter your email id</span>
              </div>
              <div className='poojiinput-field'>
                <i className='my-auto'><FaLock /></i>
                <input className='LoginInput' name="password1" value={formValues.password1} onChange={handleChange} type={passwordVisible1 ? 'text' : 'password'} required />
                <span className={formValues.password1 ? 'fill' : ''}> Create your password</span>
                <i className='eye-icon' onClick={togglePasswordVisibility1}>
                  {passwordVisible1 ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
              {errorMessage2 && <p className="poojierror-message">{errorMessage2}</p>}
              <button className='btn' id="sign-up-btn" onClick={handleVerification} >Sign up</button>
              <div className='login_signup' onClick={handleSignInClick}>
                <p>Already have an account?<a>Log in</a></p>
              </div>
            </form>) : (
              <div className='poojiforms-container'>
                <div className='poojisignin-signup'>
                  <form  className='verify-form loginform' style={{ opacity: changeFormOpacity1 }} onSubmit={() => { }}>
                    <h2 className='poojititle'>OTP</h2>
                    <p>Enter otp send to {formValues.email}</p>
                    <OtpInput length={6} onOtpSubmit={onOtpSubmit} />
                    {errorMessage4 && <p className="poojierror-message">{errorMessage4}</p>}
                    {errorMessage5 && <p className="poojierror-message1">{errorMessage5}</p>}

                    <button className='btn' type="submit" onClick={handleVerify}>verify</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className='poojipanels-container'>
        <div className='poojipanel poojileft-panel'>
          <img src={currentImage} alt="Sliding" className={`moving-image ${animateImage ? 'animate-image' : ''}`} />
        </div>
        <div className='poojipanel poojiright-panel'>
          {showRightImage && (
            <img
              src={right}
              alt="Right panel"
              className={`moving-image-right ${animateRightImage ? 'animate-right' : ''}`}
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Login;


