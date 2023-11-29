import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { CopyToClipboardButton } from '../common/CopyToClipboardButton';

interface DNSHelpDialogProps {
  isOpen: boolean;
  close: () => void;
};

export const DNSHelpDialog = ({ isOpen, close }: DNSHelpDialogProps) => {
  const { verifier } = useAuth();

  const handleClose = () => {
    close();
  };

	return (
		<Dialog open={isOpen} onClose={handleClose} maxWidth='md'>
			<DialogTitle>How do I verify my domain?</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Verifying your domain is not overly complicated, but it does require you to adjust the DNS records. If you are uncomfortable doing this, you can likely find some good guides online to help walk you through the process for your domain registrar.
				</DialogContentText>
				<DialogContentText>
					To verify your domain, add a TXT record for your domain with the following information
				</DialogContentText>
				<div className='grid grid-cols-[150px_100px_1fr] w-full p-4 bg-gray-500/25'>
				  <div className='font-bold'>Record Type</div>
					<div className='font-bold'>Host</div>
					<div className='font-bold'>Value</div>
				  <div>TXT</div>
					<div>@</div>
					<div>{ verifier }<CopyToClipboardButton valueToCopy={verifier} /></div>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
