import React from 'react';
import { FaHandsHelping, FaHeart, FaBookOpen, FaShieldAlt, FaLeaf } from 'react-icons/fa';
import image1 from './assets/aboutimages/1.jpeg';
import image2 from './assets/aboutimages/2.jpeg';
import image3 from './assets/aboutimages/3.jpeg';
import image4 from './assets/aboutimages/4.jpeg';

function ContactUs() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-transparent text-black text-center py-6">
        <h1 className="text-4xl font-bold mt-6">Experience Authentic Moroccan Hospitality</h1>
        <p className="text-xl text-gray-700 mt-2">Stay with Local Families and Learn Traditional Culture</p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Service Description Section */}
        <section className="mt-8">
          <h2 className="text-3xl font-semibold text-yellow-600 mb-6 underline underline-offset-8 decoration-yellow-500">Our Services Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personalized Family Stays</h3>
              <ul className="text-gray-700 list-inside list-disc">
                <li>Each tourist is welcomed into the home of a carefully selected Moroccan family.</li>
                <li>Experience genuine hospitality and build meaningful connections.</li>
                <li>Enjoy comfortable accommodations with all the essential amenities.</li>
              </ul>
            </div>
            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cultural Immersion</h3>
              <ul className="text-gray-700 list-inside list-disc">
                <li>Participate in daily life and traditional practices of Moroccan families.</li>
                <li>Learn to prepare and cook traditional Moroccan cuisine.</li>
                <li>Engage in local customs, rituals, and celebrations.</li>
              </ul>
            </div>
            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Language and Cultural Lessons</h3>
              <ul className="text-gray-700 list-inside list-disc">
                <li>Receive basic language instruction to enhance your communication skills.</li>
                <li>Learn about Moroccan history, arts, and crafts from knowledgeable hosts.</li>
                <li>Participate in traditional music and dance sessions.</li>
              </ul>
            </div>
            {/* Card 4 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Guided Tours and Activities</h3>
              <ul className="text-gray-700 list-inside list-disc">
                <li>Explore local markets, historical sites, and natural wonders with your host family.</li>
                <li>Enjoy guided tours of famous landmarks and hidden gems.</li>
                <li>Engage in outdoor activities like hiking, camel riding, and desert excursions.</li>
              </ul>
            </div>
            {/* Card 5 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tailored Experiences</h3>
              <ul className="text-gray-700 list-inside list-disc">
                <li>Customized itineraries based on your interests and preferences.</li>
                <li>Flexible duration of stay, from short visits to extended stays.</li>
                <li>Options for solo travelers, couples, and families.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mt-16 bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-yellow-600 mb-6 underline underline-offset-8 decoration-yellow-500">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
            <img src={image2} alt="Why Choose Us 1" className="w-full h-64 object-cover rounded-lg" />
            <img src={image3} alt="Why Choose Us 2" className="w-full h-64 object-cover rounded-lg" />
            <img src={image1} alt="Why Choose Us 3" className="w-full h-64 object-cover rounded-lg" />
            <img src={image4} alt="Why Choose Us 4" className="w-full h-64 object-cover rounded-lg" />
          </div>
          <ul className="text-gray-700 text-lg list-none">
            <li className="flex items-start mb-4">
              <FaHandsHelping className="text-yellow-600 mr-2 mt-1" />
              <span><span className="font-semibold">Authenticity:</span> Immerse yourself in the true essence of Moroccan culture, beyond typical tourist attractions.</span>
            </li>
            <li className="flex items-start mb-4">
              <FaHeart className="text-yellow-600 mr-2 mt-1" />
              <span><span className="font-semibold">Personal Connection:</span> Build lasting friendships with local families and experience the warmth of Moroccan hospitality.</span>
            </li>
            <li className="flex items-start mb-4">
              <FaBookOpen className="text-yellow-600 mr-2 mt-1" />
              <span><span className="font-semibold">Enriching Experience:</span> Gain a deeper understanding of Moroccan traditions, cuisine, and lifestyle.</span>
            </li>
            <li className="flex items-start mb-4">
              <FaShieldAlt className="text-yellow-600 mr-2 mt-1" />
              <span><span className="font-semibold">Safety and Comfort:</span> Stay with trusted and vetted families who provide a safe and welcoming environment.</span>
            </li>
            <li className="flex items-start mb-4">
              <FaLeaf className="text-yellow-600 mr-2 mt-1" />
              <span><span className="font-semibold">Sustainable Tourism:</span> Support local communities and contribute to the preservation of cultural heritage.</span>
            </li>
          </ul>
        </section>

        {/* Contact Us Section */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-yellow-600 mb-6 underline underline-offset-8 decoration-yellow-500">Contact Us</h2>
          <p className="text-lg text-gray-700">For more information and to book your stay, please visit our website at <a href="#" className="text-yellow-600 underline">LocalLens</a> or contact us at <a href="mailto:support@LocalLens.com" className="text-yellow-600 underline">support@LocalLens.com</a></p>
          <p className="text-lg text-gray-700 mt-4">Experience Morocco like a local, with LocalLens. Your home away from home awaits!</p>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 LocalLens. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ContactUs;
