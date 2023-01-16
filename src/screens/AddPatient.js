import React from 'react';
import { useState } from 'react';
// import { Button } from 'react-bootstrap';
import { addPtients, reset } from '../reducers/patientSlice';
import { useDispatch, useSelector } from 'react-redux';

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
export default function AddPatient() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [description, setDescription] = useState('');
  const [firstVisit, setFirstVisit] = useState('');
  const [recurringvisit, setRecurringVisit] = useState('');

  const [isPatient, setIsPatient] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      email,
      firstName,
      phoneNumber,
      lastName,
      age,
      gender,
      address,
      description,
      occupation,
      firstVisit,
      recurringvisit,
      isPatient,
      createdBy
    );
    dispatch(
      addPtients({
        email,
        firstName,
        phoneNumber,
        lastName,
        age,
        gender,
        address,
        description,
        occupation,
        firstVisit,
        recurringvisit,
        isPatient,
        createdBy,
      })
    );
    setFirstName('');
    setLastName('');
    setAge('');
    setEmail('');
    setDescription('');
    setGender('');
    setOccupation('');
    setPhoneNumber('');
    setAddress('');
    setFirstVisit('');
    setRecurringVisit('');
  };

  return (
    <h>add patient</h>
    // <Container className="p-4">
    //   <Form onSubmit={handleSubmit}>
    //     <Row>
    //       <Col lg="8">
    //         <Row>
    //           <Col lg="4">
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>First Name</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setFirstName(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>Address</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setAddress(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group controlId="form.Email">
    //               <Form.Label>Email address</Form.Label>
    //               <Form.Control
    //                 type="email"
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>Occupation</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setOccupation(e.target.value)}
    //               />
    //             </Form.Group>
    //           </Col>

    //           <Col lg="4">
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>Last Name</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setLastName(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>Phone Number</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setPhoneNumber(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>Age</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setAge(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group controlId="form.Name">
    //               <Form.Label>Gender</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 onChange={(e) => setGender(e.target.value)}
    //               />
    //             </Form.Group>
    //           </Col>
    //         </Row>
    //       </Col>

    //       <Col lg="4">
    //         <Form.Group className="mb-3">
    //           <Form.Check
    //             type="radio"
    //             name="visit"
    //             value="true"
    //             label="First visit"
    //             onChange={(e) => setFirstVisit(e.target.value)}
    //           />
    //           <Form.Check
    //             type="radio"
    //             name="visit"
    //             value="true"
    //             label="Recurring visit"
    //             onChange={(e) => setRecurringVisit(e.target.value)}
    //           />
    //         </Form.Group>
    //       </Col>
    //     </Row>

    //     <Form.Group controlId="form.Textarea">
    //       <Form.Label>Health problem description</Form.Label>
    //       <Form.Control
    //         as="textarea"
    //         rows={4}
    //         onChange={(e) => setDescription(e.target.value)}
    //       />
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //       Submit
    //     </Button>
    //   </Form>
    // </Container>
  );
}
