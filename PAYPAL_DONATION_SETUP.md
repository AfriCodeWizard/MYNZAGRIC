# PayPal Donation Feature Setup Guide

## Overview

A donation feature has been added to the Impact page that allows visitors to donate through PayPal to support the project of planting 100 fruit seedlings in every school and hospital in Kenya.

## Features

- **Three Donation Options:**
  - Sponsor a School ($500) - Plant 100 fruit seedlings in a school
  - Sponsor a Hospital ($500) - Plant 100 fruit seedlings in a hospital
  - General Donation ($50) - Support the mission with any amount

- **Custom Amount:** Users can enter any custom donation amount

- **PayPal Integration:** Secure payment processing through PayPal

- **Partner Information:** Displays why the project matters and partner benefits

## Setup Instructions

### 1. Create a PayPal Business Account

1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Sign in with your PayPal business account (or create one)
3. Navigate to Dashboard → My Apps & Credentials

### 2. Create a PayPal App

1. Click "Create App" or "New App"
2. Fill in:
   - **App Name:** Mynzagric Donations
   - **Merchant:** Your business account
3. Click "Create App"
4. You'll receive:
   - **Client ID** (public)
   - **Client Secret** (keep this secret!)

### 3. Get Your PayPal Client ID

1. In the PayPal Developer Dashboard, find your app
2. Copy the **Client ID** (starts with something like `AeA1QIZXiflr1_-...`)

### 4. Add Environment Variable

Add the PayPal Client ID to your environment variables:

**For Local Development (.env.local):**
```env
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id_here
```

**For Vercel Production:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name:** `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - **Value:** Your PayPal Client ID
   - **Environment:** Production, Preview, Development (select all)
3. Click "Save"

### 5. Test the Integration

**Note:** Return and Cancel URLs are automatically configured in the code (see `components/donation/donate-section.tsx`). They point to:
- Success: `/impact?donation=success`
- Cancel: `/impact?donation=cancelled`

You don't need to configure these in PayPal app settings - they're handled dynamically in the payment flow.

#### Sandbox Testing (Recommended First)

1. In PayPal Developer Dashboard, switch to "Sandbox" mode (toggle at top)
2. Use the Sandbox Client ID (starts with `AeA1QIZXiflr1_-...` or similar)
3. Add the Sandbox Client ID to your environment variables
4. Create test accounts in PayPal Sandbox:
   - Go to "Sandbox" → "Accounts"
   - Use the default test accounts or create new ones
5. Test the donation flow on your site
6. Verify payments appear in PayPal Sandbox dashboard

#### Production Testing

1. In PayPal Developer Dashboard, switch to "Live" mode (toggle at top)
2. Use the Live Client ID (different from Sandbox)
3. Update your environment variable with the Live Client ID
4. Redeploy your application
5. Make a small test donation
6. Verify payment in PayPal dashboard (Live mode)
7. Check that success/cancel redirects work correctly

## Donation Options Configuration

You can customize donation amounts in `components/donation/donate-section.tsx`:

```typescript
const donationOptions: DonationOption[] = [
  {
    id: 'school',
    title: 'Sponsor a School',
    description: 'Plant 100 fruit seedlings in a school...',
    amount: 500, // Change this amount
    // ...
  },
  // ...
]
```

## Payment Flow

1. User selects a donation option or enters custom amount
2. User optionally enters name and email
3. PayPal button appears
4. User clicks PayPal button
5. Redirected to PayPal to complete payment
6. After payment:
   - Success: Redirected to `/impact?donation=success`
   - Cancel: Redirected to `/impact?donation=cancelled`

## Handling Successful Payments

Currently, the component shows an alert on successful payment. You can enhance this by:

1. **Sending confirmation email** (requires backend)
2. **Storing donation records** (requires database)
3. **Sending thank you message**
4. **Tracking donation analytics**

## Security Notes

- ✅ Client ID is safe to expose (it's public)
- ✅ Never expose Client Secret (server-side only)
- ✅ All payments are processed securely by PayPal
- ✅ No sensitive payment data touches your server

## Troubleshooting

### PayPal Button Not Appearing

1. Check browser console for errors
2. Verify `NEXT_PUBLIC_PAYPAL_CLIENT_ID` is set correctly
3. Check that PayPal SDK loaded (Network tab)
4. Ensure amount is greater than 0

### Payment Not Processing

1. Verify PayPal app is in "Live" mode (not Sandbox) for production
2. Check PayPal app settings for correct return URLs
3. Verify your PayPal account is verified and active
4. Check PayPal dashboard for transaction logs

### Environment Variable Issues

1. Restart dev server after adding env variable
2. Clear browser cache
3. Verify variable name is exactly `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
4. For Vercel: Redeploy after adding environment variable

## Next Steps (Optional Enhancements)

1. **Backend Integration:**
   - Store donation records in database
   - Send confirmation emails
   - Generate donation receipts

2. **Analytics:**
   - Track donation amounts
   - Monitor conversion rates
   - Analyze popular donation options

3. **Features:**
   - Recurring donations
   - Donation tiers with rewards
   - Donor wall/recognition
   - Impact tracking (trees planted per donation)

## Support

For PayPal integration issues:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal Support](https://www.paypal.com/support)

