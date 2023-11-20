'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Menu, MenuItem } from '@mui/material';
import { User } from '@supabase/supabase-js';

interface ProfileButtonProps {
	signOutHandler: () => void;
};

export default function ProfileButton({ signOutHandler }: ProfileButtonProps) {
	const [user, setUser] = useState<User | null>();
	const [loading, setLoading] = useState(true);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	/*
	  <div className="flex items-center gap-4">
	    Hey, {user.email}!
	    <form action={signOut}>
	      <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
		Logout
	      </button>
	    </form>
	  </div>
	 */

	return user ? (
		<div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center">
			<span className="text-lg font-medium mr-3">{user.email}</span>
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
			<Menu
				id="basic-menu"
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={signOutHandler}>Logout</MenuItem>
			</Menu>
		</div>
	) : (
		<Link
			href="/login"
			className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
		>
			Login
		</Link>
	)
}

