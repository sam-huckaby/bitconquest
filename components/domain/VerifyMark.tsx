'use client';

export interface VerifyMarkProps {
	hostname: string;
	tld: string;
	verified: boolean;
};
{/* TODO: Stash this decent looking icon away somewhere
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
				*/}

export const VerifyMark = ({ hostname, tld, verified  }: VerifyMarkProps) => {
	return (
		<div>
			{
				verified &&
				<img className="mb-[5px]" src="/verified-icon.png" width={32} height={32} alt={`Ownership of ${hostname}.${tld} has been verified by Bit Conquest`} />
			}
		</div>
	);
};
