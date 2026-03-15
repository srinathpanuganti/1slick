import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { faqs, companyInfo } from '../data/mockData';

const FAQ = () => {
  useEffect(() => {
    document.title = `FAQ - ${companyInfo.name}`;
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-blue-50 pt-24 pb-16 lg:pt-32 lg:pb-32">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="inline-flex items-center gap-2 text-blue-600 uppercase tracking-widest font-semibold text-sm mb-4">
              <HelpCircle size={18} />
              Answers on demand
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              A quick reference for the conversations we have most often with new partners.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
