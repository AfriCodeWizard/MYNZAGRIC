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
      script.onload = () => {
        // Initialize CMS after script loads
        if ((window as any).CMS) {
          ;(window as any).CMS.init({
            config: {
              load_config_file: true,
              config_file_path: '/config.yml'
            }
          })
        }
      }
      document.body.appendChild(script)
    }
  }, [])

  return (
    <>
      <div id="nc-root" />
    </>
  )
}

