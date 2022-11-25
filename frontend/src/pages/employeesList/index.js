import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useEmployees } from "../../context/employeesContext";
import ActivityIndicator from "../../components/activityIndicator";

export default function EmployeeChip({
  data,
  handleEditEmployee,
  handleDeleteEmployee,
}) {
  const { name, age, address, email, photo } = data;
  const { employeeLoader } = useEmployees();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {name ? Array.from(name)[0].toUpperCase() : "A"}
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        component="img"
        height="194"
        image={
          photo ||
          "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg"
        }
        alt="Machine Image"
      />
      <CardContent>
        <Typography paragraph>Email:{email}</Typography>
        <Typography paragraph>Age:{age}</Typography>
        <Typography paragraph>Address:{address}</Typography>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
      >
        <Button variant="contained" onClick={() => handleEditEmployee(data)}>
          Edit
        </Button>
        <Button
          variant="contained"
          onClick={() => handleDeleteEmployee(data._id)}
        >
          {employeeLoader ? <ActivityIndicator /> : "Delete"}
        </Button>
      </CardActions>
    </Card>
  );
}
