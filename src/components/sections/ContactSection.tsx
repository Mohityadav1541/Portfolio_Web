import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    '> Contact Terminal Initialized...',
    '> Ready to receive transmission',
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    const newOutput = [
      ...terminalOutput,
      `> Encrypting message from ${formData.name}...`,
      `> Subject: ${formData.subject}`,
      `> Establishing secure connection...`,
    ];
    setTerminalOutput(newOutput);

    setTimeout(() => {
      const successOutput = [
        ...newOutput,
        '> Message encrypted successfully',
        '> Transmission complete',
        '> Status: DELIVERED',
      ];
      setTerminalOutput(successOutput);
      setStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus('idle');
        setTerminalOutput([
          '> Contact Terminal Initialized...',
          '> Ready to receive transmission',
        ]);
      }, 5000);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-[120rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl text-secondary mb-4">
            {'<'} CONTACT_TERMINAL {'>'}
          </h2>
          <p className="font-heading text-base text-foreground/60">
            // Initiate collaboration protocol
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Terminal Output */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background/60 backdrop-blur-md border-2 border-secondary/30 rounded-lg p-8"
            style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.2)' }}
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-secondary/20">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFD700]"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="ml-4 font-heading text-sm text-foreground/60">contact@terminal:~$</span>
            </div>

            <div className="space-y-2 min-h-[300px]">
              {terminalOutput.map((line, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="font-heading text-sm text-secondary"
                >
                  {line}
                </motion.p>
              ))}
              
              {status === 'sending' && (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center gap-2 mt-4"
                >
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <div className="w-2 h-2 rounded-full bg-secondary" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-secondary" style={{ animationDelay: '0.4s' }}></div>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 mt-4 text-primary"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-heading text-sm">Message delivered successfully!</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block font-heading text-sm text-foreground/80 mb-2">
                  {'>'} NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background/60 backdrop-blur-md border border-primary/30 rounded px-4 py-3 font-heading text-base text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)' }}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-heading text-sm text-foreground/80 mb-2">
                  {'>'} EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background/60 backdrop-blur-md border border-primary/30 rounded px-4 py-3 font-heading text-base text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)' }}
                  placeholder="your.email@domain.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-heading text-sm text-foreground/80 mb-2">
                  {'>'} SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-background/60 backdrop-blur-md border border-primary/30 rounded px-4 py-3 font-heading text-base text-foreground focus:border-primary/60 focus:outline-none transition-colors"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)' }}
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-heading text-sm text-foreground/80 mb-2">
                  {'>'} MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-background/60 backdrop-blur-md border border-primary/30 rounded px-4 py-3 font-heading text-base text-foreground focus:border-primary/60 focus:outline-none transition-colors resize-none"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)' }}
                  placeholder="Enter your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-secondary text-secondary-foreground font-heading text-base px-6 py-4 rounded flex items-center justify-center gap-2 hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)' }}
              >
                {status === 'sending' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    INITIATE_TRANSMISSION
                  </>
                )}
              </motion.button>
            </form>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-background/40 backdrop-blur-md border border-primary/20 rounded-lg p-4 text-center"
              >
                <p className="font-heading text-xs text-foreground/60 mb-1">RESPONSE_TIME</p>
                <p className="font-heading text-lg text-primary">{'<'} 24h</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-background/40 backdrop-blur-md border border-secondary/20 rounded-lg p-4 text-center"
              >
                <p className="font-heading text-xs text-foreground/60 mb-1">ENCRYPTION</p>
                <p className="font-heading text-lg text-secondary">AES-256</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
