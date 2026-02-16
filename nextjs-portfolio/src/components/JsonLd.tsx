import { ReactNode } from 'react';

export function JsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://848deepak.vercel.app/#person',
      name: 'Deepak Pandey',
      url: 'https://848deepak.vercel.app',
      email: 'contact@deepakpandey.dev',
      image: {
        '@type': 'ImageObject',
        url: 'https://848deepak.vercel.app/profile-image.jpg',
        width: 400,
        height: 400,
      },
      jobTitle: 'Full-Stack Developer',
      description: 'Full-stack web developer specializing in React, Next.js, Node.js and modern web technologies. Computer Science Engineering student at Chandigarh University.',
      location: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chandigarh',
          addressRegion: 'Chandigarh',
          addressCountry: 'IN',
          postalCode: '160001',
        },
      },
      sameAs: [
        'https://github.com/848deepak',
        'https://twitter.com/deepakpandey',
        'https://linkedin.com/in/deepakpandey',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'MongoDB',
        'PostgreSQL',
        'Express.js',
        'Docker',
        'AWS',
        'Git',
        'Web Development',
        'Full-Stack Development',
      ],
      workLocation: {
        '@type': 'Place',
        name: 'Remote',
      },
      educationalCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Degree',
        name: 'Bachelor of Engineering in Computer Science',
        issuedBy: {
          '@type': 'EducationalOrganization',
          name: 'Chandigarh University',
          url: 'https://www.cuchd.in',
        },
        areaOfStudy: 'Computer Science Engineering',
        educationLevel: 'http://purl.org/ctdl/terms/BachelorsDegree',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Freelancer',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://848deepak.vercel.app/#website',
      url: 'https://848deepak.vercel.app',
      name: 'Deepak Pandey Portfolio',
      description: 'Full-stack developer portfolio showcasing projects and experience',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://848deepak.vercel.app?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': 'https://848deepak.vercel.app/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://848deepak.vercel.app',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: 'https://848deepak.vercel.app/about',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Projects',
          item: 'https://848deepak.vercel.app/projects',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Experience',
          item: 'https://848deepak.vercel.app/experience',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Skills',
          item: 'https://848deepak.vercel.app/skills',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Contact',
          item: 'https://848deepak.vercel.app/contact',
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((ld, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
    </>
  );
}
