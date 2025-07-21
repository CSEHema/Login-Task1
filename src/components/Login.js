import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function generateCaptcha(length = 5) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  let captcha = "";
  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

function Login() {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setUserCaptcha("");
  };

  const validate_email = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validate_password = (psw) => {
    var errors = [];
    var regex1 = /^.{8,16}$/;
    var regex2 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9.,])(?!.*[.,]).+$/;
    if (!regex1.test(psw)) {
      errors.push("The password should contain from 8 to 16 characters.");
    }
    if (!regex2.test(psw)) {
      errors.push(
        "The password must contain atleast one uppercase letter, one lowercase letter and one special character."
      );
    }
    return errors;
  };

  const validate = (email, password) => {
    let result = {
      emailValid: true,
      passwordErrors: [],
    };

    if (!validate_email(email)) {
      result.emailValid = false;
    }

    const passwordValidation = validate_password(password);
    if (passwordValidation.length > 0) {
      result.passwordErrors = passwordValidation;
    }

    return result;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validate(email, password);
    let isValid = true;

    // 1. Email & password validation
    if (!result.emailValid || result.passwordErrors.length > 0) {
      setError(result);
      isValid = false;
    } else {
      setError(false);
    }

    // 2. CAPTCHA validation
    if (userCaptcha.trim() !== captcha.trim()) {
      setCaptchaError("CAPTCHA does not match.");
      isValid = false;
    } else {
      setCaptchaError("");
    }

    // 3. Hardcoded authentication only if all validations pass
    if (isValid) {
      const hardcodedEmail = "admin@123.com";
      const hardcodedPassword = "Psw@1234";

      if (email === hardcodedEmail && password === hardcodedPassword) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        // Reset everything
        setEmail("");
        setPassword("");
        setUserCaptcha("");
        setCaptcha(generateCaptcha());
        setError(false);
        setCaptchaError("");
        navigate("/dashboard");
      } else {
        setError({
          emailValid: true,
          passwordErrors: ["Incorrect email or password."],
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-10 col-md-8 col-lg-5">
          <div className="border rounded p-4 shadow-pink">
            <h3 className="text-center fw-bold mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {error && error.emailValid === false && (
                  <p style={{ color: "red" }}>Invalid email address.</p>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="d-flex">
                  <input
                    type={visible ? "text" : "password"}
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setVisible((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {visible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eye-slash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                      </svg>
                    )}
                  </button>
                </div>
                {error &&
                  error.passwordErrors &&
                  error.passwordErrors.map((err, index) => (
                    <p key={index} style={{ color: "red" }}>
                      {err}
                    </p>
                  ))}
              </div>

              <div className="mb-3">
                <label className="form-label">CAPTCHA</label>

                <div className="d-flex align-items-center mb-2">
                  <div className="bg-light border rounded px-3 py-2 me-2 fw-bold fs-4 font-monospace">
                    {captcha}
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={refreshCaptcha}
                  >
                    ↻ Refresh
                  </button>
                </div>

                <input
                  type="text"
                  className="form-control"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                />

                {captchaError && (
                  <div className="form-text text-danger">{captchaError}</div>
                )}
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="btn pink-button text-white w-100"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
