import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'The domains for a Bit Conquest user'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image({ params: { username } }: { params: { username: string } }) {
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
            ({ domain, score }: { domain: string, score: number }) => <div style={{ display: 'flex', flexDirection: 'row', padding: '24px' }}key={domain}>
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
}
