'use client';

import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { PropertyDialog } from "./PropertyDialog";

interface PropertyEditorProps {
  domain: string;
  verifier: string;
};

export const PropertyEditor = ({ domain, verifier }: PropertyEditorProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <IconButton aria-label={`Edit ${domain}`} onClick={() => setDialogOpen(true)}> {/* TODO: make this label domain name specific */}
        <EditIcon />
        <span className="sr-only">Edit</span>
      </IconButton>
      <PropertyDialog domain={domain} verifier={verifier} open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};
