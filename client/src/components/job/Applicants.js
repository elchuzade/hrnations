import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApplicants } from '../../actions/jobActions';

class Applicants extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getApplicants();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { applicants, loading } = this.props.applicants;
    let spinner = null;
    if (applicants === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <div>
        {spinner}
        {!spinner && isAuthenticated && (
          <div className="container">
            <div className="row">
              <table className="table table-sm table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>job</th>
                    <th>name</th>
                    <th>email</th>
                    <th>linkedin</th>
                    <th>note</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants &&
                    applicants.length > 0 &&
                    applicants.map(applicant => (
                      <tr ket={applicant._id}>
                        <td>{applicant.job}</td>
                        <td>{applicant.name}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.linkedin}</td>
                        <td>{applicant.note}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Applicants.propTypes = {
  applicants: PropTypes.object.isRequired,
  getApplicants: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  applicants: state.applicants
});

export default connect(mapStateToProps, { getApplicants })(Applicants);
