interface StructuredDataProps {
  locale: string
}

export function StructuredData({ locale }: StructuredDataProps) {
  
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://rumensk-kultursenter.no/#organization",
    "name": locale === 'ro' ? "Centrul Cultural Român în Norvegia" : 
            locale === 'no' ? "Rumensk Kultursenter" : 
            "Romanian Cultural Center in Norway",
    "url": "https://rumensk-kultursenter.no",
    "logo": "https://rumensk-kultursenter.no/images/logo/logov2.png",
    "description": locale === 'ro' ? 
      "Conectăm diaspora română din Norvegia prin evenimente culturale, cursuri de limbă și programe comunitare." :
      locale === 'no' ?
      "Vi knytter den rumenske diasporaen i Norge sammen gjennom kulturelle arrangementer, språkkurs og samfunnsprogrammer." :
      "Connecting the Romanian diaspora in Norway through cultural events, language courses, and community programs.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Hanabakken 20",
      "addressLocality": "Sandnes",
      "postalCode": "4328",
      "addressCountry": "NO"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+47-462-37-328",
      "email": "rumensk.kultursenter@gmail.com",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100085325405544"
    ]
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rumensk-kultursenter.no/#website",
    "url": "https://rumensk-kultursenter.no",
    "name": "Rumensk Kultursenter",
    "inLanguage": [locale],
    "publisher": {
      "@id": "https://rumensk-kultursenter.no/#organization"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}
