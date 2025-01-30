import { useState } from "react";
import {
  IconButton,
  Checkbox,
  TextField,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import type { Todo } from "../../common/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps): JSX.Element {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  console.log(editedTitle)
  const handleSave = (): void => {
    console.log(editedTitle)
    onEdit(todo._id, editedTitle);
    setIsEditing(false);
  };

  return (
    <TableRow
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 1)",
          transform: "translateY(-2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
        transition: "all 0.2s ease",
        borderRadius: "16px",
        "& > td": {
          borderBottom: "none",
          padding: "16px",
          "&:first-of-type": {
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
          },
          "&:last-child": {
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
          },
        },
        mb: 2,
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          data-test="todo-checkbox"
          checked={todo.completed}
          onChange={(): void => onToggle(todo._id)}
          sx={{
            color: "primary.main",
            "&.Mui-checked": {
              color: "primary.main",
            },
          }}
        />
      </TableCell>
      <TableCell sx={{ width: "100%" }}>
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e): void => setEditedTitle(e.target.value)}
            onKeyPress={(e): void => {
              if (e.key === "Enter") handleSave();
            }}
            fullWidth
            variant="standard"
            autoFocus
            sx={{
              "& .MuiInput-root": {
                "&:before, &:after": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.87)",
              fontWeight: 500,
            }}
          >
            {todo.title}
          </span>
        )}
      </TableCell>
      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
        <IconButton
          data-test="edit-button"
          onClick={(): void => {
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          sx={{
            color: "primary.main",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
          }}
        >
          {isEditing ? <SaveIcon /> : <EditIcon />}
        </IconButton>
        <IconButton
          data-test="delete-button"
          onClick={(): void => onDelete(todo._id)}
          sx={{
            color: "error.main",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.04)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
} 