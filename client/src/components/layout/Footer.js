import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <footer className="mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <span className="align-middle">HRNations</span>
            </div>
            <div className="col-8 text-right">
              <Link to="/" className="mx-2 align-middle">
                Jobs
              </Link>
              <span className="mx-2">
                <a target="__blank" href="https://linkedin.com/in/elchuzade">
                  <i className="fab fa-linkedin fa-2x align-middle"></i>
                </a>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <span>
                Copyright © {new Date().getFullYear()} HRNations. All rights
                reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(
  null,
  {}
)(withRouter(Footer));
