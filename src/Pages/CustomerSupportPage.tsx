import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const CustomerSupportPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Support</h1>

      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <p className="text-lg text-gray-700 mb-6 text-center">
          We're here to help! Please feel free to reach out to us with any questions, concerns, or feedback.
        </p>

        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-center text-gray-800">
            <FiMail className="text-2xl mr-3 text-teal-600" />
            <p className="text-lg">Email: <a href="mailto:support@bazaarbuddyshop.com" className="text-teal-600 hover:underline">support@bazaarbuddyshop.com</a></p>
          </div>
          <div className="flex items-center justify-center text-gray-800">
            <FiPhone className="text-2xl mr-3 text-teal-600" />
            <p className="text-lg">Phone: <a href="tel:+911234567890" className="text-teal-600 hover:underline">+91 12345 67890</a></p>
          </div>
          <div className="flex items-center justify-center text-gray-800">
            <FiMapPin className="text-2xl mr-3 text-teal-600" />
            <p className="text-lg">Address: 123 E-commerce Street, Digital City, India</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>
          <button type="submit" className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSupportPage;
