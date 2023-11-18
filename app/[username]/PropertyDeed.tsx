export interface DomainCardProps {
  domain: string;
  tld: string;
  score: number;
  validated: boolean;
};

export const tldToColorScheme = (tld: string) => {
  switch (tld) {
    case 'com':
      return {
        background: 'bg-green-200',
        separator: 'bg-green-500',
        text: 'text-green-900',
        badge: 'bg-green-100',
      };
    case 'org':
      return {
        background: 'bg-blue-200',
        separator: 'bg-blue-500',
        text: 'text-blue-900',
        badge: 'bg-blue-100',
      };
    case 'net':
      return {
        background: 'bg-red-200',
        separator: 'bg-red-500',
        text: 'text-red-900',
        badge: 'bg-red-100',
      };
    case 'io':
      return {
        background: 'bg-amber-200',
        separator: 'bg-amber-500',
        text: 'text-amber-900',
        badge: 'bg-amber-100',
      };
    default:
      return {
        background: 'bg-gray-200',
        separator: 'bg-gray-500',
        text: 'text-gray-900',
        badge: 'bg-gray-100',
      };
  }
}

export const DomainCard = ({ domain, tld, score, validated }: DomainCardProps) => {
  const { background, separator, text, badge } = tldToColorScheme(tld);

  return (
    <div className={`${background} rounded-lg shadow-lg p-4 flex flex-col items-center`}>
      <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl flex items-center">
        { validated && <svg
          className=" mr-2"
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
          <polyline points="20 6 9 17 4 12" />
        </svg> }
        {domain}
      </h2>
      <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
      <span className={`${text} ${badge} rounded-full py-1 px-3`}>.{tld}</span>
      <p className="mt-4 font-bold text-zinc-500 md:text-lg lg:text-base xl:text-lg dark:text-zinc-400">Score: {score}</p>
    </div>
  );
}
