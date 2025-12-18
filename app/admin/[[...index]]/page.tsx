"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function AdminIndexPage() {
  useEffect(() => {
    // Initialize Decap CMS
    if (typeof window !== "undefined" && (window as any).CMS) {
      ;(window as any).CMS.init()
    }
  }, [])

  return (
    <>
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="afterInteractive"
      />
      <div id="nc-root" />
      <Script
        id="decap-cms"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `,
        }}
      />
    </>
  )
}

