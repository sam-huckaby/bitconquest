import { IconButton, TableCell, TableRow } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export interface DomainRowProps {
  host: string;
  tld: string;
  score: number;
  deed: string;
  verified: boolean;
  isHeader?: boolean;
};

export const DomainRow = ({ host, tld, score, deed, verified, isHeader }: DomainRowProps) => {
  return (
    <TableRow>
      <TableCell className={`${isHeader ? 'font-bold' : ''}`}>{host}</TableCell>
      <TableCell className={`${isHeader ? 'font-bold' : ''}`}>.{tld}</TableCell>
      <TableCell className={`${isHeader ? 'font-bold' : ''}`}>{isHeader ? "Score" : score}</TableCell>
      <TableCell className={`${isHeader ? 'font-bold' : ''}`}>
        <div className="flex items-center gap-2">
          {deed}
          {
            !isHeader && <IconButton aria-label='Copy TXT Deed'>
              <ContentCopyIcon />
              <span className="sr-only">Copy</span>
            </IconButton>
          }
        </div>
      </TableCell>
      <TableCell className={`${isHeader ? 'font-bold' : ''} text-center`}>{ isHeader? "Verified" : verified ? <CheckBoxIcon /> : <></> }</TableCell>
      {isHeader ?
        <TableCell className="font-bold">Actions</TableCell> :
        <TableCell>
          <div className="flex items-center gap-2">
            <IconButton aria-label='Edit this domain'> {/* TODO: make this label domain name specific */}
              <EditIcon />
              <span className="sr-only">Edit</span>
            </IconButton>
            <IconButton aria-label='Delete this domain'>
              <DeleteIcon />
              <span className="sr-only">Delete</span>
            </IconButton>
          </div>
        </TableCell>
      }
    </TableRow>
  );
};
