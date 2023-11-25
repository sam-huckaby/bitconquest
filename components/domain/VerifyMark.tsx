'use client';

export interface VerifyMarkProps {
	hostname: string;
	tld: string;
	verified: boolean;
};

export const VerifyMark = ({ hostname, tld, verified }: VerifyMarkProps) => {
	return (
		<div className="shrink-0">
			{
				verified &&
				<img className="mb-[5px]" src="/verified-icon.png" width={32} height={32} alt={`Ownership of ${hostname}.${tld} has been verified by Bit Conquest`} />
			}
		</div>
	);
};
