'use client';

import React from 'react';
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { IconButton, IconButtonProps } from "@mui/material";

interface CopyToClipboardButtonProps extends IconButtonProps {
  valueToCopy: string;
};

export const CopyToClipboardButton = ({ valueToCopy, ...props }: CopyToClipboardButtonProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(valueToCopy)
      .then(() => {
        // You can add more functionality here to provide feedback to the user
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return <IconButton {...props} onClick={copyToClipboard}><CopyIcon /></IconButton>;
};
