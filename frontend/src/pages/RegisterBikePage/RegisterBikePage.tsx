import { FormikProps, Formik, FormikActions } from 'formik';
import * as React from 'react';
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput,
  Button,
} from '@material-ui/core';

import { Bike, BikeStatus, BIKE_VALIDATION_SCHEMA, BIKE_STATUS_LABELS } from '../../types/bike';

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
    return (
      <form onSubmit={props.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
          variant="outlined"
          margin="normal"
          error={props.touched.purchaseDate && props.errors.purchaseDate ? true : false}
          label={props.errors.purchaseDate || 'Purchase date'}
          onChange={props.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl variant="outlined" margin="normal">
          <InputLabel shrink={true} htmlFor="age-native-label-placeholder">
            Status
          </InputLabel>
          <NativeSelect
            value={props.status}
            variant="outlined"
            onChange={props.handleChange}
            input={
              <OutlinedInput labelWidth={50} name="status" id="age-native-label-placeholder" />
            }
          >
            {Object.entries(BIKE_STATUS_LABELS).map((status) => (
              <option key={status[0]} value={status[0]}>
                {status[1]}
              </option>
            ))}
          </NativeSelect>
        </FormControl>

        <TextField
          id="color"
          name="color"
          label="Color"
          margin="normal"
          variant="outlined"
          value={props.values.color}
          onChange={props.handleChange}
        />

        <TextField
          id="description"
          name="description"
          label="Description"
          margin="normal"
          variant="outlined"
          value={props.values.description}
          onChange={props.handleChange}
        />

        <TextField
          id="accessories"
          name="accessories"
          label="Accessories"
          margin="normal"
          variant="outlined"
          value={props.values.accessories}
          onChange={props.handleChange}
        />
        <Button variant="contained" role="submit" type="submit">
          Submit
        </Button>
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
          alignItems: 'center',
        }}
      >
        <Paper style={{ padding: 16, width: 400 }}>
          <h3>Register a new bike</h3>
          {this.getRegisterForm()}
        </Paper>
      </main>
    );
  }
}

export default RegisterBikePage;
