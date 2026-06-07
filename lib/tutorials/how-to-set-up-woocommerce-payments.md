---
title: "How to Set Up WooCommerce Payments: Stripe, PayPal & More (2026)"
excerpt: "Accept payments on your WooCommerce store with Stripe, PayPal, or WooCommerce Payments. Step-by-step setup for each payment gateway with fees, pros, and cons compared."
date: "2026-05-20"
readTime: "8 min read"
difficulty: "intermediate"
tags: ["woocommerce", "payments", "stripe", "paypal", "ecommerce", "checkout"]
lastModified: "2026-05-20"
steps:
  - name: "Choose your payment gateway"
    text: "Select Stripe (best overall), PayPal (most recognized), or WooCommerce Payments (built-in Stripe integration). Most stores enable 2-3 options to maximize conversions."
  - name: "Install WooCommerce"
    text: "Ensure WooCommerce is installed and configured. Go to Plugins > Add New, search WooCommerce, install and run the setup wizard."
  - name: "Install your payment gateway plugin"
    text: "For Stripe: install WooCommerce Stripe Payment Gateway (official, free). For PayPal: install WooCommerce PayPal Payments (official, free)."
  - name: "Connect your payment account"
    text: "In WooCommerce > Settings > Payments, activate your gateway and click Set up. Follow the OAuth connection flow to link your Stripe or PayPal account."
  - name: "Test with sandbox mode"
    text: "Enable test/sandbox mode in your gateway settings. Use test card numbers to complete a test purchase and verify everything works before going live."
  - name: "Go live"
    text: "Switch from test mode to live mode in your payment gateway settings. Run a real small test transaction to confirm payments process correctly."
author: marcus
---

Setting up payments is the critical step that transforms a WooCommerce store from a product catalog into a revenue-generating business. This guide covers the three most popular payment gateways: Stripe, PayPal, and WooCommerce Payments.

## Payment Gateway Comparison

| Gateway | Transaction Fees | Card Types | Instant Payouts | Setup Difficulty |
|---------|-----------------|-----------|-----------------|-----------------|
| **Stripe** | 2.9% + $0.30 | All major cards | 2 business days | Easy |
| **PayPal** | 2.99% + fixed fee | PayPal + cards | Instant (PayPal balance) | Easy |
| **WooCommerce Payments** | 2.9% + $0.30 | All major cards | 7 days standard | Easiest |
| **Square** | 2.9% + $0.30 | All major cards | Next business day | Medium |

**Our recommendation:** Enable both **Stripe** and **PayPal**. Stripe for credit/debit card payments, PayPal for customers who prefer PayPal checkout. This maximizes conversions by covering all payment preferences.

## Prerequisites

Before setting up payments:
1. WooCommerce installed and set up with products
2. Store currency configured in WooCommerce → Settings → General
3. SSL certificate active (HTTPS) — required for all payment gateways
4. Business or personal bank account for payouts

## Method 1: Set Up Stripe

Stripe is the best payment gateway for most stores — excellent developer tools, fraud protection, and direct card processing without requiring customers to leave your site.

### Step 1: Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Verify your email
3. Complete business verification (name, address, bank account for payouts)
4. Full verification may take 1–2 business days

### Step 2: Install WooCommerce Stripe Plugin

1. In WordPress, go to **Plugins → Add New**
2. Search **WooCommerce Stripe Payment Gateway** (official by WooCommerce)
3. Install and activate

### Step 3: Configure Stripe in WooCommerce

1. Go to **WooCommerce → Settings → Payments**
2. Click **Set up** next to **Stripe**
3. Toggle **Enable Stripe** ON
4. Click **Connect with Stripe** (OAuth connection — easiest method)
5. Sign in to your Stripe account and authorize the connection
6. Stripe API keys are automatically configured

**Or configure manually:**
1. In Stripe dashboard, go to **Developers → API keys**
2. Copy your **Publishable key** and **Secret key**
3. Paste them in WooCommerce → Settings → Payments → Stripe → API Settings

### Step 4: Configure Stripe Settings

**Payment methods to enable:**
- Credit/Debit cards: ON (always)
- Google Pay: ON (increases mobile conversions)
- Apple Pay: ON (increases iOS conversions)
- iDEAL, Bancontact, etc.: enable if selling to EU customers

**Statement descriptor:** Enter your business name — this appears on customers' bank statements.

**Enable Saved Cards:** Allows returning customers to save card details for faster checkout.

### Step 5: Test Stripe in Sandbox Mode

