import React from "react";
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link, withRouter } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { showSuccessMsg } from '../../utils/notification';

/**
 *  Import other dependencies
 */
import { login } from '../../modules/auth/actions';
// import * as selectors from './../../modules/KWLibrary/selectors'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

class Login extends React.Component {
  loginUser = (values, { setSubmitting }) => {
    const { login, history } = this.props;
    const { email, password } = values;
    login(email, password).then(res => {
      showSuccessMsg('Login successfully');
      setSubmitting(false);
      if (history) {
        history.push('/user/user-profile');
      }
    }, err => {
      setSubmitting(false);
    });
  };

  render() {
    return (
      <>
        <h2>Hello, <br />Welcome back!</h2>
        <span className="border-line">&nbsp;</span>
        <p className="w-75">To stay in touch with us. Please login to your Workforce Solutions account.</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={this.loginUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="field-group">
                <Field type="email" name="email" className="form-control" placeholder="name@example.com" />
                <i className="far fa-user"></i>
              </div>
              <ErrorMessage name="email" component="div" className="error-msg" />
              <div className="field-group">
                <Field type="password" name="password" className="form-control" placeholder="Password" />
                <i className="fas fa-lock"></i>
              </div>
              <ErrorMessage name="password" component="div" className="error-msg" />
              <div className="d-flex align-items-center justify-content-between">
                <div className="custom-control custom-checkbox my-1 mr-sm-2">
                    <input type="checkbox" className="custom-control-input" id="customControlInline" />
                    <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                </div>
                <Link to="/auth/register" className="forgot-password">Forgot Password?</Link>
              </div>
              <button type="submit" className="btn login-btn" disabled={isSubmitting}>
                { 
                  isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                )}
                Login
              </button>
            </Form>
          )}
        </Formik>
        
        <Link to="/auth/register" className="create-staff-link">
          Create a link Staff account
        </Link>
        <div className="bottom-link">
            <a href="faq.html">FAQs</a>
            <span className="mx-1">&#8226;</span>
            <a href="contact.html">Contact Us</a>
        </div>
      </>
    );
  }
}

/**
 *  Define component PropTypes
 */
Login.propTypes = {
  login: func.isRequired,
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({});

export default connect(
  mapStateToProps,
  {
    login
  }
)(withRouter(Login));
