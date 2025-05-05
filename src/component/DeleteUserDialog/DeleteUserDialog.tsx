import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import useDeleteUser from "../../hooks/useDeleteUser";
import { UserDeleteProps } from "../../types/userTypes/userTypes.types";


const Deleteuserdialog = ({ open, onClose, userId, onDeleteSuccess }:UserDeleteProps) => {
  const { deleteUser } = useDeleteUser();

  const handleDelete = async () => {
    if (userId !== null) {
      await deleteUser(userId);
      onDeleteSuccess();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Deleteuserdialog;