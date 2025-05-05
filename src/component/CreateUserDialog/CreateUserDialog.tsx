import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import UserForm from "../UserForm/UserForm";
import useCreateUser from "../../hooks/useCreateUser";
import { UserInput } from "../../types/userTypes/userTypes.types";
import { CreateUserDialogProps } from "../../types/userTypes/userTypes.types";

const defaultUserData: UserInput = {
  DisplayName: "",
  Email: "",
  Status: "Active",
  IsOSPAdmin: false,
  FunctionalUser: false,
  BlockAccess: false,
  O365Email: "",
  MFA_Mobile: "",
  ColourMode: "Light",
  AdminUser: 0,
};

const CreateUserDialog = ({
  open,
  onClose,
  onCreateSuccess,
}: CreateUserDialogProps) => {
  const { createUser } = useCreateUser();

  const [formData, setFormData] = useState<UserInput>(defaultUserData);
  const [errors, setErrors] = useState<Partial<Record<keyof UserInput, string>>>({});

  const validateForm = () => {
    const formErrors: Partial<Record<keyof UserInput, string>> = {};

    if (!formData.DisplayName) {
      formErrors.DisplayName = "Display Name is required.";
    }
    if (!formData.Email || !/\S+@\S+\.\S+/.test(formData.Email)) {
      formErrors.Email = "A valid Email is required.";
    }
    if (!formData.O365Email || !/\S+@\S+\.\S+/.test(formData.O365Email)) {
      formErrors.O365Email = "A valid O365 Email is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormChange = (data: UserInput) => {
    setFormData(data);
  };

  const handleCreateUser = async () => {
    if (!validateForm()) return;

    await createUser(formData);
    resetForm();
    onCreateSuccess();
  };

  const resetForm = () => {
    setFormData(defaultUserData);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <UserForm
          initialData={formData}
          onChange={handleFormChange}
          errors={errors}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateUser} color="secondary">
          Create User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserDialog;
