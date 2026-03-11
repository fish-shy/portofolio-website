"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MotionWrapper, { StaggerWrapper, StaggerItem } from "./MotionWrapper";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "HafizNugraha1311@gmail.com",
      href: "mailto:HafizNugraha1311@gmail.com",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      value: "+62-811-5100-900",
      href: "tel:+628115100900",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      value: "Banjarmasin, Indonesia",
      href: "#",
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:hidden -z-10" />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 dark:bg-green-500/20 rounded-full blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 dark:bg-emerald-500/20 rounded-full blur-[100px]"
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <MotionWrapper className="text-center mb-16">
          <motion.span
            className="inline-block text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-4 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30"
            whileHover={{ scale: 1.05 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Get in touch
            and let&apos;s create something amazing.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full mt-6" />
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <StaggerWrapper className="lg:col-span-1 space-y-6" staggerDelay={0.1}>
            {contactInfo.map((info, index) => (
              <StaggerItem key={index}>
                <motion.a
                  href={info.href}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-all duration-300"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg`}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    {info.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              </StaggerItem>
            ))}

            {/* Social Links */}
            <StaggerItem>
              <motion.div
                className="p-6 rounded-2xl bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Follow Me
                </h3>
                <div className="flex gap-4">
                  {[
                    {
                      href: "https://github.com/fish-shy",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.linkedin.com/in/hafiz-nazwa-nugraha/",
                      icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      ),
                    },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gradient-to-br hover:from-green-500 hover:to-emerald-600 hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerWrapper>

          {/* Contact Form */}
          <MotionWrapper direction="right" delay={0.3} className="lg:col-span-2">
            <motion.form
              onSubmit={handleSubmit}
              className="relative bg-white dark:bg-gray-800/80 rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Background decoration */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl" />

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-700 dark:text-green-400 font-semibold">
                      Thank you! I will get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Your Name
                  </label>
                  <motion.div
                    animate={focusedField === "name" ? { scale: 1.02 } : { scale: 1 }}
                  >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </motion.div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Your Email
                  </label>
                  <motion.div
                    animate={focusedField === "email" ? { scale: 1.02 } : { scale: 1 }}
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Subject
                </label>
                <motion.div
                  animate={focusedField === "subject" ? { scale: 1.01 } : { scale: 1 }}
                >
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all duration-300"
                    placeholder="Project Inquiry"
                  />
                </motion.div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message
                </label>
                <motion.div
                  animate={focusedField === "message" ? { scale: 1.01 } : { scale: 1 }}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white focus:border-green-500 dark:focus:border-green-400 focus:bg-white dark:focus:bg-gray-700 outline-none transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>
              </div>

              <motion.button
                type="submit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl group"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.form>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
