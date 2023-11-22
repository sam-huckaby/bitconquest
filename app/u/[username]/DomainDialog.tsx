import React, { useMemo, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { CopyToClipboardButton } from '@/components/common/CopyToClipboardButton';
import { VERIFICATION_BASE } from '@/utils/verification/constants';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { drawFromDomainName } from '@/utils/art';
import { tldToColorScheme } from '@/utils/art/coordination';

interface PropertyDialogProps {
  open: boolean;
  domain?: string;
  clear?: boolean; // If the dialog should clear out on close (for shared dialogs)
  onClose: () => void;
};

export const DomainDialog = ({ open, domain, clear = false, onClose }: PropertyDialogProps) => {
  const { refresh } = useRouter();
  const [url, setUrl] = useState(domain ?? '');
  const [showSure, setShowSure] = useState(false);
  const [showVeil, setShowVeil] = useState(false);
  const [flairImg, setFlairImg] = useState<string | undefined>();
  const existingDomain = !!domain;
  const canvasRef = useRef<HTMLDivElement>(null);

  const verifier = useMemo(() => `${VERIFICATION_BASE}sam-huckaby#${url.replace(/\./, '-')}`, [url, VERIFICATION_BASE]);

  const closeHandler = () => {
    if (clear) setUrl('');
    onClose();
  };

  const collectHandler = async () => {
    const supabase = createClient();
    const [hostname, tld] = url.split('.');

    // Create an in-memory canvas so we can draw and store the flair in the DB
    const flairCanvas = document.createElement('canvas');
    flairCanvas.width = 300;
    flairCanvas.height = 150;
    const flair = drawFromDomainName(flairCanvas, hostname);
    setFlairImg(flair);
    const { error } = await supabase.from('domains').insert([
      { hostname, tld, verifier, flair },
    ]);
    if (!error) {
      setShowVeil(true);
      canvasRef.current?.appendChild(flairCanvas);
      return;
    }
    console.log(error);
  };

  const closeAfterCollect = () => {
    if (clear) setUrl('');
    onClose();
    setShowVeil(false);
    refresh();
  };

  const deleteHandler = async () => {
    const supabase = createClient();
    const [hostname, tld] = url.split('.');
    const { error } = await supabase.from('domains').delete().eq('hostname', hostname).eq('tld', tld);
    if (!error) {
      if (clear) setUrl('');
      onClose();
      refresh();
      return;
    }
    console.log(error);
  };

  // Regex for URL validation
  const urlRegex = /^[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;
  const isUrlValid = urlRegex.test(url);

  const { background, separator, text, badge } = tldToColorScheme(url.split('.')[1]);

  return (
    <Dialog classes={{
      'root': showVeil ? 'glamour-modal' : '',
    }} maxWidth='xs' open={open} onClose={closeHandler}>
      <DialogTitle>Collect New Domain</DialogTitle>
      <DialogContent>
        {
          showVeil && <>
            <div className="absolute flex flex-row justify-center items-center inset-0 z-20 bg-gray-800" id="overlay" onClick={(event) => {
              const overlay = document.getElementById('overlay');
              if (!overlay) return;

              overlay?.classList.add('dissolve');
              setTimeout(() => {
                // Tuck the interstitial neatly behind everything else, so it won't get in the way
                document.getElementById('overlay')?.classList.add('z-0');
              }, 2000);
            }}>
              <Button id='reveal_button' variant='outlined' className='bg-gray-700 rounded-md text-white font-bold relative
    before:w-full before:h-full before:scale-x-[1.15] before:scale-y-[1.35] before:absolute before:top-[50%] before:left-[50%]
    before:-z-10 before:translate-x-[-50%] before:translate-y-[-50%] 
    before:from-amber-300 before:to-red-600 before:bg-gradient-to-br
    before:rounded-md  
    hover:bg-gray-600 transition-all duration-300'>Open Collectable!</Button>
            </div>
            <div className={`absolute flex flex-row justify-center items-center inset-0 z-10 bg-black`}></div>
            <div className={`absolute flex flex-col justify-center items-center inset-0 z-10 ${background}`}>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl flex items-center">
                {url.split('.')[0]}<span className={`${text} ${badge} text-lg rounded-full ml-2 py-1 px-3 tracking-wide`}>.{url.split('.')[1]}</span>
              </h2>
              <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
              <img className='h-[150px] w-[300px]' src={flairImg} />
              <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
              <Button className='bg-black' variant='contained' color='secondary' onClick={closeAfterCollect}>Close</Button>
            </div>
          </>
        }
        {
          !existingDomain ?
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Property Location"
              placeholder="yourcooldomain.com"
              inputProps={{
                pattern: urlRegex
              }}
              value={url}
              onChange={({ target: { value } }) => setUrl(value)}
              type="text"
              fullWidth
              variant="standard"
            /> :
            <div className="p-4 flex flex-row items-center justify-between bg-gray-200 font-bold">{url}</div>
        }
        <DialogContentText className='my-4'>
          To activate a new domain and uncover its value, you will need to add a TXT
          record to the DNS settings for that domain with your registrar.
        </DialogContentText>
        <div className="p-4 flex flex-row items-center justify-between bg-gray-200 font-bold">
          <p>{verifier}</p>
          <CopyToClipboardButton valueToCopy={verifier} />
        </div>
      </DialogContent>
      <DialogActions>
        {
          existingDomain &&
          <>
            <Button color='warning' onClick={() => setShowSure(true)}>Delete</Button>
            <div className='grow'>
              {showSure ? <div>really? <Button variant='text' onClick={() => deleteHandler()}>Yes</Button><Button variant='text' onClick={() => setShowSure(false)}>No</Button></div> : <></>}
            </div>
          </>
        }
        <Button onClick={closeHandler}>Cancel</Button>
        {!existingDomain && <Button disabled={!isUrlValid} onClick={collectHandler}>Collect!</Button>}
      </DialogActions>
    </Dialog>
  );
};
