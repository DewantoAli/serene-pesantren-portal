import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.irsyadulhaq.or.id';
const DEFAULT_IMAGE = 'https://ik.imagekit.io/uzuuvayyu/building_LixplpNC1?updatedAt=1742674414873';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
}

const Seo: React.FC<SeoProps> = ({ title, description, path, image = DEFAULT_IMAGE, noindex, ogType = 'website' }) => {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={url} />


      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default Seo;
