import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import type { RestaurantInfo } from '@/lib/types';
import { createContactMessage, fetchRestaurantInfo } from '@/lib/api';
import Loading from '@/components/Loading';

export default function Contact() {
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    fetchRestaurantInfo().then((data) => {
      setInfo(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!form.name || !form.email || !form.message) {
      setError('Please fill in your name, email, and message.');
      setSubmitting(false);
      return;
    }

    const result = await createContactMessage({
      name: form.name,
      email: form.email,
      subject: form.subject || null,
      message: form.message,
    });

    setSubmitting(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (loading) return <Loading message="Loading..." />;

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#0c0c0c] text-center">
        <div className="section-padding">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6">
            Contact <span className="italic text-accent">Us</span>
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Have a question, special request, or planning a private event? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24 bg-[#131313]">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-3xl text-white mb-4">Visit Saveur</h2>
                <p className="text-gray-400 leading-relaxed font-light">
                  We're located in the heart of San Francisco. Whether joining us for lunch, dinner, or a special celebration, we look forward to welcoming you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Address</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {info?.address || '128 Maple Grove Avenue, San Francisco, CA 94102'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Phone</h4>
                    <a href={`tel:${info?.phone}`} className="text-gray-400 text-sm hover:text-accent transition-colors">
                      {info?.phone || '(415) 555-0192'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Email</h4>
                    <a href={`mailto:${info?.email}`} className="text-gray-400 text-sm hover:text-accent transition-colors">
                      {info?.email || 'hello@saveurrestaurant.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-1">Hours</h4>
                    <p className="text-gray-400 text-sm">
                      <span className="text-white/80">Mon – Fri:</span> {info?.hours_mon_fri || '11:30 AM – 10:00 PM'}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      <span className="text-white/80">Sat – Sun:</span> {info?.hours_sat_sun || '5:00 PM – 11:30 PM'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-64 bg-[#1a1a1a] border border-white/10 overflow-hidden">
                <iframe
                  title="Restaurant location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-122.4194,37.7649,-122.3994,37.7849&layer=mapnik&marker=37.7749,-122.4194"
                  className="w-full h-full grayscale contrast-125 opacity-70"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {success ? (
                <div className="bg-[#1a1a1a] p-10 border border-white/10 text-center h-full flex flex-col items-center justify-center animate-fade-in-up">
                  <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-10 h-10 text-accent" />
                  </div>
                  <h2 className="font-serif text-3xl text-white mb-4">Message Sent!</h2>
                  <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
                    Thank you for reaching out, {form.name}. We'll get back to you at {form.email} as soon as possible.
                  </p>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-8 py-3.5 border border-white/20 text-white text-sm font-semibold tracking-wide uppercase hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 md:p-10 border border-white/10">
                  <h2 className="font-serif text-3xl text-white mb-6">Send Us a Message</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                        Your Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          required
                          className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          required
                          className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange('subject', e.target.value)}
                      className="w-full bg-[#0c0c0c] border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none transition-colors"
                      placeholder="Private event inquiry, feedback, etc."
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Your Message *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        required
                        rows={6}
                        className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-6 flex items-center gap-3 text-red-400 text-sm bg-red-950/30 border border-red-900/40 px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto px-10 py-4 bg-accent text-black text-sm font-semibold tracking-wide uppercase hover:bg-accent-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
