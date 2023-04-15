import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// props: buttonText, title, submitText, onSubmit, onCancel, enableSubmit
const Popup = ( props ) => {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false)
    if (typeof props.onCancel !== 'undefined') { props.onCancel() }
  }
  const handleSubmit = () => {
    if (typeof props.onSubmit !== 'undefined') { props.onSubmit() }
    setOpen(false)
  }

  return (
    <div style={{marginTop:"10px"}}>
      <Button variant="outlined" onClick={() => setOpen(true)}>{props.buttonText}</Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle sx={{ m: 0, p: 2, textAlign: "center", fontWeight: 600}} >
          {props.title}
          <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx = {{ minWidth: 500 }} >{props.children}</DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button disabled={props.enableSubmit} autoFocus onClick={handleSubmit}>{props.submitText ?? "Submit"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Popup;
