
import './App.css';

import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Container, Typography, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const resetForm = () => {
    setEditingTask(null);
  };



  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Task Manager
      </Typography>
      <TaskForm task={editingTask} onCancel={resetForm}/>
      <TaskList onEdit={handleEdit} onReset = {resetForm}/>
      <ToastContainer />
    </Container>
  );
}

export default App;