1. In Stripe WooCommerce settings, enable **Test Mode**
2. Use these test card numbers:
   - **Successful payment:** `4242 4242 4242 4242`, any future date, any 3-digit CVV
   - **Declined card:** `4000 0000 0000 0002`
   - **Requires authentication:** `4000 0025 0000 3155`
3. Complete a test purchase on your store
4. Verify the test order appears in WooCommerce → Orders
5. Check Stripe dashboard in test mode for the test payment
6. Disable Test Mode when ready to go live

## Method 2: Set Up PayPal

PayPal is trusted by 400+ million users worldwide and increases conversion for customers who don't want to enter card details.

### Step 1: Create a PayPal Business Account

1. Go to [paypal.com/business](https://www.paypal.com/business)
2. Create a **Business** account (not Personal)
3. Verify your email and link your bank account
4. For US accounts, SSN/EIN required for full verification

### Step 2: Install WooCommerce PayPal Plugin

1. Install **WooCommerce PayPal Payments** (official plugin)
2. Activate it

### Step 3: Connect PayPal

1. Go to **WooCommerce → Settings → Payments**
2. Click **Set up** next to **PayPal**
3. Click **Connect to PayPal**
4. Sign in to your PayPal Business account and authorize
5. Connection is established via PayPal's OAuth

### Step 4: Configure PayPal Settings

**PayPal Smart Payment Buttons:** Enable — shows PayPal's branded buttons that detect the customer's best payment method.

**Credit and Debit Cards:** Enable — lets customers pay by card through PayPal without a PayPal account.

**PayPal Pay Later:** Enable if available in your country — lets customers pay in installments at no cost to you.

**Advanced Card Processing:** Enable if you want cards processed directly through PayPal Braintree (keeps customers on your site).

### Step 5: Test PayPal

1. Enable **Sandbox** in PayPal settings
2. Create a PayPal Sandbox buyer account at developer.paypal.com
3. Complete a test purchase using the sandbox buyer account
4. Verify order and payment confirmation

## Method 3: WooCommerce Payments (Simplest)

WooCommerce Payments is the official built-in solution — it uses Stripe's infrastructure but is managed from directly within WooCommerce.

**Availability:** US, UK, Australia, Canada, and several European countries.

1. In WooCommerce → Settings → Payments, click **Install** next to WooCommerce Payments
2. Click **Finish setup**
3. Sign in or create a WooCommerce.com account
4. Complete identity verification
5. Connect your bank account for payouts

WooCommerce Payments includes card payments, Apple Pay, Google Pay, and WooPay (Woo's express checkout) — all configurable from one place.

## Setting Up Multiple Payment Methods

Most stores benefit from offering 2–3 payment options. Enable both Stripe and PayPal to cover all customer preferences.

**Recommended configuration for most stores:**
1. **WooCommerce Stripe** — primary card processing
2. **PayPal Payments** — for PayPal users
3. **Cash on Delivery** (optional) — for local businesses

**Order in checkout:** Go to **WooCommerce → Settings → Payments** and drag payment methods into your preferred order. Most stores put Stripe/Cards first, PayPal second.

## Handling Refunds

**Stripe refunds:**
1. In WooCommerce → Orders, find the order
2. Click **Refund**
3. Enter the amount and reason
4. Click **Refund via Stripe**
5. Funds return to the customer's card in 5–10 business days

**PayPal refunds:**
Same process — WooCommerce sends the refund request to PayPal automatically.

## Security and PCI Compliance

All three recommended gateways (Stripe, PayPal, WooCommerce Payments) are PCI DSS compliant — they handle card data on their secure servers, not yours. This keeps your PCI compliance requirements minimal.

**What you must do:**
- Maintain SSL/HTTPS on your store (required, non-negotiable)
- Keep WooCommerce and payment gateway plugins updated
- Use a security plugin (Wordfence) with regular scans

**What you don't need to do:**
- Store card numbers (gateways do this, not you)
- Implement custom PCI controls (covered by using certified gateways)

## Common Payment Issues

**"Sorry, it seems that there are no available payment methods for your state" error:**
Check WooCommerce → Settings → Payments and ensure your enabled gateways are configured for your store's currency and base country.

**Card declined in test mode:**
You're using a real card number in test mode. Use only Stripe's official test card numbers (4242 4242 4242 4242).

**PayPal redirect loop:**
Check that your site URL in WooCommerce matches your domain exactly (no trailing slash discrepancy, correct http vs https).

---

**Need a fast WooCommerce host?** [Cloudways](https://www.cloudways.com/en/?id=2170350) is our top pick for WooCommerce performance — managed cloud hosting with Redis caching and Cloudflare CDN keeps your checkout fast under load.
