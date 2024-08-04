import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask } from '../features/tasks/tasksSlice';
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({onEdit,onReset}) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    onReset();
  };

  let content;
  if (taskStatus === 'loading') {
    content = <div>Loading...</div>;
  } else  {
    content = (
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.title} secondary={task.description} />
            <IconButton edge="end" onClick={() => handleDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton edge="end" onClick={() => onEdit(task)}>
            <span role="img" aria-label="edit">✏️</span>
          </IconButton>
          </ListItem>
        ))}
      </List>
    );
  } 

  return <div>{content}</div>;
};

export default TaskList;