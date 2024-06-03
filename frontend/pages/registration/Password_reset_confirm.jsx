import React, { useState } from 'react';
import axios from 'axios';

const NewPassword = ({ validLink, form }) => {
  const [formData, setFormData] = useState(
    form.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/password_reset/confirm/',
        formData
      );
      setSuccessMessage('Password changed successfully!');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Unexpected error occurred');
      }
    }
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <style>
        {`
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
        <center>
          <div className="card text-center" style={{ width: 'auto', maxWidth: 'fit-content', minWidth: 'fit-content' }}>
            <div className="card-header h5 text-white bg-primary">New Password</div>
            {validLink ? (
              <form method="post" id="f2" onSubmit={handleSubmit}>
                <div className="card-body px-5">
                  <p className="card-text py-2">Enter your new password below.</p>
                  {form.map(field => (
                    <div className="form-outline" key={field.name}>
                      {field.errors}
                      <label className="form-label" htmlFor={field.name}>{field.label}</label>
                      <br />
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        className="form-control mb-3"
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                  {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  {successMessage && <div className="alert alert-success">{successMessage}</div>}
                  <br />
                  <button className="btn btn-primary w-100" type="submit">
                    Proceed
                  </button>
                </div>
              </form>
            ) : (
              <div className="card-body px-5">
                <p className="card-text py-2">The link is invalid or expired.</p>
              </div>
            )}
          </div>
        </center>
      </div>
    </section>
  );
};

export default NewPassword;
