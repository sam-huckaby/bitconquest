'use client';

import React, { useEffect, useState } from 'react';
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { IconButton, IconButtonProps, Popover } from "@mui/material";

interface CopyToClipboardButtonProps extends IconButtonProps {
  valueToCopy: string;
};

export const CopyToClipboardButton = ({ valueToCopy, ...props }: CopyToClipboardButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setAnchorEl(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const copyToClipboard = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(valueToCopy)
      .then(() => {
        // You can add more functionality here to provide feedback to the user
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
    setAnchorEl(event.currentTarget);
  };

  return <>
    <IconButton {...props} onClick={copyToClipboard}><CopyIcon /></IconButton>
    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '10px' }}>Copied to Clipboard!</div>
      </Popover>
  </>;
};
