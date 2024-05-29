// src/pages/ContactUs.js
import React from 'react';

function ContactUs() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-transparent text-white text-center py-6">
        <h1 className="text-4xl font-bold">Experience Authentic Moroccan Hospitality</h1>
        <p className="text-xl mt-2">Stay with Local Families and Learn Traditional Culture</p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Service Description Section */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Services Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-500 bg-opacity-30 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personalized Family Stays</h3>
              <ul className="text-gray-700">
                <li>Each tourist is welcomed into the home of a carefully selected Moroccan family.</li>
                <li>Experience genuine hospitality and build meaningful connections.</li>
                <li>Enjoy comfortable accommodations with all the essential amenities.</li>
              </ul>
            </div>
            {/* Card 2 */}
            <div className="bg-blue-500 bg-opacity-30 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cultural Immersion</h3>
              <ul className="text-gray-700">
                <li>Participate in daily life and traditional practices of Moroccan families.</li>
                <li>Learn to prepare and cook traditional Moroccan cuisine.</li>
                <li>Engage in local customs, rituals, and celebrations.</li>
              </ul>
            </div>
            {/* Card 3 */}
            <div className="bg-blue-500 bg-opacity-30 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Language and Cultural Lessons</h3>
              <ul className="text-gray-700">
                <li>Receive basic language instruction to enhance your communication skills.</li>
                <li>Learn about Moroccan history, arts, and crafts from knowledgeable hosts.</li>
                <li>Participate in traditional music and dance sessions.</li>
              </ul>
            </div>
            {/* Card 4 */}
            <div className="bg-blue-500 bg-opacity-30 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Guided Tours and Activities</h3>
              <ul className="text-gray-700">
                <li>Explore local markets, historical sites, and natural wonders with your host family.</li>
                <li>Enjoy guided tours of famous landmarks and hidden gems.</li>
                <li>Engage in outdoor activities like hiking, camel riding, and desert excursions.</li>
              </ul>
            </div>
            {/* Card 5 */}
            <div className="bg-blue-500 bg-opacity-30 p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tailored Experiences</h3>
              <ul className="text-gray-700">
                <li>Customized itineraries based on your interests and preferences.</li>
                <li>Flexible duration of stay, from short visits to extended stays.</li>
                <li>Options for solo travelers, couples, and families.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-16 bg-blue-500 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-red-600 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            <img src="your-why-choose-us-image-url-1.jpg" alt="Why Choose Us 1" className="w-full h-64 object-cover rounded-lg" />
            <img src="your-why-choose-us-image-url-2.jpg" alt="Why Choose Us 2" className="w-full h-64 object-cover rounded-lg" />
            <img src="your-why-choose-us-image-url-3.jpg" alt="Why Choose Us 3" className="w-full h-64 object-cover rounded-lg" />
            <img src="your-why-choose-us-image-url-4.jpg" alt="Why Choose Us 4" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <ul className="text-gray-700 text-lg list-disc list-inside">
            <li><span className="font-semibold">Authenticity:</span> Immerse yourself in the true essence of Moroccan culture, beyond typical tourist attractions.</li>
            <li><span className="font-semibold">Personal Connection:</span> Build lasting friendships with local families and experience the warmth of Moroccan hospitality.</li>
            <li><span className="font-semibold">Enriching Experience:</span> Gain a deeper understanding of Moroccan traditions, cuisine, and lifestyle.</li>
            <li><span className="font-semibold">Safety and Comfort:</span> Stay with trusted and vetted families who provide a safe and welcoming environment.</li>
            <li><span className="font-semibold">Sustainable Tourism:</span> Support local communities and contribute to the preservation of cultural heritage.</li>
          </ul>
        </section>

        {/* Contact Us Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-700">For more information and to book your stay, please visit our website at <a href="#" className="text-blue-600 underline">[Your Website]</a> or contact us at <a href="mailto:info@yourcompany.com" className="text-blue-600 underline">info@yourcompany.com</a>.</p>
          <p className="text-lg text-gray-700 mt-4">Experience Morocco like a local, with [Your Company Name]. Your home away from home awaits!</p>
        </section>

        {/* Image Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <img src="your-image-url-1.jpg" alt="Image 1" className="w-full h-64 object-cover rounded-lg shadow-lg" />
            <img src="your-image-url-2.jpg" alt="Image 2" className="w-full h-64 object-cover rounded-lg shadow-lg" />
            <img src="your-image-url-3.jpg" alt="Image 3" className="w-full h-64 object-cover rounded-lg shadow-lg" />
          </div>
        </section>
      </main>

      <footer className="bg-blue-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 [Your Company Name]. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactUs;

