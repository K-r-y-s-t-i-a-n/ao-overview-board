import Login from '../login';
import axiosClient from '../../axios';
import { Button } from '@mantine/core';

const CommNotes = () => {
  const getUser = async () => {
    const user = await axiosClient.get('/v1/user');
    console.log(user);
  };

  const logout = async () => {
    await axiosClient.post('/logout');
    console.log('LOGGED OUT');
  };

  return (
    <>
      CommNotes
      <Login />
      <Button onClick={getUser}>GET USER</Button>
      <Button onClick={logout}>LOGOUT</Button>
    </>
  );
};

export default CommNotes;
