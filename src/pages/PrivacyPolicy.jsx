import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { privacyPolicy, companyInfo } from '../data/mockData';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = `Privacy Policy - ${companyInfo.name}`;
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
              <ShieldCheck size={18} />
              Updated {privacyPolicy.lastUpdated}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600">{privacyPolicy.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl space-y-10">
          {privacyPolicy.sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="p-6 rounded-2xl border border-gray-100 shadow-sm bg-white"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2 leading-relaxed">
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
