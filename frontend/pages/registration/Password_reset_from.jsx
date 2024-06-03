import React, { useState } from "react";
import axios from "axios";
import Btn from "@/components/btn";
import Router from "next/router";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/password_reset/",
        {
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      alert("Password Changed Successfully");
      Router.push("/Password_reset_complete");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Unexpected Error occurred");
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>
        {`
          input {
            max-width: fit-content !important;
          }
          .background-radial-gradient {
            background-color: hsl(218, 41%, 15%);
            background-image: radial-gradient(650px circle at 0% 0%,
                    hsl(218, 41%, 35%) 15%,
                    hsl(218, 41%, 30%) 35%,
                    hsl(218, 41%, 20%) 75%,
                    hsl(218, 41%, 19%) 80%,
                    transparent 100%),
                radial-gradient(1250px circle at 100% 100%,
                    hsl(218, 41%, 45%) 15%,
                    hsl(218, 41%, 30%) 35%,
                    hsl(218, 41%, 20%) 75%,
                    hsl(218, 41%, 19%) 80%,
                    transparent 100%);
          }

          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }
        `}
      </style>

      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <form onSubmit={handleSubmit}>
          <div
            className="card text-center"
            style={{
              width: "auto",
              maxWidth: "fit-content",
              minWidth: "fit-content",
            }}
          >
            <div className="card-header h5 text-white bg-primary">
              Password Reset
            </div>
            <div className="card-body px-5">
              <p className="card-text py-2">
                Enter your email address and we will send you an email with
                instructions to reset your password.
              </p>
              <div className="form-outline">
                <label className="form-label" htmlFor="typeEmail">
                  Email
                </label>
                :
                <input
                  type="email"
                  id="email"
                  className="form-control mb-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control mb-3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
              )}

              <br />
              <button className="btn btn-primary w-100" type="submit">
                Reset password
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
