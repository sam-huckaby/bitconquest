'use server';
import { promises as dns } from 'dns';
import whois from 'whois';

export const lookupWhois = (domain: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		whois.lookup(domain, (err: any, data: any) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

// Name Value (how many letters less than 10 does it have in the name)
export const nValue = (name: string): number => {
	return (name.length >= 20) ? 0 : 20 - name.length;
};

// Domain longevity is valued at 10 * the number of years it has existed
export const zValue = (registeredDate: string): number => {
	if (!registeredDate) return 10;
	// First domain registered: March 15, 1985 (Symbolics.com)
	const inputDate = new Date();
	const comparisonDate = new Date(registeredDate);

	const diffInMilliseconds = inputDate.getTime() - comparisonDate.getTime();
	const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Average considering leap years

	return Math.abs(diffInYears) * 10; // Return the aproximate 
};

export interface lookupResponse {
	data: {
		score: number;
		creationDate: string;
		verified: boolean;
	} | null;
	error: any | null;
	status: number;

};

export const lookup = async (domain: string, tld: string, validationKey: string): Promise<lookupResponse> => {
	if (typeof domain !== 'string' || typeof tld !== 'string') {
		throw 'Invalid domain or TLD';
	}

	try {
		const fullDomain = `${domain}.${tld}`;

		// Get TXT records
		const txtRecords = [];

		try {
			txtRecords.push(await dns.resolveTxt(fullDomain));
		} catch (e) {
			// No logging here because it will be hit a lot
		}

		let verified = false;
		for (let i = 0; i < txtRecords.length; i++) {
			if (txtRecords[i][0][0] === validationKey) {
				verified = true;
				break;
			}
		}

		// Get WHOIS data
		const whoisData: any = await lookupWhois(fullDomain);
		// Store the formatted WHOIS data
		const result: Record<string, string> = {};
		// Format the WHOIS data into something usable
		whoisData.split('\n').forEach((item: string) => {
			const [key, value] = item.split(': ');
			result[key] = value;
		});

		// Grab the date the domain came into existence
		const creationDate = result["Creation Date"] //.creationDate;

		// Scores are hard and might sometimes break, better to default to something basic
		const nScore = nValue(domain);
		const zScore = zValue(creationDate);

		// Calculate a completely unbiased score that will determine how awesome a domain is
		const score = Math.round((nScore || 0) + (zScore || 0));

		// Respond with both TXT records and registration date
		return {
			data: {
				score,
				creationDate,
				verified,
			}, error: null, status: 200
		};

	} catch (error: any) {
		console.log(error);
		return { data: null, error, status: 500 };
	}
}
