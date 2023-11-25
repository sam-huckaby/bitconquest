import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ImageResponse } from 'next/og'

export const dynamic = 'force-dynamic' // defaults to force-static
export async function GET(
  request: NextRequest,
  { params: { username } }: { params: { username: string, } }
) {
  const size = {
    width: 1200,
    height: 630,
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: topTen } = await supabase.rpc('user_og', { nickname: username });

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {
          topTen.map(
            ({ domain, score }: { domain: string, score: number }) => <div style={{ display: 'flex', flexDirection: 'row', padding: '24px' }} key={domain}>
              <span style={{ border: '5px solid black', padding: '12px' }}>{`${domain} (${score})`}</span>
            </div>)
        }
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src={`${process.env.NEXT_PUBLIC_ROOT_URL}/bitconquest-logo.png`} alt='Bit Conquest Logo' height={200} width={200} style={{ marginLeft: '24px' }} />
          <span style={{ color: 'white', fontWeight: 'bolder', fontSize: 128 }}>{username}</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
  /*
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
      */
}

