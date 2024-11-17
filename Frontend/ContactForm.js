import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";

const ContactForm = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/contacts", form)
            .then(() => alert("Contact added!"))
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}><TextField name="firstName" label="First Name" fullWidth onChange={handleChange} /></Grid>
                <Grid item xs={6}><TextField name="lastName" label="Last Name" fullWidth onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField name="email" label="Email" fullWidth onChange={handleChange} /></Grid>
                <Grid item xs={6}><TextField name="phone" label="Phone" fullWidth onChange={handleChange} /></Grid>
                <Grid item xs={6}><TextField name="company" label="Company" fullWidth onChange={handleChange} /></Grid>
                <Grid item xs={12}><TextField name="jobTitle" label="Job Title" fullWidth onChange={handleChange} /></Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ContactForm;
