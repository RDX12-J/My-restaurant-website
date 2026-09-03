import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import type { Page } from '@/lib/useNavigation';
import type { RestaurantInfo } from '@/lib/types';
import { createReservation, fetchRestaurantInfo } from '@/lib/api';
import Loading from '@/components/Loading';

interface ReservationProps {
  navigate: (page: Page) => void;
}

const timeSlots = [
  '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30',
];

export default function Reservation({ navigate }: ReservationProps) {
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    party_size: 2,
    reservation_date: '',
    reservation_time: '',
    special_requests: '',
  });

  useEffect(() => {
    fetchRestaurantInfo().then((data) => {
      setInfo(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!form.name || !form.email || !form.reservation_date || !form.reservation_time) {
      setError('Please fill in all required fields.');
      setSubmitting(false);
      return;
    }

    const result = await createReservation({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      party_size: form.party_size,
      reservation_date: form.reservation_date,
      reservation_time: form.reservation_time,
      special_requests: form.special_requests || null,
    });

    setSubmitting(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (loading) return <Loading message="Preparing your table..." />;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 md:py-24 bg-[#0c0c0c] text-center">
        <div className="section-padding">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Book a Table</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light text-white mb-6">
            Reserve Your <span className="italic text-accent">Experience</span>
          </h1>
          <div className="w-16 h-px bg-accent mx-auto mb-6" />
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Secure your table for an unforgettable dining experience. We look forward to welcoming you.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-[#131313]">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            {success ? (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-accent" />
                </div>
                <h2 className="font-serif text-4xl text-white mb-4">Reservation Received!</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-2 leading-relaxed">
                  Thank you, {form.name}. We've received your reservation request for{' '}
                  <span className="text-accent">{form.party_size} guests</span> on{' '}
                  <span className="text-accent">{form.reservation_date}</span> at{' '}
                  <span className="text-accent">{form.reservation_time}</span>.
                </p>
                <p className="text-gray-500 max-w-md mx-auto mb-10 leading-relaxed text-sm">
                  We'll send a confirmation email to {form.email} shortly.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => navigate('menu')}
                    className="px-8 py-3.5 bg-accent text-black text-sm font-semibold tracking-wide uppercase hover:bg-accent-light transition-all duration-300"
                  >
                    Browse Menu
                  </button>
                  <button
                    onClick={() => {
                      setSuccess(false);
                      setForm({
                        name: '', email: '', phone: '', party_size: 2,
                        reservation_date: '', reservation_time: '', special_requests: '',
                      });
                    }}
                    className="px-8 py-3.5 border border-white/20 text-white text-sm font-semibold tracking-wide uppercase hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    Book Another Table
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#1a1a1a] p-6 md:p-10 border border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Full Name *
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

                  {/* Email */}
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

                  {/* Phone */}
                  <div>
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none transition-colors"
                        placeholder="(415) 555-0192"
                      />
                    </div>
                  </div>

                  {/* Party Size */}
                  <div>
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Party Size *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        value={form.party_size}
                        onChange={(e) => handleChange('party_size', parseInt(e.target.value))}
                        required
                        className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                        <option value={13}>Larger Party (13+)</option>
                      </select>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="date"
                        value={form.reservation_date}
                        min={today}
                        onChange={(e) => handleChange('reservation_date', e.target.value)}
                        required
                        className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        value={form.reservation_time}
                        onChange={(e) => handleChange('reservation_time', e.target.value)}
                        required
                        className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="md:col-span-2">
                    <label className="block text-xs text-accent tracking-wider uppercase mb-2">
                      Special Requests
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                      <textarea
                        value={form.special_requests}
                        onChange={(e) => handleChange('special_requests', e.target.value)}
                        rows={4}
                        className="w-full bg-[#0c0c0c] border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-accent focus:outline-none transition-colors resize-none"
                        placeholder="Dietary restrictions, allergies, occasion, seating preferences..."
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-6 flex items-center gap-3 text-red-400 text-sm bg-red-950/30 border border-red-900/40 px-4 py-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-500">
                    Fields marked with * are required.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-10 py-4 bg-accent text-black text-sm font-semibold tracking-wide uppercase hover:bg-accent-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Confirm Reservation'}
                  </button>
                </div>
              </form>
            )}

            {/* Hours Info */}
            {!success && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-[#1a1a1a] p-6 border border-white/5 text-center">
                  <Clock className="w-6 h-6 text-accent mx-auto mb-3" />
                  <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-2">Mon – Fri</h4>
                  <p className="text-gray-400 text-sm">{info?.hours_mon_fri || '11:30 AM – 10:00 PM'}</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 border border-white/5 text-center">
                  <Clock className="w-6 h-6 text-accent mx-auto mb-3" />
                  <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-2">Sat – Sun</h4>
                  <p className="text-gray-400 text-sm">{info?.hours_sat_sun || '5:00 PM – 11:30 PM'}</p>
                </div>
                <div className="bg-[#1a1a1a] p-6 border border-white/5 text-center">
                  <Phone className="w-6 h-6 text-accent mx-auto mb-3" />
                  <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-2">Call Us</h4>
                  <p className="text-gray-400 text-sm">{info?.phone || '(415) 555-0192'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
