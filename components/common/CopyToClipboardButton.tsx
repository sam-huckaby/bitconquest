'use client';

import React from 'react';
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface CopyToClipboardButtonProps {
  valueToCopy: string;
};

export const CopyToClipboardButton = ({ valueToCopy }: CopyToClipboardButtonProps) => {
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

  return <IconButton onClick={copyToClipboard}><CopyIcon /></IconButton>;
};
