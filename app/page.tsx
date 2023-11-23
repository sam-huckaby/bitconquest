import { LeaderPanel } from '@/components/leaderboard/LeaderPanel';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { HomeHero } from './HomeHero';

interface HomeProps {
  params: { code: string }
  searchParams: { [key: string]: string | string[] | undefined }
};

export default async function Home({ searchParams }: HomeProps) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (searchParams.code && typeof searchParams.code === 'string') {
    supabase.auth.exchangeCodeForSession(searchParams.code);
  }

  // Use a stored function in Supabase to get the top ten domain holders / whales (same thing)
  const { data: leaders, error } = await supabase.rpc('get_leaderboard');

  return (
    <main className="flex min-h-full flex-col items-center justify-start pb-16">
      <HomeHero />
      <div className='w-full px-24 pt-4 border-t border-solid border-gray-500 bottom-background'>
        <h1 className="text-4xl font-bold text-center pb-2">Discover Your Domain Dynasty!</h1>
        <p className='relative'>Are you a digital domain collector, hoarding URLs like they&apos;re going out of style? Do you have a graveyard of unused domains gathering virtual dust? Or maybe, you&apos;re the savvy domain investor, waiting for the right moment to unleash your web real estate onto the world? Whatever your style, it&apos;s time to step into the spotlight with Bit Conquest, the Web App Where Domains Get Their Day!</p>
        <h2 className='text-2xl font-bold py-2'>Flaunt Your Digital Empire</h2>
        <p>Bit Conquest is not just another domain portfolio tool. It's a virtual kingdom where each of your domains, from the quirky to the quintessential, shines in its own right. This platform lets you showcase your entire collection, even those oddball impulse buys you made at 3 AM (we know, it seemed like a good idea at the time).</p>

        <h2 className='text-2xl font-bold py-2'>Collect Flair for Every Domain</h2>
        <p>Every domain is unique, and at Bit Conquest, each gets its moment of glory. You'll earn custom flair for each domain, turning your collection into a vibrant tapestry of digital achievement. It's like scout badges, but for your web domains. How cool is that?</p>

        <h2 className='text-2xl font-bold py-2'>Share with Friends, Impress Strangers</h2>
        <p>With Bit Conquest, sharing your domain collection becomes a social affair. Show off your digital prowess to friends, family, and yes, even those envious competitors. Let them marvel at your domain diversity and your uncanny knack for snagging cool URLs.</p>

        <h2 className='text-2xl font-bold py-2'>A Marketing Tool in Disguise</h2>
        <p>Think Bit Conquest is all fun and games? Think again! It's a powerful marketing tool, too. Showcase your domains in their best light, making them irresistible to potential buyers. It's like having a digital 'For Sale' sign that actually gets noticed!</p>

        <h2 className='text-2xl font-bold py-2'>Simple, Slick, and Oh So Addictive</h2>
        <p>Our intuitive interface makes managing and displaying your domains a breeze. You'll wonder how you ever managed without it. But be warned: Bit Conquest is addictive. Watching your collection grow and earning new flair is a thrill you'll keep coming back for.</p>

        <h2 className='text-2xl font-bold py-2'>Connect, Conquer, Celebrate!</h2>
        <p>Join a community of like-minded domain enthusiasts. Share tips, celebrate each other's flair achievements, and maybe find your next domain gem. Bit Conquest is more than an app; it's a movement.</p>

        <h2 className='text-2xl font-bold py-2'>Ready to Rule Your Domains?</h2>
        <p>Don't let your domains languish in obscurity. Bring them into the limelight with Bit Conquest. Start showcasing, sharing, and selling like a pro. Sign up today, and let the conquest begin!</p>

        <div id='leaderboard' className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <h2 className='text-3xl bold underline'>Leaderboard</h2>
        </div>
        <LeaderPanel leaders={leaders} />
      </div>
    </main>
  )
}
