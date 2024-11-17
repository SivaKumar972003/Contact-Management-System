import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import axios from "axios";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/contacts")
            .then((response) => setContacts(response.data))
            .catch((err) => console.error(err));
    }, []);

    const deleteContact = (id) => {
        axios.delete(`http://localhost:5000/contacts/${id}`)
            .then(() => setContacts(contacts.filter(contact => contact._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((contact) => (
                        <TableRow key={contact._id}>
                            <TableCell>{contact.firstName}</TableCell>
                            <TableCell>{contact.lastName}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" href={`/edit/${contact._id}`}>Edit</Button>
                                <Button variant="contained" color="secondary" onClick={() => deleteContact(contact._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ContactList;
