import React from 'react';

interface LeaderPanelProps {
	user: string;
	score: number;
};

export const LeaderPanel = ({ user, score }: LeaderPanelProps) => {
	return <div className='rounded bg-red-600 p-8 mb-2 w-11/12 flex flex-row justify-between items-center'>
		<span>{user}</span>
		<span>{score}</span>
		<button>go</button>
	</div>;
};
