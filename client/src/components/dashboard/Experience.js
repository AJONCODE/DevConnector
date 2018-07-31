import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment"; // Used for formatting date

import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  handleDeleteClick(experience_id) {
    this.props.deleteExperience(experience_id);
  }

  render() {
    const experience = this.props.experience.map(expItem => (
      <tr key={expItem._id}>
        <td>{expItem.company}</td>
        <td>{expItem.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{expItem.from}</Moment> -
          {expItem.to === undefined ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{expItem.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.handleDeleteClick.bind(this, expItem._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
