import { useForm } from 'react-hook-form';
import { useToastStore } from '../store/toastStore';
import { sendContactMessage } from '../api/contact';
import { Mail, Phone, MapPin, MessageCircle, Send, Building2 } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const showToast = useToastStore((s) => s.showToast);

  const onSubmit = async (data: ContactFormData) => {
    try {
      await sendContactMessage(data);
      showToast('Message sent successfully!', 'success');
      reset();
    } catch (err: any) {
      showToast(err.message || 'Failed to send message', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-700 via-brand to-brand-900 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&q=80"
            alt="Contact us"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand-900/80"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent font-semibold rounded-full text-sm backdrop-blur-sm border border-accent/30">
                💬 Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Let's Transform Properties{' '}
              <span className="text-accent bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
                Together
              </span>
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Ready to revolutionize your property investment strategy? Our team is here to help you make data-driven decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-brand mb-6">Get Started Today</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    Whether you're an investor, business owner, or municipal leader, we're here to provide 
                    the insights you need to make informed property decisions in Detroit.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-brand mb-1">Email Us</h3>
                        <p className="text-gray-600">hello@propvia.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-brand mb-1">Call Us</h3>
                        <p className="text-gray-600">+1 (313) 555-0123</p>
                      </div>
                    </div>
                  </div>

                  <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-brand mb-1">Visit Us</h3>
                        <p className="text-gray-600">440 Burroughs Street #114<br />Detroit, MI 48202</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-2xl border border-accent/20">
                  <h3 className="text-lg font-semibold text-brand mb-4">Why Choose Propvia?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand">24hrs</div>
                      <div className="text-sm text-gray-600">Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand">95%</div>
                      <div className="text-sm text-gray-600">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-light rounded-xl flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-brand" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand">Send us a message</h3>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 mr-1">⚠️</span>
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 mr-1">⚠️</span>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm"
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 mr-1">⚠️</span>
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 text-sm resize-none"
                      placeholder="Tell us about your property investment goals..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <span className="w-4 h-4 mr-1">⚠️</span>
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full inline-flex justify-center items-center px-6 py-4 bg-gradient-to-r from-brand to-brand-600 text-white font-bold rounded-xl hover:from-brand-600 hover:to-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
