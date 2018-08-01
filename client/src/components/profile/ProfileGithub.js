import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientID: "6863277a673fcc648ee4",
      clientSecret: "558fd9d6f81034acba7ac426945667a98005b7e7",
      count: 2,
      sort: "created: asc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientID, clientSecret, count, sort } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`
    )
      .then(res => res.json()) // With fetch we get a response that we need to map with json
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { repos } = this.state;
    console.log(repos);

    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repositories</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;

// Warning: Can't call setState (or forceUpdate) on an unmounted component.
// If this error pops up in console use: "ref"
