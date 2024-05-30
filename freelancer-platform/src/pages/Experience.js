import React, { useState, useEffect } from 'react';

const initialExperiences = [
  {
    id: 1,
    title: 'Exploring Marrakech',
    description: 'Discover the bustling souks, stunning palaces, and vibrant street life of Marrakech.',
    imageUrl: 'https://th.bing.com/th/id/OIP.mztu60OoCaToHajlSWJ0gQHaE7?w=2000&h=1333&rs=1&pid=ImgDetMain'
  },
  {
    id: 2,
    title: 'Camel Ride in the Sahara',
    description: 'Experience the breathtaking beauty of the Sahara Desert on a camel ride.',
    imageUrl: 'https://passengerbirds.com/wp-content/uploads/2022/07/morocco-travel-guide-and-sahara-desert-tour-experiences-1000x600.jpg'
  },
  {
    id: 3,
    title: 'Hiking in the Atlas Mountains',
    description: 'Enjoy scenic trails, Berber villages, and stunning mountain views in the Atlas Mountains.',
    imageUrl: 'https://th.bing.com/th/id/OIP._sr2WC4n1Pn7ZteRLZyRKAHaHa?w=750&h=750&rs=1&pid=ImgDetMain'
  }
];

const ExperienceCard = ({ title, description, imageUrl }) => (
  <div className="bg-blue-100 shadow-lg rounded-lg overflow-hidden m-4 w-full md:w-1/3">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">{title}</h2>
      <p className="text-blue-700">{description}</p>
    </div>
  </div>
);

function Experience() {
  const [experiences, setExperiences] = useState(() => {
    const savedExperiences = localStorage.getItem('experiences');
    return savedExperiences ? JSON.parse(savedExperiences) : initialExperiences;
  });

  const [newExperience, setNewExperience] = useState({ title: '', description: '', imageUrl: '' });

  useEffect(() => {
    localStorage.setItem('experiences', JSON.stringify(experiences));
  }, [experiences]);

  const addExperience = () => {
    if (newExperience.title && newExperience.description && newExperience.imageUrl) {
      setExperiences([
        ...experiences,
        { ...newExperience, id: experiences.length + 1 }
      ]);
      setNewExperience({ title: '', description: '', imageUrl: '' });
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center">Tourist Experiences in Morocco</h1>
        <p className="text-blue-700 text-center mt-4 mx-auto max-w-2xl">
          Morocco is a land of rich culture and history, deeply influenced by the Amazigh people, also known as Berbers. 
          The Amazigh culture is one of the oldest in the world, with a history spanning over 2975 years. 
          From their unique language and vibrant art to their traditional music and dance, the Amazigh have left an indelible mark on Morocco's cultural landscape. 
          Explore the enchanting history and vibrant traditions of the Amazigh as you discover the beauty of Morocco.
        </p>
        <div className="flex justify-center mt-8">
          <img src="https://th.bing.com/th/id/R.b70b1087a31f2610161cf7323875290d?rik=OxhWyjUUHzspag&pid=ImgRaw&r=0" alt="Amazigh Culture 1" className="w-32 h-32 object-cover rounded-full mx-2" />
          <img src="https://th.bing.com/th/id/R.becc7c23550b917ade28347493ca1cdf?rik=c83D%2fXCWXLSmIg&pid=ImgRaw&r=0" alt="Amazigh Culture 2" className="w-32 h-32 object-cover rounded-full mx-2" />
          <img src="https://th.bing.com/th/id/R.bfed8829143f95f6afc9a9f6b9b1a1ba?rik=MCUaekALOqqhBg&pid=ImgRaw&r=0" alt="Amazigh Culture 3" className="w-32 h-32 object-cover rounded-full mx-2" />
          <img src="https://th.bing.com/th/id/R.2470458a41aebbbc5277805df717edf9?rik=k51wLAeBu5Voig&pid=ImgRaw&r=0" alt="Amazigh Culture 4" className="w-32 h-32 object-cover rounded-full mx-2" />
        </div>
      </header>
      <div className="flex flex-wrap justify-center">
        {experiences.map(exp => (
          <ExperienceCard key={exp.id} title={exp.title} description={exp.description} imageUrl={exp.imageUrl} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="bg-blue-100 shadow-lg rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3">
          <h2 className="text-2xl font-bold text-blue-900 mb-2 text-center">Add Your Experience</h2>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-4 border rounded border-blue-300"
            value={newExperience.title}
            onChange={e => setNewExperience({ ...newExperience, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 mb-4 border rounded border-blue-300"
            value={newExperience.description}
            onChange={e => setNewExperience({ ...newExperience, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="w-full p-2 mb-4 border rounded border-blue-300"
            value={newExperience.imageUrl}
            onChange={e => setNewExperience({ ...newExperience, imageUrl: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            onClick={addExperience}
          >
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
}

export default Experience;

