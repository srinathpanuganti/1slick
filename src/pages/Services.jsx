import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Lightbulb,
  LayoutDashboard,
  Rocket,
  Users,
  Layers,
  Sparkles
} from 'lucide-react';
import { services, companyInfo } from '../data/mockData';

const Services = () => {
  useEffect(() => {
    document.title = `Services - ${companyInfo.name}`;
  }, []);

  const serviceHighlights = [
    {
      title: 'Strategy First',
      description: 'We align every engagement with measurable business goals before we touch the tech stack.',
      icon: Lightbulb
    },
    {
      title: 'Design Meets Engineering',
      description: 'Product strategists, designers, and engineers work as one squad so decisions stay cohesive.',
      icon: LayoutDashboard
    },
    {
      title: 'Growth Partnership',
      description: 'Launch is day one; we continue to iterate, experiment, and scale alongside your team.',
      icon: Rocket
    }
  ];

  const processSteps = [
    {
      title: 'Discovery & Alignment',
      description: 'Immersive workshops uncover customer journeys, stakeholder needs, and the success metrics that matter.'
    },
    {
      title: 'Experience Design',
      description: 'Rapid prototyping and collaborative feedback loops shape intuitive, accessible experiences.'
    },
    {
      title: 'Build & Integrate',
      description: 'Reliable engineering practices deliver secure, performant products ready for real-world demands.'
    },
    {
      title: 'Launch & Optimize',
      description: 'We activate go-to-market support, knowledge transfer, and data-led iteration for sustained growth.'
    }
  ];

  const industries = [
    'SaaS & Platforms',
    'E-commerce & Retail',
    'Fintech & Insurtech',
    'Healthcare & Wellness',
    'Education & Learning',
    'Professional Services'
  ];

  return (
    <div className="">
      <section className="bg-blue-50 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Services designed to accelerate your next <span className="text-gradient">digital product</span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-8">
                From discovery to launch and beyond, {companyInfo.name} combines strategy, design, and engineering to
                ship solutions that move the needle for your customers and your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-blue text-white inline-flex items-center justify-center px-6 py-3"
                >
                  Book a discovery call
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link
                  to="/pricing"
                  className="border border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg inline-flex items-center justify-center px-6 py-3 transition-colors"
                >
                  Explore pricing
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 space-y-6"
            >
              <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-medium">
                <Sparkles size={18} />
                Product leadership on demand
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Layers className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Full lifecycle delivery</p>
                    <p className="text-gray-600">
                      Strategy, design, engineering, QA, and growth support in one integrated engagement.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="text-blue-600 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Embedded partnership</p>
                    <p className="text-gray-600">
                      We operate as an extension of your team, adapting to your tools, rituals, and cadence.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What we build <span className="text-blue-600">with you</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tailored product teams tackle the exact stage you are in, whether you are launching something new,
              modernising legacy systems, or scaling a proven product.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={`${service.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 card-hover"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.features?.length ? (
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={`${service.title}-feature-${idx}`} className="flex items-center text-sm text-gray-500">
                        <CheckCircle size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why teams choose <span className="text-blue-600">{companyInfo.name}</span>
              </h2>
              <p className="text-gray-600 mb-6">
                We meet you where you are, whether that is validating product-market fit, modernising existing stacks,
                or building the next flagship platform. Expect velocity without sacrificing quality.
              </p>
            </motion.div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                    <p className="text-gray-600 text-sm">{highlight.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How we ship products together</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A transparent, collaborative delivery rhythm keeps stakeholders aligned and feedback flowing at every
              milestone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="absolute -top-4 left-6 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-white mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Industries we collaborate with</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our multidisciplinary teams adapt quickly to different verticals while keeping the customer experience at
              the heart of every release.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            {industries.map((industry) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors"
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-blue-600 text-white rounded-3xl px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to plan your next release?</h2>
              <p className="text-lg text-blue-100">
                Let us know where you are in the journey and we'll bring the right blend of strategy, design, and
                engineering talent to help you deliver.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-white text-blue-600 hover:bg-blue-100 rounded-xl px-6 py-3 font-semibold inline-flex items-center justify-center transition-colors"
            >
              Start the conversation
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
