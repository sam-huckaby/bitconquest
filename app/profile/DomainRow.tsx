import { IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import { PropertyEditor } from "./PropertyEditor";

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
      <TableCell className={`${isHeader ? 'font-bold' : ''} max-w-32 overflow-ellipsis`}>
        <div className="flex items-center gap-2">
          {deed}
          {
            !isHeader && <CopyToClipboardButton valueToCopy={deed} />
          }
        </div>
      </TableCell>
      <TableCell className={`${isHeader ? 'font-bold' : ''} text-center`}>{ isHeader? "Verified" : verified ? <CheckBoxIcon /> : <></> }</TableCell>
      {isHeader ?
        <TableCell className="font-bold">Actions</TableCell> :
        <TableCell>
          <div className="flex items-center gap-2">
            <PropertyEditor domain={`${host}.${tld}`} verifier={deed} />
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
