import { FormikProps, FormikErrors, withFormik, Form, Field } from 'formik';
import * as React from 'react';

import { IBike, BIKE_STATUS } from '../../types/bike';

interface IState {
  form: IBike;
  error: any;
}

const INNER_FORM = (props: FormikProps<IBike>) => {
  const { touched, errors, isSubmitting } = props;

  return (
    <Form style={{display: 'flex', flexDirection: 'column' }}>
      <Field type="input" name="make" />
      {touched.make && errors.make && <div>{errors.make}</div>}

      <Field type="input" name="model" />
      {touched.model && errors.model && <div>{errors.model}</div>}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
}

const RegisterForm = withFormik<IBike, IBike>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      accessories: props.accessories || '',
      color: props.color || '',
      description: props.description || '',
      id: props.id || '',
      make: props.make || '',
      model: props.model || '',
      ownerId: props.ownerId || '',
      purchaseDate: props.purchaseDate || '',
      serial: props.serial || '',
      status: props.status || BIKE_STATUS.IN_POSSESSION,
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: IBike) => {
    let errors: FormikErrors<IBike> = {};
    if (!values.make || !values.make.length) {
      errors.make = 'Required';
    }
    return errors;
  },

  handleSubmit: values => {
    console.log(values);
    
    // do submitting things
  },
})(INNER_FORM);

const INITIAL_FORM: IBike = {
  accessories: '',
  color: '',
  description: '',
  id: '',
  make: 'test',
  model: '',
  ownerId: '',
  purchaseDate: '',
  serial: '',
  status: BIKE_STATUS.IN_POSSESSION,
}

class RegisterBikePage extends React.Component<{}, IState> {

  readonly state: IState = {
    error: null,
    form: INITIAL_FORM,
  };

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
        <RegisterForm id="" serial="" status={0} />
      </main>
    );
  }

  public handleSubmit = (values: IBike) => {
    console.info(values);
    // setSubmitting(false);
    
  }

  // private validateForm = (values: IBike) => {
  //   // values => {
  //   //   let errors = {};
  //   //   if (!values.email) {
  //   //     errors.email = 'Required';
  //   //   } else if (
  //   //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  //   //   ) {
  //   //     errors.email = 'Invalid email address';
  //   //   }
  //   //   return errors;
  //   // }
  //   // return true;
  // }

}

export default RegisterBikePage;
