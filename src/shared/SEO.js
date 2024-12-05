import { Helmet } from "react-helmet";
import { SEO_DATA } from "@app/static/seo";

export const SEO = ({ type }) => {
  const {
    title,
    description,
    keywords,
    "twitter:title": twitterTitle,
    "twitter:description": twitterDescription,
    "twitter:image": twitterImage,
    "og:title": ogTitle,
    "og:description": ogDescription,
    "og:image": ogImage,
  } = SEO_DATA[type];
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="twitter:title" content={twitterTitle} />
      <meta property="twitter:description" content={twitterDescription} />
      <meta property="twitter:image" content={twitterImage} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:image" content={ogImage} />
    </Helmet>
  );
};
