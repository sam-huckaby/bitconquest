import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

interface PropertyDialogProps {
  open: boolean;
  domain?: string;
  verifier: string;
  onClose: () => void;
};

export const PropertyDialog = ({ open, domain, verifier, onClose }: PropertyDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Activate New Propety</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>To activate a new domain and uncover its value, you will need to add a TXT
            record to the DNS settings for that domain with your registrar.</p>
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Property Location"
          placeholder="yourcooldomain.com"
          inputProps={{
            pattern: /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
          }}
          value={domain}
          type="text"
          fullWidth
          variant="standard"
        />
        <DialogContentText className='my-4'>
          <p>To activate a new domain and uncover its value, you will need to add a TXT
            record to the DNS settings for that domain with your registrar.</p>
        </DialogContentText>
        <div className="p-4 flex flex-row items-center justify-between bg-gray-200 font-bold">
          <p>{verifier}</p>
          <CopyToClipboardButton valueToCopy={verifier} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Activate</Button>
      </DialogActions>
    </Dialog>
  );
};
