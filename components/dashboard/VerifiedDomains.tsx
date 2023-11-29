'use client';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAuth } from '../auth/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { DNSHelpDialog } from './DNSHelpDialog';

export const VerifiedDomains = () => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	const { user } = useAuth();
	const supabase = createClient();

	const [loading, setLoading] = useState(true);
	const [domains, setDomains] = useState([0, 0]);
	const [open, setOpen] = useState(false);

	const close = () => setOpen(false);

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

			const counts = [0, 0];

			if (domains) {
				for (let i = 0; i < domains.length; i++) {
					domains[i].verified ? counts[0]++ : counts[1]++;
				}
			}

			setDomains(counts);
			setLoading(false);
		};

		user?.id && getDomains();
	}, [user]);

	const data = {
		labels: [
			'Verified',
			'Unverified'
		],
		datasets: [
			{
				label: 'Domains',
				plugins: {
					legend: {
						color: "white",
					}
				},
				data: domains,
				backgroundColor: [
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 99, 132, 0.2)',
				],
				borderColor: [
					'rgba(54, 162, 235, 1)',
					'rgba(255, 99, 132, 1)',
				],
				borderWidth: 5,
			},
		],
	};

	const options = {
		plugins: {
			legend: {
				labels: {
					color: "white", // TODO: DARK MODE ONLY RIGHT NOW
				},
			},
		},
	};

	return (
		<div className='flex flex-row justify-between items-center border w-11/12 p-8'>
			<div>
				<h2 className='text-xl pb-2'>Verified Domains</h2>
				<p>Domain verification is an important part of securing and managing your domains. Unverified domains will not appear on your public profile and cannot have any reliability features enabled. Each domain must be verified individually by assigning your personal verification code to your domain via a DNS record.</p>
				<Button className='mt-2' variant='outlined' onClick={() => setOpen(true)}>More Details</Button>
				<DNSHelpDialog isOpen={open} close={close} />
			</div>
			<div>
				{loading ? "Loading" : <Pie className='text-white' data={data} options={options} />}
			</div>
		</div>
	);
};
