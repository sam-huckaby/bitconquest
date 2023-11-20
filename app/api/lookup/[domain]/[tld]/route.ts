import { NextResponse } from 'next/server'
import { promises as dns } from 'dns';
import whois from 'whois';

const lookupWhois = (domain: string): Promise<any> => {
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
const nValue = (name: string): number => {
    return (name.length >= 20) ? 0 : 20 - name.length;
};

// The length of time between when domains became available and when this domain was first registered
const zValue = (registeredDate: string): number => {
    // First domain registered: March 15, 1985 (Symbolics.com)
    const inputDate = new Date(registeredDate);
    const comparisonDate = new Date('1985-03-15T00:00:00.00Z');

    const diffInMilliseconds = inputDate.getTime() - comparisonDate.getTime();
    const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25); // Average considering leap years

    return Math.abs(diffInYears); // Return the aproximate 
};

export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(
    _: Request,
    { params }: { params: { domain: string, tld: string, } }
) {
    return Response.json({ error: "oh, hello there" }, { status: 500 });
    const { domain, tld } = params;

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

        // Calculate a completely unbiased score that will determine how awesome a domain is
        const score = Math.round(nValue(domain) + zValue(creationDate));

        // Respond with both TXT records and registration date
        return Response.json({
            domain: fullDomain,
            score,
            txtRecords,
            creationDate
        });
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
