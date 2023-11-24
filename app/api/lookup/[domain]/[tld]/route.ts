import { NextResponse, NextRequest } from 'next/server'
import { promises as dns } from 'dns';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { lookupWhois, nValue, zValue } from '@/utils/verification/lookups';

export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(
    request: NextRequest,
    { params }: { params: { domain: string, tld: string, } }
) {
    const searchParams = request.nextUrl.searchParams;
    const validationKey = searchParams.get('key');

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
        let validated = false;
        for (let i = 0; i < txtRecords.length; i++) {
            if (txtRecords[i][0][0] === validationKey) {
                validated = true;
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
        const creationDate = result["Creation Date"];

        // Scores are hard and might sometimes break, better to default to something basic
        const nScore = nValue(domain);
        const zScore = zValue(creationDate);

        // Calculate a completely unbiased score that will determine how awesome a domain is
        const score = Math.round((nScore || 0) + (zScore || 0));

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        await supabase.from('domains').update({ score }).eq('hostname', domain).eq('tld', tld);

        // Respond with both TXT records and registration date
        return Response.json({
            score,
            creationDate,
            validated
        });
    } catch (error: any) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

