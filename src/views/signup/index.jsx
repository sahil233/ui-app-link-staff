import React from "react";
import { func, array } from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Link, withRouter } from "react-router-dom";
import Select from 'react-select';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { showSuccessMsg } from '../../utils/notification';


/**
 *  Import other dependencies
 */
import { registerUser, getEducationInstitute } from '../../modules/auth/actions';
import { getEducationInstituteList } from '../../modules/auth/selectors';

const signupSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Required'),
  lastName: Yup.string()
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  confirmEmail: Yup.string()
    .email('Invalid email')
    .required('Required')
    .oneOf([Yup.ref('email'), null], "Email must match"),
  student: Yup.string()
    .required('Reuired'),
  place: Yup.string()
    .required('Reuired'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], "Password must match"),
});

const formattedArray = array => {
  return array.map(item => {
    return {
      label: item.attributes.name,
      value: item.id
    };
  });
};

const customStyles = {
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  }),
  placeholder: () => ({
    color: 'inherit',
  }),
  singleValue: () => ({
    color: 'inherit',
  }),
};

const formSelect = props => {
  const { form, options } = props;
  return (
    <Select
      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
      className="form-control"
      isSearchable={true}
      placeholder="Place of Education"
      onChange={value => {
        form.setFieldValue('place', value.value)
      }} 
      styles={customStyles}
      options={formattedArray(options)}
    />
  )
};

class Register extends React.Component {
  componentWillMount() {
    this.props.getEducationInstitute();
  }

  signupUser = (values, { setSubmitting }) => {
    const { registerUser, history } = this.props;
    registerUser(values).then(res => {
      const { message } = res;
      showSuccessMsg(message);
      setSubmitting(false);
      if (history) {
        history.push('/auth/login');
      }
    }, err => {
      setSubmitting(false);
    });
  };

  render() {
    const { instituteList } = this.props;
    return (
      <>
        <h2>Setup <br />an Account!</h2>
        <span className="border-line">&nbsp;</span>
        <p className="w-75">To stay in touch with us. Please sign up to your Workforce Solutions account.</p>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            student: '',
            place: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={signupSchema}
          onSubmit={this.signupUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="row">
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="text" name="firstName" className="form-control" placeholder="First Name" />
                    <i className="far fa-user"></i>
                  </div>
                  <ErrorMessage name="firstName" component="div" className="error-msg" />
                </div>
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="text" name="lastName" className="form-control" placeholder="Last Name" />
                    <i className="far fa-user"></i>
                  </div>
                  <ErrorMessage name="lastName" component="div" className="error-msg" />
                </div>    
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="email" name="email" className="form-control" placeholder="Email" />
                    <i className="far fa-envelope"></i>
                  </div>
                  <ErrorMessage name="email" component="div" className="error-msg" />
                </div>
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="email" name="confirmEmail" className="form-control" placeholder="Confirm Email" />
                    <i className="far fa-envelope"></i>
                  </div>
                  <ErrorMessage name="confirmEmail" component="div" className="error-msg" />
                </div>
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="text" name="student" className="form-control" placeholder="Student#" />
                    <i className="far fa-address-card"></i>
                  </div>
                  <ErrorMessage name="student" component="div" className="error-msg" />
                </div>
                <div className="col-md-6">
                  <div className="field-group">
                    <Field as="select" name="place" component={formSelect} options={instituteList} />
                    <i className="fas fa-school"></i>
                  </div>
                  <ErrorMessage name="place" component="div" className="error-msg" />
                </div>
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="password" name="password" className="form-control" placeholder="Password" />
                    <i className="fas fa-lock"></i>
                  </div>
                  <ErrorMessage name="password" component="div" className="error-msg" />
                </div>
                <div className="col-md-6">
                  <div className="field-group">
                    <Field type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" />
                    <i className="fas fa-lock"></i>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="error-msg" />
                </div>
              </div>
              <p className="mt-3 mb-0">By clicking on signup you agreed to linkStaff user agreement. Privacy and Cookies Policy.</p>
              <button type="submit" className="btn login-btn" disabled={isSubmitting}>
                { 
                  isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-2"></span>
                )}
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
        <p className="create-staff-link mb-0">Already have an account? <Link to="/auth/login">Login</Link></p>
      </>
    );
  }
}

/**
 *  Define component PropTypes
 */
Register.propTypes = {
  getEducationInstitute: func.isRequired,
  instituteList: array.isRequired,
  registerUser: func.isRequired,
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  instituteList: getEducationInstituteList()
});

export default connect(
  mapStateToProps,
  {
    registerUser,
    getEducationInstitute
  }
)(withRouter(Register));
