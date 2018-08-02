import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

import isEmpty from "../../validation/is-empty";

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;

    const expItems = experience.map(expItem => (
      <li key={expItem._id} className="list-group-item">
        <h4>{expItem.company}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{expItem.from}</Moment>
          -
          {expItem.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{expItem.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong> {expItem.title}
        </p>
        <p>
          {isEmpty(expItem.location) ? null : (
            <span>
              <strong>Location: </strong> {expItem.location}
            </span>
          )}
        </p>
        <p>
          {isEmpty(expItem.description) ? null : (
            <span>
              <strong>Description: </strong> {expItem.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(eduItem => (
      <li key={eduItem._id} className="list-group-item">
        <h4>{eduItem.school}</h4>
        <p>
          <Moment format="DD/MM/YYYY">{eduItem.from}</Moment>
          -
          {eduItem.to === null ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{eduItem.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong> {eduItem.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong> {eduItem.fieldofstudy}
        </p>
        <p>
          {isEmpty(eduItem.description) ? null : (
            <span>
              <strong>Description: </strong> {eduItem.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  education: PropTypes.array.isRequired,
  experience: PropTypes.array.isRequired
};

export default ProfileCreds;
