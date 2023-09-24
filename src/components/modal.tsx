import React, { useEffect, useState } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useAppDispatch, useAppSelector } from "../hooks/useFetchData";
import { editUser } from "../Slices/userSlice";

type EditUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleSave = async () => {
    const userData = {
      name,
      url,
    };

    console.log(userData);
    dispatch(editUser({ userId, userData }));
    onClose();
  };

  useEffect(() => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setName(user.name);
      setUrl(user.url);
      return;
    }
    return;
  }, [userId]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <h2 id="modal-title">Edit User</h2>
        <TextField
          label="Nome"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Email"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Box display={"flex"} justifyContent={"center"} gap={4} py={2}>
          <Button
            startIcon={<SaveAsIcon />}
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            Save
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
