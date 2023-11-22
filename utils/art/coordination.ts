export const tldToColorScheme = (tld: string) => {
  switch (tld) {
    case 'com':
      return {
        background: 'bg-green-200/50',
        separator: 'bg-green-500',
        text: 'text-green-900',
        badge: 'bg-green-100',
      };
    case 'org':
      return {
        background: 'bg-blue-200/50',
        separator: 'bg-blue-500',
        text: 'text-blue-900',
        badge: 'bg-blue-100',
      };
    case 'net':
      return {
        background: 'bg-red-200/50',
        separator: 'bg-red-500',
        text: 'text-red-900',
        badge: 'bg-red-100',
      };
    case 'io':
      return {
        background: 'bg-amber-200/50',
        separator: 'bg-amber-500',
        text: 'text-amber-900',
        badge: 'bg-amber-100',
      };
    default:
      return {
        background: 'bg-gray-200/50',
        separator: 'bg-gray-700',
        text: 'text-gray-900',
        badge: 'bg-gray-100',
      };
  }
}

