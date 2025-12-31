'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, XCircle, X } from 'lucide-react'

export default function DonationMessage() {
  const searchParams = useSearchParams()
  const [showMessage, setShowMessage] = useState(false)
  const [messageType, setMessageType] = useState<'success' | 'cancelled' | null>(null)

  useEffect(() => {
    const donation = searchParams.get('donation')
    if (donation === 'success' || donation === 'cancelled') {
      setMessageType(donation === 'success' ? 'success' : 'cancelled')
      setShowMessage(true)
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 10000)
      
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  if (!showMessage || !messageType) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div
        className={`rounded-2xl p-6 shadow-2xl backdrop-blur-sm border-2 ${
          messageType === 'success'
            ? 'bg-green-500/20 border-green-500 text-white'
            : 'bg-yellow-500/20 border-yellow-500 text-white'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {messageType === 'success' ? (
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            ) : (
              <XCircle className="w-8 h-8 text-yellow-400" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">
              {messageType === 'success'
                ? 'Thank You for Your Donation!'
                : 'Donation Cancelled'}
            </h3>
            <p className="text-sm opacity-90">
              {messageType === 'success'
                ? 'Your generous contribution will help us plant fruit trees in schools and hospitals across Kenya. We truly appreciate your support!'
                : 'Your donation was cancelled. If you experienced any issues, please try again or contact us for assistance.'}
            </p>
          </div>
          <button
            onClick={() => setShowMessage(false)}
            className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
            aria-label="Close message"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

