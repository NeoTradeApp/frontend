import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function ModalDialog(props, ref) {
  const {
    title,
    body,
    submitButtonLabel,
    cancelButtonLabel,
    onSubmit: emitSubmit,
    onCancel: emitCancel,
    onClose: emitClose,
  } = props;

  const [open, setOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }), []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    emitClose && emitClose();
  };

  const handleCancel = () => {
    setOpen(false);
    emitCancel && emitCancel();
  }

  const handleSubmit = () => {
    setOpen(false);
    emitSubmit && emitSubmit();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle id="responsive-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {body}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {cancelButtonLabel}
        </Button>
        <Button onClick={handleSubmit} autoFocus>
          {submitButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default forwardRef(ModalDialog);
