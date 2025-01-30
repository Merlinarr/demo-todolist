import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import TodoItem from "./TodoItem";
import type { Todo } from "../../common/types";
import todoService from "../../api/services/todoService";

export default function TodoList(): JSX.Element {
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const response = await todoService.getTodos();
      setTodos(response);
    } catch (error) {
      console.error('Failed to load todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (): Promise<void> => {
    if (newTodo.trim()) {
      try {
        await todoService.createTodo({
          title: newTodo,
          completed: false
        });
        loadTodos();
        setNewTodo("");
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  const handleToggleTodo = async (id: string): Promise<void> => {
    const todo = todos.find(t => t._id === id);
    if (todo) {
      try {
        await todoService.updateTodo(todo._id, {
          completed: !todo.completed
        });
        loadTodos();
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    }
  };

  const handleDeleteTodo = async (id: string): Promise<void> => {
    try {
      await todoService.deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleEditTodo = async (id: string, newTitle: string): Promise<void> => {
    try {
      await todoService.updateTodo(id, { title: newTitle });
      loadTodos();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <TextField
          data-test="todo-input"
          fullWidth
          value={newTodo}
          onChange={(e): void => setNewTodo(e.target.value)}
          onKeyPress={(e): void => {
            if (e.key === "Enter") handleAddTodo();
          }}
          placeholder="Add new mission task"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "30px",
              height: "48px",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
                boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.5)",
              },
            },
          }}
        />
        <IconButton
          data-test="add-button"
          onClick={handleAddTodo}
          sx={{
            width: "48px",
            height: "48px",
            backgroundColor: "white",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <TableContainer
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                "& th": {
                  color: "rgba(0, 0, 0, 0.7)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  borderBottom: "none",
                  py: 2,
                },
              }}
            >
              <TableCell padding="checkbox" width="48px">
                Status
              </TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell align="right" width="120px">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">
                    No tasks yet. Add your first mission task!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onToggle={() => handleToggleTodo(todo._id)}
                  onDelete={() => handleDeleteTodo(todo._id)}
                  onEdit={(_,newTitle) => handleEditTodo(todo._id, newTitle)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 