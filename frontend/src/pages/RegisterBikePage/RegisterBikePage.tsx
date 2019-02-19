import { Formik } from 'formik';
import * as React from 'react';

import { IBike } from '../../types/bike';

interface IState {
  form: any;
  error: any;
}

const INITIAL_FORM: IBike = {
  accessories: '',
  color: '',
  description: '',
  id: '',
  make: '',
  model: '',
  ownerId: '',
  purchaseDate: '',
  serial: '',
  status: 0,
}

class RegisterBikePage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      error: null,
      form: INITIAL_FORM,
    };
  }

  public render() {
    return (
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        <h1>Register a new bike</h1>
        <Formik
          initialValues={this.state.form}
          validate={this.validateForm}
          onSubmit={this.handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="serial"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.serial}
              />
              {errors.errors && touched.email && errors.email}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </main>
    );
  }

  public handleSubmit = (values: IBike) => {
    console.info(values);
    // setSubmitting(false);
    
  }

  private validateForm = (values: IBike) => {
    // values => {
    //   let errors = {};
    //   if (!values.email) {
    //     errors.email = 'Required';
    //   } else if (
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    //   ) {
    //     errors.email = 'Invalid email address';
    //   }
    //   return errors;
    // }
    // return true;
  }

}

export default RegisterBikePage;
