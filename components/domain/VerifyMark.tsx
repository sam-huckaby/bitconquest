'use client';
import React, { useState } from "react";

export interface VerifyMarkProps {
	hostname: string;
	tld: string;
	verified: boolean;
	verifier?: string;
};

export const VerifyMark = ({ hostname, tld, verified  }: VerifyMarkProps) => {
	const [isVerified, setIsVerified] = useState(verified);

	return (
		<div>
			{
				isVerified &&
				<svg
					className=" mr-2"
					fill="none"
					height="24"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="3"
					viewBox="0 0 24 24"
					width="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<polyline points="20 6 9 17 4 12" />
				</svg>
			}
		</div>
	);
};
