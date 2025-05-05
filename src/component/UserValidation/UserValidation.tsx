import { ValidateUserFormProps } from "../../types/userTypes/userTypes.types";

export const validateUserForm = (formData: ValidateUserFormProps): Partial<Record<keyof ValidateUserFormProps, string>> => {
  const errors: Partial<Record<keyof ValidateUserFormProps, string>> = {};
  
  if (!formData.DisplayName || formData.DisplayName.trim() === "") {
    errors.DisplayName = "Display Name is required.";
  }
  
  if (!formData.Email || !/\S+@\S+\.\S+/.test(formData.Email)) {
    errors.Email = "A valid Email is required.";
  }
  
  if (!formData.O365Email || !/\S+@\S+\.\S+/.test(formData.O365Email)) {
    errors.O365Email = "A valid O365 Email is required.";
  }
  
  if (formData.ColourMode && !["Light", "Dark"].includes(formData.ColourMode)) {
    errors.ColourMode = "Colour Mode must be either 'Light' or 'Dark'.";
  }
  
  return errors;
};

export const getDefaultUserFormData = () => {
  return {
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
};