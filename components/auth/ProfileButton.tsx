'use client';

import React, { useState } from 'react';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';

export default function ProfileButton() {
	const { push } = useRouter();
	const { avatar, signOut, user } = useAuth();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const goToDashboard = async () => {
		push(`/dashboard`);
		handleClose();
	};

	const logout = async () => {
		await signOut();
		setAnchorEl(null);
		push('/');
	};

	return (
		<>
			<IconButton
				className='hover:bg-black/50'
				aria-controls={open ? 'profile-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<img src={avatar} alt='Your profile picture' className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"/ >
			</IconButton>
			<Menu
				id="profile-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				className='pt-0'
			>
				<span className='flex flex-row justify-center items-center font-bold px-4 pb-1 h-auto text-center'>{user?.user_metadata.user_name}</span>
				<Divider />
				<MenuItem className='flex flex-row justify-start items-center pt-2' onClick={goToDashboard}>Dashboard</MenuItem>
				<MenuItem className='flex flex-row justify-start items-center' onClick={logout}>Logout</MenuItem>
			</Menu>
		</>
	);
}

