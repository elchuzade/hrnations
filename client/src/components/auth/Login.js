import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextInput from '../common/TextInput';
import Helmet from 'react-helmet';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;
    return (
      <section id="login">
        <Helmet>
          <style>{'footer { position: absolute; width: 100%; bottom: 0; }'}</style>
        </Helmet>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6 mx-auto">
              <div className="card">
                <div className="card-header p-0">
                  <div className="row text-center text-white mx-0">
                    <div className="col-6 bg-secondary p-0">
                      <p className="py-1 lead m-0">
                        <b>Sign In</b>
                      </p>
                    </div>
                    <div className="col-6 bg-light p-0">
                      <Link
                        to="/boss/register"
                        style={{ textDecoration: 'none' }}
                      >
                        <p id="signUpLink" className="py-1 lead m-0 text-muted">
                          <i>Sign Up</i>
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <TextInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                      />
                    </div>
                    <div className="form-group">
                      <TextInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary btn-block"
                    >
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
