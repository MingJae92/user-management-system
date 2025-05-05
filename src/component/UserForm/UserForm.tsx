import { useState, useEffect, ChangeEvent } from "react";
import { TextField, FormControlLabel, Switch } from "@mui/material";
import { UserInput } from "../../types/userTypes/userTypes.types";



interface UserformProps {
  initialData?: Partial<UserInput>;
  onChange: (data: UserInput) => void;
  errors?: Partial<Record<keyof UserInput, string>>;
}

const Userform = ({ initialData = {}, onChange, errors = {} }: UserformProps) => {
  const [formData, setFormData] = useState<UserInput>({
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
    ...initialData,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const updatedData = { ...formData, [name]: checked };
    setFormData(updatedData);
    onChange(updatedData);
  };

  return (
    <>
      <TextField
        label="Display Name"
        name="DisplayName"
        value={formData.DisplayName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.DisplayName}
        helperText={errors.DisplayName}
      />
      <TextField
        label="Email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.Email}
        helperText={errors.Email}
      />
      <TextField
        label="O365 Email"
        name="O365Email"
        value={formData.O365Email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.O365Email}
        helperText={errors.O365Email}
      />
      <TextField
        label="MFA Mobile"
        name="MFA_Mobile"
        value={formData.MFA_Mobile}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Colour Mode (Light/Dark)"
        name="ColourMode"
        value={formData.ColourMode}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.ColourMode}
        helperText={errors.ColourMode || "Enter 'Light' or 'Dark'"}
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.IsOSPAdmin}
            onChange={handleSwitchChange}
            name="IsOSPAdmin"
          />
        }
        label="Is OSP Admin"
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.FunctionalUser}
            onChange={handleSwitchChange}
            name="FunctionalUser"
          />
        }
        label="Functional User"
      />
      <FormControlLabel
        control={
          <Switch
            checked={formData.BlockAccess}
            onChange={handleSwitchChange}
            name="BlockAccess"
          />
        }
        label="Block Access"
      />
    </>
  );
};

export default Userform;
