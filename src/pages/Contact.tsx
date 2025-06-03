import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, Send, MapPin } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const showToast = useToastStore(state => state.showToast);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // In a real application, you would send this to your server
      // For now, we'll simulate sending an email
      const emailBody = `
        Name: ${data.name}
        Email: ${data.email}
        Subject: ${data.subject}
        Message: ${data.message}
      `;

      // Send email using mailto
      window.location.href = `mailto:hello@propvia.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;

      showToast('Message sent successfully!', 'success');
      reset();
    } catch (error) {
      showToast('Error sending message', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-brand/10 rounded-lg">
                <Mail className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">hello@propvia.com</p>
                <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-brand/10 rounded-lg">
                <MapPin className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="font-medium">Office</h3>
                <p className="text-gray-600">440 Burroughs St #114</p>
                <p className="text-gray-600">Detroit, MI 48202</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-brand/10 rounded-lg">
                <Phone className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">(313) 555-0123</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri from 9am to 6pm EST</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                placeholder="Your name"
              />
              {errors.name && (
                <span className="text-sm text-red-500">Name is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                placeholder="your@email.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">Valid email is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                {...register('subject', { required: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
              >
                <option value="">Select a subject</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Partnership">Partnership</option>
                <option value="Press">Press</option>
                <option value="Other">Other</option>
              </select>
              {errors.subject && (
                <span className="text-sm text-red-500">Subject is required</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                {...register('message', { required: true })}
                rows={6}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand"
                placeholder="Your message..."
              />
              {errors.message && (
                <span className="text-sm text-red-500">Message is required</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}