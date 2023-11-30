'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { VerifyMark } from '../domain/VerifyMark';
import { Button, IconButton } from '@mui/material';
import { Receipt as ReceiptIcon, Add as AddIcon } from "@mui/icons-material";
import { Domain } from '@/types/types';
import { DomainDialog } from './DomainDialog';
import { useDomainDialog } from './DomainDialogContext';

export const DomainCollection = () => {
	const { user, supabase } = useAuth();
	const { openDomainEditor } = useDomainDialog();

	const [loading, setLoading] = useState(true);
	const [domains, setDomains] = useState<Domain[] | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		// Retrieve all domains associated with the current user
		const getDomains = async () => {
			const { data: domains } = await supabase
				.from('domains')
				.select(`
				  hostname,
  			  tld,
  			  verifier,
  			  flair,
  			  score,
  			  verified,
  			  profiles!inner (
  			    user_id,
  			    nickname
  			  )
  			`)
				.eq('profiles.user_id', user?.id)
				.order('hostname', { ascending: true });

			setDomains(domains);
			setLoading(false);
		};

		user?.id && getDomains();
	}, [user, supabase]);

	return (
		<div className='w-full p-8 overflow-x-auto'>
			<Button className='rounded bg-gray-700 hover:bg-gray-800 text-neutral-200' onClick={() => openDomainEditor(null)}><AddIcon />Collect</Button>
			<DomainDialog />
			<div className="w-full grid grid-cols-[75px_1fr_100px_50px] gap-4 p-4">
				<div className="font-bold">Verified</div>
				<div className="font-bold">Domain</div>
				<div className="font-bold">Flair</div>
				<div className="font-bold"></div>
				{
					domains?.map(({ hostname, tld, verified, flair }) => <React.Fragment key={`${hostname}.${tld}`}>
						<div>{verified ? <VerifyMark hostname={hostname} tld={tld} verified={verified} /> : ''}</div>
						<div className='text-2xl'>{`${hostname}.${tld}`}</div>
						<div><img className='h-[50px]' height={50} src={flair} alt={`Flair for ${hostname}.${tld}`} /></div>
						<div><IconButton className="bg-black/25 rounded-none rounded-br p-4 text-white w-[50px] h-[50px]" onClick={() => openDomainEditor({ hostname, tld, verified, flair })}><ReceiptIcon /></IconButton></div>
					</React.Fragment>)
				}
			</div>
			{loading && <div className='w-full h-64 flex flex-row justify-center items-center text-2xl'>Loading</div>}
		</div>
	);
};
