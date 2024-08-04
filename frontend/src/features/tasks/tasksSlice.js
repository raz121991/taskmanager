import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify';

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://localhost:7273/api/tasks");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch tasks"
      );
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:7273/api/tasks",
        task
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to add a task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://localhost:7273/api/tasks/${task.id}`,
        task
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data  || "Failed to update a task"
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId,{rejectWithValue}) => {
    try{
        await axios.delete(`https://localhost:7273/api/tasks/${taskId}`);
        return taskId;
    }catch(error)
    {
        return rejectWithValue(error.response.data || "Failed to delete a task");
    }
    
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error("Failed to fetch tasks from the server");
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        toast.success("Added task successfully");
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        if(action.payload)
        {
          state.error = action.payload;
          toast.error(action.payload);
        }
        else
        {
          state.error = "Failed to add a new task";
          toast.error("Failed to add a new task due to server issues");
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
          toast.success("Updated task succesfully!");
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        toast.success("Deleted task succesfully!");
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(action.payload);
      });
  },
});

export default tasksSlice.reducer;
