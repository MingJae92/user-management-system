import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import UserForm from "../UserForm/UserForm";
import {
  FormDataProps,
  UpdateUserDialogProps,
} from "../../types/userTypes/userTypes.types";

const Updateuserdialog = ({
  open,
  onClose,
  user,
  onUpdateConfirm,
}: UpdateUserDialogProps) => {

  const [formData, setFormData] = useState<FormDataProps>({
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
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormDataProps, string>>
  >({});

  useEffect(() => {
    if (user) {
      setFormData({
        DisplayName: user.DisplayName,
        Email: user.Email,
        Status: user.Status,
        IsOSPAdmin: user.IsOSPAdmin,
        FunctionalUser: user.FunctionalUser,
        BlockAccess: user.BlockAccess,
        O365Email: user.O365Email,
        MFA_Mobile: user.MFA_Mobile,
        ColourMode: user.ColourMode,
        AdminUser: user.AdminUser,
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const formErrors: Partial<Record<keyof FormDataProps, string>> = {};

    if (!formData.DisplayName)
      formErrors.DisplayName = "Display Name is required.";
    if (!formData.Email || !/\S+@\S+\.\S+/.test(formData.Email))
      formErrors.Email = "A valid Email is required.";
    if (!formData.O365Email || !/\S+@\S+\.\S+/.test(formData.O365Email))
      formErrors.O365Email = "A valid O365 Email is required.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleFormChange = (data: FormDataProps) => {
    setFormData(data);
  };

  const handleUpdateUser = async () => {
    if (!validateForm()) return;

    onUpdateConfirm(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        <UserForm
          initialData={formData}
          onChange={handleFormChange}
          errors={errors}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdateUser} color="secondary">
          Update User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Updateuserdialog;
