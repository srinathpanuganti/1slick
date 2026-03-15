// src/components/Pricing.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pricingPlans, companyInfo } from '../data/mockData';
import { USD_TO_INR_RATE, USD_TO_INR_LAST_UPDATED } from '../config/currency';

/**
 * RazorpayButton
 * - Injects Razorpay hosted payment button script into a <form>.
 * - Accepts paymentButtonId (string).
 * - Safe for CSR; does nothing during SSR.
 */
const RazorpayButton = ({ paymentButtonId, className = '' }) => {
  const formRef = useRef(null);

  useEffect(() => {
    if (!paymentButtonId) return;
    if (typeof window === 'undefined' || !formRef.current) return;

    // If a script for this id already exists, don't re-add it.
    const existingScript = document.querySelector(`script[data-payment_button_id="${paymentButtonId}"]`);
    if (existingScript) {
      // If Razorpay already rendered the button elsewhere, ensure there's at least an empty form for accessibility
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.setAttribute('data-payment_button_id', paymentButtonId);

    formRef.current.appendChild(script);

    return () => {
      try {
        if (formRef.current) formRef.current.innerHTML = '';
        if (script.parentNode) script.parentNode.removeChild(script);
      } catch (err) {
        // ignore cleanup errors
      }
    };
  }, [paymentButtonId]);

  // Razorpay will replace/render inside this form
  return <form ref={formRef} className={className} />;
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    document.title = `Pricing - ${companyInfo?.name || 'Company'}`;
  }, []);

  const exchangeRates = {
    USD: 1,
    INR: USD_TO_INR_RATE || 83 // fallback if not provided
  };

  const locale = currency === 'INR' ? 'en-IN' : 'en-US';

  const convertToSelectedCurrency = (amountUSD) => {
    return amountUSD * (exchangeRates[currency] || 1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getPriceDisplay = (price) => {
    const amountUSD = billingCycle === 'yearly' ? price * 12 * 0.8 : price;
    return formatCurrency(convertToSelectedCurrency(amountUSD));
  };

  const getSavingsDisplay = (price) => {
    const monthlyTotalUSD = price * 12;
    const yearlyUSD = price * 12 * 0.8;
    const savingsUSD = monthlyTotalUSD - yearlyUSD;
    return formatCurrency(convertToSelectedCurrency(savingsUSD));
  };

  const getPeriod = () => {
    return billingCycle === 'yearly' ? 'year' : 'month';
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'USD' ? 'INR' : 'USD'));
  };

  const currencyLabel = currency === 'USD' ? 'USD ($)' : 'INR (₹)';
  const currencyCtaLabel = currency === 'USD' ? 'Show in INR (₹)' : 'Show in USD ($)';
  const heroHighlights = [
    {
      title: 'Managed Publishing',
      detail: 'Consistent posts across socials, menus, and TV screens'
    },
    {
      title: 'Creative Toolkit',
      detail: 'Flyers, reels, and visual menus tailored for your brand'
    },
    {
      title: 'Reputation Guard',
      detail: 'Reviews, comments & DMs handled with premium care'
    },
    {
      title: 'Strategic Support',
      detail: 'Dedicated account manager + monthly strategy calls'
    }
  ];

  // Default hosted payment button id (use plan.paymentButtonId if available)
  const DEFAULT_RAZORPAY_BUTTON_ID = 'pl_ReMKG2ApAOOfaQ';

  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-white pt-16 pb-10 lg:pt-24 lg:pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">pricing</p>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Simple <span className="text-gradient">Pricing</span> that scales with you
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  All plans include managed social, review, and menu content—your online presence stays polished
                  without the manual lift.
                </p>
                <div className="grid gap-3 text-sm text-gray-500 sm:grid-cols-3">
                  <li className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm list-none">
                    <Check size={14} className="text-blue-600" />
                    No hidden fees
                  </li>
                  <li className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm list-none">
                    <Check size={14} className="text-blue-600" />
                    Fast setup
                  </li>
                  <li className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 shadow-sm list-none">
                    <Check size={14} className="text-blue-600" />
                    Dedicated account manager
                  </li>
                </div>
                {/* <div className="flex flex-wrap gap-3">
                  <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-blue-700">
                    Book a consultation
                  </button>
                  <button className="rounded-full border border-blue-200 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-blue-600 transition hover:border-blue-400">
                    View case studies
                  </button>
                </div> */}
              </div>
              <div className="space-y-4">
                {heroHighlights.map((highlight) => (
                  <div key={highlight.title} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-lg">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                      <Check size={16} className="text-blue-600" />
                      {highlight.title}
                    </div>
                    <p className="text-sm text-gray-600">{highlight.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-3 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl rounded-[40px] border border-gray-200 bg-blue-50 p-6 shadow-2xl shadow-slate-200/40">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    billingCycle === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>
                  Yearly
                  <span className="ml-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    20% off
                  </span>
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {billingCycle === 'yearly' ? 'Best value for sustained growth' : 'Pay month-to-month'}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={toggleCurrency}
                className="px-4 py-2 rounded-full border border-blue-300 bg-white text-blue-600 font-medium transition hover:bg-blue-100"
              >
                {currencyCtaLabel}
              </button>
              <span className="text-sm text-gray-500">Displaying {currencyLabel} pricing</span>
            </div>
            {currency === 'INR' && (
              <p className="mt-2 text-xs text-gray-400 text-center sm:text-left">
                Converted using 1 USD ≈ ₹{exchangeRates.INR.toLocaleString('en-IN')}
                {USD_TO_INR_LAST_UPDATED ? ` - Updated ${USD_TO_INR_LAST_UPDATED}` : ''}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">packages</p>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold text-gray-900">
              One price, all the support you need
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Transparent plans that bundle design, marketing, and reputation management so you get an organised
              presence without juggling tools.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {pricingPlans.map((plan, index) => {
              const paymentButtonId = plan.paymentButtonId || DEFAULT_RAZORPAY_BUTTON_ID;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative overflow-visible rounded-[32px] border-2 bg-white p-0 shadow-[0_25px_60px_rgba(15,23,42,0.1)] ${
                    plan.popular ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
                      <Star size={14} className="fill-current" />
                      Most Popular
                    </div>
                  )}

                  <div className="flex flex-col gap-6 p-8">
                    <div className="flex flex-col gap-2">
                      <div className="text-sm font-semibold uppercase tracking-wider text-gray-400">Plan</div>
                      <h3 className="text-3xl font-bold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-500">{plan.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-blue-50/80 p-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <span className="text-5xl font-bold text-blue-600">{getPriceDisplay(plan.price)}</span>
                        <span className="text-gray-500 ml-1 text-base">/{getPeriod()}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 shadow-inner">
                          Save {getSavingsDisplay(plan.price)} per year
                        </span>
                      )}
                    </div>

                    <div className="space-y-4 bg-slate-50/80 rounded-2xl border border-slate-100 p-5">
                      <div className="text-sm font-semibold text-gray-900">What's included:</div>
                      <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex gap-3 leading-relaxed">
                            <Check size={18} className="text-blue-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        className={`w-full rounded-2xl px-6 py-3 text-lg font-semibold transition-all duration-300 ${
                          plan.popular
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                        }`}
                      >
                        {plan.buttonText}
                      </button>

                      <div className="space-y-2 text-center text-xs text-gray-500">
                        <div className="min-h-[60px] flex items-center justify-center">
                          <RazorpayButton paymentButtonId={paymentButtonId} className="w-full" />
                        </div>
                        <p>Secure payment powered by Razorpay. (Button ID: {paymentButtonId})</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our pricing? Here are some of the most common questions we receive.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Can I change my plan at any time?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Do you offer custom enterprise solutions?",
                answer: "Absolutely! We work with enterprise clients to create custom solutions that meet their specific requirements. Contact our sales team for more information."
              },
              {
                question: "Is there a free trial available?",
                answer: "We offer a 14-day free trial for all our plans. No credit card required to get started."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely."
              },
              {
                question: "Do you provide refunds?",
                answer: "We offer a 30-day money-back guarantee for all our plans. If you're not satisfied, we'll provide a full refund."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg mb-4 card-hover"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              For enterprise-level requirements or custom integrations, let's discuss a tailored solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center">
                Contact Sales
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <a
                href="mailto:sales@1slicktechnologies.com"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
