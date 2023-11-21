import React, { useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { CopyToClipboardButton } from '@/components/common/CopyToClipboardButton';
import { VERIFICATION_BASE } from '@/utils/verification/constants';

interface PropertyDialogProps {
  open: boolean;
  domain?: string;
  clear?: boolean; // If the dialog should clear out on close (for shared dialogs)
  onClose: () => void;
};

export const DomainDialog = ({ open, domain, clear = false, onClose }: PropertyDialogProps) => {
  const [ url, setUrl ] = useState(domain ?? '');

  const verifier = useMemo(() => `${VERIFICATION_BASE}sam-huckaby#${url.replace(/\./, '-')}`, [url, VERIFICATION_BASE]);

  const closeHandler = () => {
    if (clear) setUrl('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <DialogTitle>Collect New Domain</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To activate a new domain and uncover its value, you will need to add a TXT
            record to the DNS settings for that domain with your registrar.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Property Location"
          placeholder="yourcooldomain.com"
          inputProps={{
            pattern: "^[a-zA-Z0-9]+\.[a-zA-Z]{2,}$"
          }}
          value={url}
          onChange={({ target: { value } }) => setUrl(value)}
          type="text"
          fullWidth
          variant="standard"
        />
        <DialogContentText className='my-4'>
          To activate a new domain and uncover its value, you will need to add a TXT
            record to the DNS settings for that domain with your registrar.
        </DialogContentText>
        <div className="p-4 flex flex-row items-center justify-between bg-gray-200 font-bold">
          <p>{verifier}</p>
          <CopyToClipboardButton valueToCopy={verifier} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <Button onClick={closeHandler}>Activate</Button>
      </DialogActions>
    </Dialog>
  );
};
