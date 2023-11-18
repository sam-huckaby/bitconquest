import { Table, TableHead, TableBody } from '@mui/material'
import { DomainRow } from './DomainRow';
import { DomainAdder } from './DomainAdder';
import { randomUUID } from 'crypto';

export default function Profile() {
  // TODO: Dynamically fetch these based on the currently logged-in user
  const domains = [
    { host: 'bitconquest', tld: 'com', score: 49, deed: 'h87g6f5dfw7g8', verified: true },
    { host: 'whnvr', tld: 'com', score: 120, deed: 'bitconquest-property-verifier-501bc505-2b55-419f-a6cc-544f6dd38697', verified: false },
    { host: 'samhuckaby', tld: 'com', score: 77, deed: 'higftuyguigiy', verified: false },
    { host: 'lostrequiem', tld: 'com', score: 32, deed: 'ih7yt6r56f76g', verified: true },
  ];

  const newUUID = randomUUID();

  return (
    <div key="1" className="w-full">
      <Table className='p-8'>
        <TableHead>
          <DomainRow host='Host Name' tld='TLD' score={0} verified={false} deed='Deed' isHeader={true} />
        </TableHead>
        <TableBody>
          {domains.map(({ host, tld, score, deed, verified }) => <DomainRow key={host} verified={verified} host={host} tld={tld} score={score} deed={deed} />)}
        </TableBody>
      </Table>
      <div className="mt-4">
        <DomainAdder verifier={`bitconquest-property-verifier-${newUUID}`} />
      </div>
    </div>
  )
}
