import React, { useState } from 'react'

export default function LoginSignup() {
  const [activeTab, setActiveTab] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const togglePasswordVisibility = () => setShowPassword(!showPassword)

  const handlePasswordChange = (e) => {
    const password = e.target.value
    // Simple password strength calculation
    const strength = password.length > 8 ? (password.match(/[A-Z]/) ? (password.match(/[0-9]/) ? 3 : 2) : 1) : 0
    setPasswordStrength(strength)
  }

  return (
    <>
      <style jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      body{
       font-family: 'Poppins', sans-serif; 
         margin:0;
          padding:0;
      }
        .container {
          justify-content:center;
          display: flex;
          min-height: 100vh;
          background-color: #f3f4f6;
        }
        .formContainer {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 2rem;
        }
        .formWrapper {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .borderDesign {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border: 2px solid #3b82f6;
          border-radius: 12px;
          pointer-events: none;
        }
        .borderDesign::before,
        .borderDesign::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #3b82f6;
          border-radius: 50%;
        }
        .borderDesign::before {
          top: -10px;
          left: -10px;
        }
        .borderDesign::after {
          bottom: -10px;
          right: -10px;
        }
        .logo {
          display: block;
          height: 48px;
          margin: 0 auto 1.5rem;
        }
        .title {
          font-size: 1.875rem;
          font-weight: 800;
          text-align: center;
          color: #111827;
          margin-bottom: 2rem;
        }
        .tabs {
          display: flex;
          margin-bottom: 2rem;
        }
        .tabButton {
          flex: 1;
          padding: 0.75rem;
          background-color: transparent;
          border: none;
          border-bottom: 2px solid #e5e7eb;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .tabButton.active {
          color: #3b82f6;
          border-bottom-color: #3b82f6;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .formGroup {
          display: flex;
          flex-direction: column;
        }
        .label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        .input {
          padding: 0.625rem;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        .input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        .passwordWrapper {
          position: relative;
        }
        .passwordToggle {
          position: absolute;
          right: 0.625rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #6b7280;
        }
        .checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .checkboxInput {
          width: 1rem;
          height: 1rem;
        }
        .button {
          padding: 0.75rem 1rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #2563eb;
        }
        .link {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }
        .link:hover {
          text-decoration: underline;
        }
        .passwordStrength {
          height: 4px;
          background-color: #e5e7eb;
          border-radius: 2px;
          margin-top: 0.5rem;
        }
        .passwordStrengthIndicator {
          height: 100%;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .weak { width: 33.33%; background-color: #ef4444; }
        .medium { width: 66.66%; background-color: #f59e0b; }
        .strong { width: 100%; background-color: #10b981; }
        .imageContainer {
          display: none;
          flex: 1;
          position: relative;
        }
        .backgroundImage {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (min-width: 1024px) {
          .formContainer {
            flex: 0 1 600px;
          }
          .imageContainer {
            display: block;
          }
        }
      `}</style>
      <div className="container">
        <div className="formContainer">
          <div className="formWrapper">
           
            <h2 className="title">Welcome to ErrorSolver</h2>
            <div className="tabs">
              <button
                className={`tabButton ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`tabButton ${activeTab === 'signup' ? 'active' : ''}`}
                onClick={() => setActiveTab('signup')}
              >
                Sign Up
              </button>
            </div>
            {activeTab === 'login' ? (
              <form className="form">
                <div className="formGroup">
                  <label htmlFor="login-email" className="label">Email Address</label>
                  <input id="login-email" type="email" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="login-password" className="label">Password</label>
                  <div className="passwordWrapper">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="input"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="passwordToggle"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="login-company" className="label">Company Name (Optional)</label>
                  <input id="login-company" type="text" className="input" />
                </div>
                <div className="checkbox">
                  <input type="checkbox" id="remember-me" className="checkboxInput" />
                  <label htmlFor="remember-me" className="label">Remember me</label>
                </div>
                <button type="submit" className="button">Login</button>
                <div style={{ textAlign: 'center' }}>
                  <a href="#" className="link">Forgot your password?</a>
                </div>
              </form>
            ) : (
              <form className="form">
                <div className="formGroup">
                  <label htmlFor="signup-name" className="label">Full Name</label>
                  <input id="signup-name" type="text" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-email" className="label">Email Address</label>
                  <input id="signup-email" type="email" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-password" className="label">Password</label>
                  <div className="passwordWrapper">
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="input"
                      onChange={handlePasswordChange}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="passwordToggle"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <div className="passwordStrength">
                    <div
                      className={`passwordStrengthIndicator ${
                        passwordStrength === 1 ? 'weak' :
                        passwordStrength === 2 ? 'medium' :
                        passwordStrength === 3 ? 'strong' : ''
                      }`}
                    ></div>
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-confirm-password" className="label">Confirm Password</label>
                  <input id="signup-confirm-password" type="password" required className="input" />
                </div>
                <div className="formGroup">
                  <label htmlFor="signup-company" className="label">Company Name</label>
                  <input id="signup-company" type="text" required className="input" />
                </div>
                <button type="submit" className="button">Sign Up</button>
                <div style={{ textAlign: 'center' }}>
                  Already have an account?{" "}
                  <a href="#" className="link" onClick={() => setActiveTab('login')}>Log In</a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}