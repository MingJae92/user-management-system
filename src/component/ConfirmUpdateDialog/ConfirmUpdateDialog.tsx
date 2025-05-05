import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { ConfirmUpdateDialogProps } from "../../types/userTypes/userTypes.types";

const Confirmupdatedialog = ({ open, onClose, onConfirm }: ConfirmUpdateDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Update</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to update the user's details?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Confirm Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmupdatedialog;