import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, updateTask } from '../features/tasks/tasksSlice';
import { TextField, Button } from '@mui/material';

const TaskForm = ({ task = null, onCancel }) => {
  const dispatch = useDispatch();


  const [title, setName] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');

  useEffect(() => {
    if (task) {
      setName(task.title);
      setDescription(task.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [task]);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (task && task.id) {
      dispatch(updateTask({ id: task.id, title, description }));
    } else {
      dispatch(addTask({ title, description }));
    }

    setName('');
    setDescription('');
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        {task && task.id ? 'Update Task' : 'Add Task'}
      </Button>
      {task && task.id && (
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
      )}
    </form>
  );
};

export default TaskForm;