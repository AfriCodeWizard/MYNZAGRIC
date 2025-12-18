"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function AdminPage() {
  useEffect(() => {
    // Load Decap CMS script
    if (typeof window !== "undefined" && !(window as any).CMS) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <>
      <Script
        id="decap-cms-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.CMS) {
              window.CMS.init();
            }
          `,
        }}
      />
      <div id="nc-root" />
    </>
  )
}

