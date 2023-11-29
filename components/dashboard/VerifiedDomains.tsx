'use client';
import { Button } from '@mui/material';
import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

export const VerifiedDomains = () => {
	ChartJS.register(ArcElement, Tooltip, Legend);

	const data = {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	};

	return (
		<div className='flex flex-row justify-between items-center border w-11/12 p-8'>
			<div>
				<h2 className='text-xl pb-2'>Verified Domains</h2>
				<p>Domain verification is an important part of securing and managing your domains. Unverified domains will not appear on your public profile and cannot have any reliability features enabled. Each domain must be verified individually by assigning your personal verification code to your domain via a DNS record.</p>
				<Button className='mt-2' variant='outlined'>More Details</Button>
			</div>
			<div>
				<Pie className='text-white' data={data} />
			</div>
		</div>
	);
};
