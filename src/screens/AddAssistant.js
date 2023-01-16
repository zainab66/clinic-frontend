import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, reset } from '../reducers/assistantSlice';
// import Form from 'react-bootstrap/Form';

// import Button from 'react-bootstrap/Button';
import { Route, Link, Routes, useParams } from 'react-router-dom';

export default function InviteUser() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Assistant');

  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, fullName, createdBy);

    dispatch(
      addUsers({
        email,
        fullName,
        role,
        createdBy,
      })
    );
  };

  const params = useParams();

  console.log(params.id); // 👉️ {userId: '4200'}

  return (
    <h>add assistant</h>
    // <Form onSubmit={handleSubmit}>
    //   <Form.Group className="mb-3" controlId="formBasicEmail">
    //     <Form.Label>Email address</Form.Label>
    //     <Form.Control
    //       type="email"
    //       placeholder="Enter email"
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </Form.Group>

    //   <Form.Group className="mb-3" controlId="formBasicPassword">
    //     <Form.Label>FullName</Form.Label>
    //     <Form.Control
    //       type="text"
    //       placeholder="FullName"
    //       onChange={(e) => setFullName(e.target.value)}
    //     />
    //   </Form.Group>

    //   <Button variant="primary" type="submit">
    //     Invite user
    //   </Button>
    // </Form>
  );
}
