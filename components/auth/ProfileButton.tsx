'use client';

import React, { useState } from 'react';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface ProfileButtonProps {
	user: User;
};

export default function ProfileButton({ user }: ProfileButtonProps) {
	const { push } = useRouter();
	const supabase = createClient();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const goToMyDomains = async () => {
		const { data: { user } } = await supabase.auth.getUser();
		push(`/u/${user?.user_metadata.preferred_username}`);
		handleClose();
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setAnchorEl(null);
		push('/login');
	};

	return (
		<>
			<Button
				className='hover:bg-black/50'
				aria-controls={open ? 'profile-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
					<svg
						className=" text-gray-800"
						fill="none"
						height="24"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						viewBox="0 0 24 24"
						width="24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</div>
			</Button>
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
				<span className='font-bold px-4 pb-1 h-auto inline-block text-center'>{user.user_metadata.user_name}</span>
				<Divider />
				<MenuItem onClick={goToMyDomains}>My Domains</MenuItem>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</>
	);
}

