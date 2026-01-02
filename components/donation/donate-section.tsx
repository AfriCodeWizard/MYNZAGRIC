'use client'

import { useState, useEffect, useRef } from 'react'
import { Heart, School, Building2, DollarSign, Users, Leaf } from 'lucide-react'
import Script from 'next/script'

declare global {
  interface Window {
    paypal?: any
  }
}

interface DonationOption {
  id: string
  title: string
  description: string
  amount: number
  icon: React.ElementType
  color: string
}

export default function DonateSection() {
  const [paypalLoaded, setPaypalLoaded] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const shouldScrollRef = useRef(false)

  const donationOptions: DonationOption[] = [
    {
      id: 'school',
      title: 'Sponsor a School',
      description: 'Help us plant a full kit of 100 Grafted fruit seedlings in a school. ($500)',
      amount: 500,
      icon: School,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'hospital',
      title: 'Sponsor a Hospital',
      description: 'Help us plant a full kit of 100 Grafted fruit seedlings in a Hospital. ($500)',
      amount: 500,
      icon: Building2,
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'general',
      title: 'General Donation',
      description: 'Support our mission to transform schools and hospitals with Grafted fruit trees ($50)',
      amount: 50,
      icon: Heart,
      color: 'from-green-500 to-emerald-600'
    }
  ]

  useEffect(() => {
    if (paypalLoaded && selectedOption && window.paypal) {
      // Render PayPal button when PayPal SDK is loaded and option is selected
      renderPayPalButton()
      
      // Auto-scroll to PayPal button only if shouldScrollRef is true
      // This prevents scrolling when typing in custom amount field
      if (shouldScrollRef.current) {
        setTimeout(() => {
          const paypalContainer = document.getElementById('paypal-button-container')
          if (paypalContainer) {
            paypalContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center' 
            })
          }
          // Reset the flag after scrolling
          shouldScrollRef.current = false
        }, 300)
      }
    }
  }, [paypalLoaded, selectedOption, customAmount, donorName, donorEmail])

  const getDonationAmount = (): number => {
    if (selectedOption === 'custom') {
      return parseFloat(customAmount) || 0
    }
    const option = donationOptions.find(opt => opt.id === selectedOption)
    return option?.amount || 0
  }

  const renderPayPalButton = () => {
    const container = document.getElementById('paypal-button-container')
    if (!container || !window.paypal) return

    // Clear previous button
    container.innerHTML = ''

    const amount = getDonationAmount()
    if (amount <= 0) return

    const selectedOptionData = donationOptions.find(opt => opt.id === selectedOption)
    const itemName = selectedOptionData 
      ? `${selectedOptionData.title} - 100 Fruit Seedlings`
      : 'General Donation - Fruit Seedling Project'

    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2),
              currency_code: 'USD'
            },
            description: itemName,
            custom_id: selectedOption || 'general'
          }],
          application_context: {
            brand_name: 'Mynzagric',
            landing_page: 'BILLING',
            user_action: 'PAY_NOW',
            return_url: `${window.location.origin}/donate?donation=success`,
            cancel_url: `${window.location.origin}/donate?donation=cancelled`
          }
        })
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          // Handle successful payment
          alert(`Thank you ${details.payer.name.given_name}! Your donation of $${amount} has been received.`)
          // Reset form
          setSelectedOption(null)
          setCustomAmount('')
          setDonorName('')
          setDonorEmail('')
          // Redirect to success page or show success message
          window.location.href = '/donate?donation=success'
        })
      },
      onError: (err: any) => {
        console.error('PayPal error:', err)
        alert('An error occurred with PayPal. Please try again.')
      }
    }).render('#paypal-button-container')
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    setCustomAmount('')
    // Set flag to allow scrolling when PayPal button renders
    shouldScrollRef.current = true
  }

  const handleCustomAmount = () => {
    setSelectedOption('custom')
    // Set flag to allow scrolling when PayPal button renders
    shouldScrollRef.current = true
  }

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'}&currency=USD`}
        strategy="lazyOnload"
        onLoad={() => setPaypalLoaded(true)}
        onError={() => {
          console.error('Failed to load PayPal SDK')
        }}
      />
      
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-900/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Partner with Us to Plant Hope
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transforming Kenya's Schools and Hospitals with Fruit Trees - 100 Pieces per Institution
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4 leading-relaxed">
              Kenya has an average of 97,000 registered schools and 12,000 registered Hospitals. 
              As dedicated sellers of high quality Grafted fruit seedlings, we are on a mission to plant 
              100 Grafted fruit seedlings in all these institutions and make this vision a reality with 
              clear impact driven goals like ending malnutrition amongst students and patients, promoting 
              sustainable Agriculture, environmental benefits like carbon sequestration, biodiversity and 
              food security.
            </p>
          </div>

          {/* Why This Matters */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Leaf className="w-6 h-6 text-green-400" />
              Why This Matters
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-green-400">Fighting Malnutrition</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Malnutrition is a major underlying factor in half of Kenya's high infant and under-five deaths. 
                  While national acute malnutrition is around 6%, it exceeds emergency levels (15%) in Arid and 
                  Semi-Arid Lands (ASALs). Kenya faces undernutrition, micronutrient deficiencies, and rising 
                  obesity (a "triple burden"). Our Grafted fruit seedlings provide quick and long term yielding 
                  vitamin rich fruits that supplement certain meals and educate on healthy lifestyles.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-green-400">Empowering Communities</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Schools gain hands-on learning in agriculture; hospitals offer healing environments 
                  and fresh produce for patients. Each tree planted is a step toward food security and 
                  climate resilience.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-green-400">Proven Impact</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Grafted trees mature in 2-3 years, yielding up to 10x more fruit than traditional ones. 
                  Our goal: 100 trees per institution, starting with schools and hospitals across Kenya.
                </p>
              </div>
            </div>
          </div>

          {/* Donation Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {donationOptions.map((option) => {
              const Icon = option.icon
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    selectedOption === option.id
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-white/10 bg-white/5 hover:border-green-500/50 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{option.description}</p>
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <DollarSign className="w-5 h-5" />
                    <span className="text-2xl">${option.amount}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Custom Amount */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Or Enter Custom Amount</h3>
            <div className="flex gap-4">
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="Enter amount (USD)"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  // Only set selected option, don't trigger auto-scroll while typing
                  // Don't set shouldScrollRef to prevent scrolling
                  if (e.target.value && parseFloat(e.target.value) > 0) {
                    setSelectedOption('custom')
                  } else {
                    setSelectedOption(null)
                  }
                  // Explicitly prevent scrolling by not setting shouldScrollRef
                  shouldScrollRef.current = false
                }}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
              />
              {customAmount && parseFloat(customAmount) > 0 && (
                <button
                  onClick={handleCustomAmount}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Select ${parseFloat(customAmount).toFixed(2)}
                </button>
              )}
            </div>
          </div>

          {/* Donor Information (Optional) */}
          {selectedOption && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Your Information (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
                />
              </div>
            </div>
          )}

          {/* PayPal Button Container */}
          {selectedOption && getDonationAmount() > 0 && (
            <div id="donation-section" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Complete Your Donation
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Donating <span className="text-green-400 font-bold text-xl">${getDonationAmount().toFixed(2)}</span> via PayPal
              </p>
              <div className="flex justify-center items-center w-full">
                <div id="paypal-button-container" className="w-full max-w-md"></div>
              </div>
            </div>
          )}

          {/* Partner Benefits */}
          <div className="mt-12 bg-gradient-to-r from-green-600/10 to-green-700/10 border border-green-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-green-400" />
              Partner Benefits
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              In return, partners receive visibility through co-branded events, impact reports, 
              and tax-deductible donations. Let's turn barren grounds into orchards of opportunity—together, 
              we can curb hunger and grow a healthier Kenya.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We'd love to discuss how we can align our efforts. Please contact us or make a donation 
              to get started.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

