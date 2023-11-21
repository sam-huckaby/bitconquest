import { useRouter } from 'next/navigation';
import React from 'react';

export type Leader = {
	user_name: string;
	stockpile_score: number;
};

interface LeaderPanelProps {
	leaders: Leader[];
};

export const LeaderPanel = ({ leaders }: LeaderPanelProps) => {
	const { push } = useRouter();

	return <div className='grid grid-cols-1 w-11/12 gap-y-2 py-4 text-2xl'>
		{
			leaders.map(({ user_name, stockpile_score }) =>
			(
				<div
					key={user_name}
					onClick={() => push(`/u/${user_name}`)}
					className='grid grid-cols-[100px_minmax(0,_1fr)] w-11/12 gap-y-2 rounded bg-blue-300/50 text-2xl hover:bg-blue-300 cursor-pointer'>
					<div className='py-4 pl-4'>{stockpile_score}</div>
					<div className='py-4 pr-4'>{user_name}</div>
				</div>
			)
			)
		}
	</div>;
};
