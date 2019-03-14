import { FormikProps, Formik, FormikActions } from 'formik';
import * as React from 'react';
import { Paper, TextField } from '@material-ui/core';

import { Bike, BikeStatus, BIKE_VALIDATION_SCHEMA } from '../../types/bike';

interface IState {
  form: Bike;
  error: any;
}

const INITIAL_FORM: Bike = {
  accessories: '',
  color: '',
  description: '',
  id: '',
  make: '',
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

  private handleSubmit = (values: Bike, actions: FormikActions<Bike>) => {
    console.log('values, actions', values, actions);
  };

  private createFormikForm = (props: FormikProps<Bike>) => {
    console.log(props);
    return (
      <form onSubmit={props.handleSubmit}>
        <TextField
          id="serial"
          name="serial"
          error={props.touched.serial && props.errors.serial ? true : false}
          label={props.errors.serial || 'Serial(required)'}
          margin="normal"
          variant="outlined"
          value={props.values.serial}
          onChange={props.handleChange}
        />
        <TextField
          id="make"
          name="make"
          error={props.touched.make && props.errors.make ? true : false}
          label={props.errors.make || 'Make(required)'}
          margin="normal"
          variant="outlined"
          value={props.values.make}
          onChange={props.handleChange}
        />
        <TextField
          id="purchaseDate"
          type="date"
          error={props.touched.purchaseDate && props.errors.purchaseDate ? true : false}
          label={props.errors.purchaseDate || 'Purchase date'}
          onChange={props.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <button role="submit">Submit</button>
      </form>
    );
  };

  private getRegisterForm = () => {
    return (
      <Formik
        initialValues={this.state.form}
        onSubmit={this.handleSubmit}
        render={this.createFormikForm}
        validationSchema={BIKE_VALIDATION_SCHEMA}
      />
    );
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
          {this.getRegisterForm()}
        </Paper>
      </main>
    );
  }
}

export default RegisterBikePage;
