'use client';

import React, { useState } from 'react';
import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DomainDialog } from './DomainDialog';

export const DomainAddButton = () => {
	const [open, setOpen] = useState(false);

	return <>
		<Button className='rounded bg-gray-800 text-neutral-200 hover:bg-gray-900' onClick={() => setOpen(true)}><AddIcon />Collect</Button>
		<DomainDialog clear={true} open={open} onClose={() => setOpen(false)} />
	</>;
};
