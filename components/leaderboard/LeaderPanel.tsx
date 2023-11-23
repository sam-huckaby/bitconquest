'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export type Leader = {
	nickname: string;
	total_score: number;
};

interface LeaderPanelProps {
	leaders: Leader[];
};

export const LeaderPanel = ({ leaders }: LeaderPanelProps) => {
	const { push } = useRouter();

	return <div className='grid grid-cols-1 w-full gap-y-2 py-4 text-2xl'>
		{
			leaders.map(({ nickname, total_score }) =>
			(
				<div
					key={nickname}
					onClick={() => push(`/u/${nickname}`)}
					className='grid grid-cols-[100px_minmax(0,_1fr)] gap-y-2 
					w-full rounded hover:shadow-md 
					bg-slate-400/50 hover:bg-slate-400/75 
					dark:bg-slate-600/50 dark:hover:bg-slate-600/75
					text-2xl transition duration-500 cursor-pointer'>
					<div className='py-4 pl-4'>{total_score}</div>
					<div className='py-4 pr-4'>{nickname}</div>
				</div>
			)
			)
		}
	</div>;
};
