import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment"; // Used for formatting date

import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  handleDeleteClick(education_id) {
    this.props.deleteEducation(education_id);
  }

  render() {
    const education = this.props.education.map(eduItem => (
      <tr key={eduItem._id}>
        <td>{eduItem.school}</td>
        <td>{eduItem.degree}</td>
        <td>{eduItem.fieldofstudy}</td>
        <td>
          <Moment format="DD/MM/YYYY">{eduItem.from}</Moment> -
          {eduItem.to === undefined ? (
            " Now"
          ) : (
            <Moment format="DD/MM/YYYY">{eduItem.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.handleDeleteClick.bind(this, eduItem._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field Of Study</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
