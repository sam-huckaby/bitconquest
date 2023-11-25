import React from 'react';
import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Bit Conquest: Show off your spoils'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
 
export default async function Image() {
  const logo = await fetch(new URL('../public/bitconquest-logo.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  // Convert ArrayBuffer to base64 string
  const imageBase64 = Buffer.from(logo).toString('base64');
  const imageDataSrc = `data:image/png;base64,${imageBase64}`;

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
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundImage: 'linear-gradient(to bottom right, #475569 0%, #1e293b 25%, #1e293b 75%, #334155 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <img src={imageDataSrc} alt='Bit Conquest Logo' height={200} width={200} style={{ marginLeft: '24px' }} />
          <span style={{ color: 'white', fontWeight: 'bolder', fontSize: 128 }}>Bit Conquest</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
