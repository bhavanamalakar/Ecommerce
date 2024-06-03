import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";

function GeneralSettings() {
  const [fileInput, setFileInput] = useState("");

  const handleFileInputChange = (e) => {
    setFileInput(e.target.value);
  };

  return (
    <div className="tab-pane fade active show" id="account-general">
      <div className="card-body media align-items-center">
        <img
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt="Avatar"
          className="d-block ui-w-80"
        />
        <div className="media-body ml-4">
          <label className="btn btn-outline-primary">
            Upload new photo
            <input
              type="file"
              className="account-settings-fileinput"
              value={fileInput}
              onChange={handleFileInputChange}
            />
          </label>{" "}
          &nbsp;
          <button type="button" className="btn btn-default md-btn-flat">
            Reset
          </button>
          <div className="text-light small mt-1">
            Allowed JPG, GIF or PNG. Max size of 800K
          </div>
        </div>
      </div>
      <hr className="border-light m-0" />
      <div className="card-body">
        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text" className="form-control mb-1" />
        </div>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input type="text" className="form-control mb-1" />
          <div className="alert alert-warning mt-3">
            Your email is not confirmed. Please check your inbox.
            <br />
            <a href="javascript:void(0)">Resend confirmation</a>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Company</label>
          <input type="text" className="form-control" />
        </div>
      </div>
    </div>
  );
}

// function ChangePasswordSettings() {
//     return (

//     );
// }

function InfoSettings() {
  return (
    <div className="tab-pane fade" id="account-info">
      {/* Content for Info tab */}
    </div>
  );
}

function SocialLinksSettings() {
  return (
    <div className="tab-pane fade" id="account-social-links">
      {/* Content for Social Links tab */}
    </div>
  );
}

function ConnectionsSettings() {
  return (
    <div className="tab-pane fade" id="account-connections">
      {/* Content for Connections tab */}
    </div>
  );
}

function NotificationsSettings() {
  return (
    <div className="tab-pane fade" id="account-notifications">
      {/* Content for Notifications tab */}
    </div>
  );
}

function UserProfile() {
  const [userData, setUserData] = useState("");
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  useEffect(() => {
    if (username && password) {
      axios
        .get(`"http://localhost:8000/api/user-profile/${username}`, {
          auth: {
            username: username,
            password: password,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  }, [username, password]);

  return (
    <div className="container light-style flex-grow-1 container-p-y">
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="card overflow-hidden">
        <div className="row no-gutters row-bordered row-border-light">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className="list-group-item list-group-item-action active"
                data-toggle="list"
                href="#account-general"
              >
                General
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-change-password"
              >
                Change password
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-info"
              >
                Info
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-social-links"
              >
                Social links
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-connections"
              >
                Connections
              </a>
              <a
                className="list-group-item list-group-item-action"
                data-toggle="list"
                href="#account-notifications"
              >
                Notifications
              </a>
            </div>
          </div>
          <div className="col-md-9">
            <div className="tab-content">
              <GeneralSettings userData={userData} />
              <Link href="/registration/Password_change" legacyBehavior>
                <a>Signin</a>
              </Link>
              <InfoSettings />
              <SocialLinksSettings />
              <ConnectionsSettings />
              <NotificationsSettings />
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-3">
        <button type="button" className="btn btn-primary">
          Save changes
        </button>
        &nbsp;
        <button type="button" className="btn btn-default">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
