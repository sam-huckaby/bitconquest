import { Table, TableHead, TableBody, Button } from '@mui/material'
import { DomainRow } from './DomainRow';

export default function Profile() {
  const domains = [
    { host: 'bitconquest', tld: 'com', score: 49, deed: 'h87g6f5dfw7g8', verified: true },
    { host: 'whnvr', tld: 'com', score: 120, deed: 'uih78t6f5goj9', verified: false },
    { host: 'samhuckaby', tld: 'com', score: 77, deed: 'higftuyguigiy', verified: false },
    { host: 'lostrequiem', tld: 'com', score: 32, deed: 'ih7yt6r56f76g', verified: true },
  ];

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
        <Button className="mx-auto block">Add New Domain</Button>
      </div>
    </div>
  )
}
