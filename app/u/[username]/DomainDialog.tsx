import React, { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { CopyToClipboardButton } from '@/components/common/CopyToClipboardButton';
import { VERIFICATION_BASE } from '@/utils/verification/constants';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { drawFromDomainName } from '@/utils/art';
import { tldToColorScheme } from '@/utils/art/coordination';
import { lookup } from '@/utils/verification/lookups';

interface PropertyDialogProps {
  open: boolean;
  verifier: string;
  domain?: string;
  clear?: boolean; // If the dialog should clear out on close (for shared dialogs)
  onClose: () => void;
};

export const DomainDialog = ({ open, verifier, domain, clear = false, onClose }: PropertyDialogProps) => {
  const { refresh } = useRouter();
  const [url, setUrl] = useState(domain ?? '');
  const [showSure, setShowSure] = useState(false);
  const [showVeil, setShowVeil] = useState(false);
  const [flairImg, setFlairImg] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const existingDomain = !!domain;
  const canvasRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  const closeHandler = () => {
    if (clear) setUrl('');
    setError('');
    onClose();
  };

  const handleError = (error: { code: string, details?: any, hint?: any, message: string }) => {
    switch (error.code) {
      case '23505':
        // This is the postgres Primary key conflict code
        setError('Domain already collected');
    }
  };

  const collectHandler = async () => {
    const [hostname, tld] = url.split('.');

    // Create an in-memory canvas so we can draw and store the flair in the DB
    const flairCanvas = document.createElement('canvas');
    flairCanvas.width = 300;
    flairCanvas.height = 150;
    // This lookup is to populate the score, which isn't shown in this dialog, but needs to be populated when it closes
    const { data, error: lookupError } = await lookup(hostname, tld, verifier); // This function returns an object with the score if needed here later
console.log(data);
    const flair = drawFromDomainName(flairCanvas, hostname);
    setFlairImg(flair);
    const { error } = await supabase.from('domains').insert([
      { hostname, tld, verifier, flair, score: data?.score, verified: data?.verified },
    ]);
    if (!error) {
      setShowVeil(true);
      canvasRef.current?.appendChild(flairCanvas);
      return;
    }
    handleError(error);
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
    }} maxWidth='xs' open={open} onKeyUp={(e) => e.key === 'Enter' ? collectHandler() : true} onSubmit={collectHandler} disableRestoreFocus onClose={closeHandler}>
      {
        existingDomain ?
          <DialogTitle className='pb-0'>{url}</DialogTitle> :
          <DialogTitle className='pb-0'>Collect New Domain</DialogTitle>
      }
      <DialogContent>
        {
          showVeil && <>
            <div className="absolute flex flex-row justify-center items-center inset-0 z-20 bg-gray-800 duration-300" id="overlay" onClick={(event) => {
              const overlay = document.getElementById('overlay');
              if (!overlay) return;

              overlay?.classList.add('dissolve');
              setTimeout(() => {
                // Tuck the interstitial neatly behind everything else, so it won't get in the way
                document.getElementById('overlay')?.classList.add('z-0');
              }, 2000);
            }}>
              <Button id='reveal_button' className='bg-gray-700 rounded-md text-white font-bold relative
    before:w-full before:h-full before:scale-x-[1.15] before:scale-y-[1.35] before:absolute before:top-[50%] before:left-[50%]
    before:-z-10 before:translate-x-[-50%] before:translate-y-[-50%] 
    before:from-amber-300 before:to-red-600 before:bg-gradient-to-br
    before:rounded-md  
    hover:bg-gray-600 transition-all duration-300'>Open Collectable!</Button>
            </div>
            <div className={`absolute flex flex-row justify-center items-center inset-0 z-10 bg-gray-500`}></div>
            <div className={`absolute flex flex-col justify-center items-center inset-0 z-10 ${background}`}>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl flex items-center">
                {url.split('.')[0]}<span className={`${text} ${badge} text-lg rounded-full ml-2 py-1 px-3 tracking-wide`}>.{url.split('.')[1]}</span>
              </h2>
              <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
              <img className='h-[150px] w-[300px]' src={flairImg} alt={`Flair for ${url}`} />
              <div className={`h-1 w-16 ${separator} mt-2 mb-4`} />
              <Button className='bg-black' variant='contained' color='secondary' onClick={closeAfterCollect}>Close</Button>
            </div>
          </>
        }
        {
          !existingDomain &&
          <TextField
            autoFocus={true}
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
          />
        }
        {existingDomain ?
          <DialogContentText className='my-4'>
            Verification TXT record for this site
          </DialogContentText> :
          <>
            <DialogContentText className='mt-4'>
              To showcase your domain on your profile, you just need to add your personal verification code
              to your domain&apos;s DNS via a TXT record.
            </DialogContentText>
            <DialogContentText className='mb-4'>
              This quick step confirms your ownership and gets your
              domain ready to shine!
            </DialogContentText>
          </>
        }
        <div className="p-4 flex flex-row items-center justify-between bg-gray-200 font-bold">
          <p className='text-sm'>{verifier}</p>
          <CopyToClipboardButton valueToCopy={verifier} />
        </div>
      </DialogContent>
      <DialogActions className='px-[24px]'>
        {error && <Typography className='text-red-700 text-center grow attention-shake'>{error}</Typography>}
        {
          existingDomain &&
          <>
            <Button color='warning' onClick={() => setShowSure(true)}>Delete</Button>
            <div className='grow'>
              {showSure ? <div>really? <Button variant='outlined' size='small' color='warning' onClick={() => deleteHandler()}>Yes</Button><Button variant='outlined' size='small' onClick={() => setShowSure(false)}>No</Button></div> : <></>}
            </div>
          </>
        }
        <Button onClick={closeHandler}>Cancel</Button>
        {!existingDomain && <Button disabled={!isUrlValid} type='submit' onClick={collectHandler}>Collect!</Button>}
      </DialogActions>
    </Dialog>
  );
};
