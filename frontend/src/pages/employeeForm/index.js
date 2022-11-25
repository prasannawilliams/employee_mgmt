/* eslint-disable no-unused-vars */
import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Box, Button, Grid, TextField } from "@mui/material";
import "./index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UploadButton from "../../components/uploadButton";
import ActivityIndicator from "../../components/activityIndicator";
import { useEmployees } from "../../context/employeesContext";

const myHelper = {
  email: {
    required: "Email is Required",
    pattern: "Invalid Email Address",
  },
  name: {
    required: "Name is Required",
    pattern: "Name should contain Alphabets and spaces",
  },
  age: {
    required: "Age is Required",
    pattern: "Age should be a number",
  },
  address: {
    required: "Address is Required",
    pattern: "Invalid Address",
  },
};

export default function App(props) {
  const {
    createEmployee,
    employeeLoader,
    selectedEmployeeToEdit,
    updateEmployee,
  } = useEmployees();

  const [dob, setDob] = React.useState(selectedEmployeeToEdit && selectedEmployeeToEdit?.date_of_birth ? new Date(selectedEmployeeToEdit?.date_of_birth) : new Date());
  const [photo, setPhoto] = React.useState(null);

  const { control, handleSubmit } = useForm({
    reValidateMode: "onBlur",
  });

  const { append: appendMemberRow, remove: removeMemberRow } = useFieldArray({
    control,
  });

  const handleOnSubmit = async (evt) => {
    const finalData = {
      name: evt.name,
      age: evt.age,
      address: evt.address,
      email: evt.email,
      date_of_birth: dob,
      photo: photo,
    };
    selectedEmployeeToEdit
      ? await updateEmployee(selectedEmployeeToEdit._id, finalData)
      : await createEmployee(finalData);
  };

  return (
    <div className="App">
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="name"
              defaultValue={selectedEmployeeToEdit?.name || null}
              rules={{
                required: true,
                pattern: /^[a-zA-Z ]*$/,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="name"
                  fullWidth
                  label="name"
                  error={error !== undefined}
                  helperText={error ? myHelper.name[error.type] : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="email"
              defaultValue={selectedEmployeeToEdit?.email || null}
              rules={{
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="email"
                  fullWidth
                  label="Email"
                  error={error !== undefined}
                  helperText={error ? myHelper.email[error.type] : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="age"
              defaultValue={selectedEmployeeToEdit?.age || null}
              rules={{
                required: true,
                pattern: /^\d+$/,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="age"
                  fullWidth
                  label="age"
                  error={error !== undefined}
                  helperText={error ? myHelper.age[error.type] : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              control={control}
              name="address"
              defaultValue={selectedEmployeeToEdit?.address || ""}
              rules={{
                required: false,
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="address"
                  fullWidth
                  label="address"
                  error={error !== undefined}
                  helperText={error ? myHelper.address[error.type] : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              selected={dob}
              onChange={(date) => setDob(date)}
              defaultValue={selectedEmployeeToEdit?.date_of_birth}
              value={dob}
            />
          </Grid>
          <Grid item xs={6}>
            <UploadButton text="Upload Image" onChange={(e) => setPhoto(e)} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit">
              {employeeLoader ? <ActivityIndicator /> : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
