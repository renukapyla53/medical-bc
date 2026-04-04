import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Heart, Stethoscope, Apple } from 'lucide-react';
import { SupportRequest } from '../../types';

export default function SupportServices() {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'mental-health' as SupportRequest['category'],
    subject: '',
    message: '',
    priority: 'medium' as SupportRequest['priority'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support request submitted! Our team will reach out to you soon.');
    setFormData({
      name: '',
      email: '',
      category: 'mental-health',
      subject: '',
      message: '',
      priority: 'medium',
    });
    setShowRequestForm(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Support Services</h2>
        <p className="text-gray-600">We're here to help you with your health and wellness needs</p>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Support</h3>
        <p className="text-sm text-red-800 mb-4">
          If you're experiencing a medical or mental health emergency, please call 911 or visit your nearest emergency room.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="tel:988"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <Phone size={18} />
            Crisis Hotline: 988
          </a>
          <a
            href="tel:911"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            <Phone size={18} />
            Emergency: 911
          </a>
        </div>
      </div>

      {/* Support Categories */}
      <div>
        <h3 className="text-xl font-semibold mb-4">How Can We Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SupportCategoryCard
            title="Mental Health Support"
            description="Counseling services, stress management, and emotional support"
            icon={Heart}
            color="purple"
            onClick={() => setShowRequestForm(true)}
          />
          <SupportCategoryCard
            title="Physical Health"
            description="Medical consultations, fitness guidance, and injury prevention"
            icon={Stethoscope}
            color="green"
            onClick={() => setShowRequestForm(true)}
          />
          <SupportCategoryCard
            title="Nutrition Counseling"
            description="Dietary advice, meal planning, and nutrition consultations"
            icon={Apple}
            color="orange"
            onClick={() => setShowRequestForm(true)}
          />
        </div>
      </div>

      {/* Contact Methods */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactCard
            icon={Phone}
            title="Call Us"
            description="Monday-Friday, 9am-5pm"
            contact="(555) 123-4567"
            href="tel:+15551234567"
          />
          <ContactCard
            icon={Mail}
            title="Email Us"
            description="We'll respond within 24 hours"
            contact="wellness@university.edu"
            href="mailto:wellness@university.edu"
          />
          <ContactCard
            icon={MessageCircle}
            title="Live Chat"
            description="Available during business hours"
            contact="Start Chat"
            onClick={() => alert('Live chat feature coming soon!')}
          />
        </div>
      </div>

      {/* Request Support Button */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Personalized Support?</h3>
        <p className="text-gray-600 mb-4">
          Submit a support request and our wellness team will reach out to you
        </p>
        <button
          onClick={() => setShowRequestForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Submit Support Request
        </button>
      </div>

      {/* Support Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Submit Support Request</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as SupportRequest['category'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="mental-health">Mental Health</option>
                      <option value="physical-health">Physical Health</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as SupportRequest['priority'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please describe your concern or question..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SupportCategoryCard({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}) {
  const colorClasses = {
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className={`inline-flex p-3 rounded-lg mb-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
        <Icon size={24} />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <button
        onClick={onClick}
        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
      >
        Request Support
      </button>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  description,
  contact,
  href,
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  contact: string;
  href?: string;
  onClick?: () => void;
}) {
  const Component = href ? 'a' : 'button';
  const props = href ? { href } : { onClick };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <Icon size={20} />
        </div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <Component
        {...props}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
      >
        {contact}
      </Component>
    </div>
  );
}
