import { FormikProps, FormikErrors, withFormik, Form } from 'formik';
import * as React from 'react';
import { Paper, TextField } from '@material-ui/core';

import { Bike, BikeStatus } from '../../types/bike';

interface IState {
  form: Bike;
  error: any;
}

const INNER_FORM = (props: FormikProps<Bike>) => {
  const { touched, errors, isSubmitting, handleChange } = props;

  return (
    <Form style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Make */}
      <TextField
        id="make"
        name="make"
        error={touched.make && errors.make ? true : false}
        label="Make(required)"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
      {/* Model */}
      <TextField
        id="model"
        name="model"
        label="Model"
        margin="normal"
        variant="outlined"
        onChange={handleChange}
      />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

const RegisterForm = withFormik<Bike, Bike>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
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
      status: props.status || BikeStatus.InPossession,
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: Bike) => {
    let errors: FormikErrors<Bike> = {};
    errors.make = !values.make || !values.make.length ? 'Required' : undefined;
    return errors;
  },

  handleSubmit: (values) => {
    console.log(values);

    // do submitting things
  },
})(INNER_FORM);

const INITIAL_FORM: Bike = {
  accessories: '',
  color: '',
  description: '',
  id: '',
  make: 'test',
  model: '',
  ownerId: '',
  purchaseDate: '',
  serial: '',
  status: BikeStatus.InPossession,
};

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
        <Paper style={{ padding: 16 }}>
          <h3>Register a new bike</h3>
          <RegisterForm id="" serial="" status={0} />
        </Paper>
      </main>
    );
  }

  public handleSubmit = (values: Bike) => {
    console.info(values);
    // setSubmitting(false);
  };

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
