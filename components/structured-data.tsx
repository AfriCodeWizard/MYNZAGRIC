import { seedlings } from '@/lib/seedlings-data'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mynzagric.com'

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mynzagric",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Premium grafted fruit seedlings and precision irrigation systems for commercial and home farming",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KE",
      "addressLocality": "Kenya"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254713764658",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Swahili"]
    },
    "sameAs": [
      "https://wa.me/254713764658"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mynzagric",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/seedlings?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProductSchema({ seedling }: { seedling: typeof seedlings[0] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": seedling.name,
    "description": `Premium grafted ${seedling.name.toLowerCase()} seedling. ${seedling.careGuide?.timeToFruit || 'Fast-growing'} variety perfect for commercial and home farming.`,
    "image": seedling.image ? `${baseUrl}${seedling.image}` : undefined,
    "brand": {
      "@type": "Brand",
      "name": "Mynzagric"
    },
    "offers": {
      "@type": "Offer",
      "price": seedling.price,
      "priceCurrency": "KES",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mynzagric"
      }
    },
    "category": seedling.category.charAt(0).toUpperCase() + seedling.category.slice(1)
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${baseUrl}${item.url}`
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}


