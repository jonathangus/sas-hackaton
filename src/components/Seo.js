import Head from 'next/head';
import React from 'react';

const gaTrackingScript = (
  <script
    async
    src="https://www.googletagmanager.com/gtag/js?id=UA-43885727-8"
  />
);
const gaTrackingCode = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-43885727-9');
`;

const Seo = props => {
  const { image, title, description, url } = props;

  return (
    <Head>
      {gaTrackingScript}
      <script dangerouslySetInnerHTML={{ __html: gaTrackingCode }} />
      <title>{title}</title>
      <meta charSet="utf-8" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

export default Seo;
