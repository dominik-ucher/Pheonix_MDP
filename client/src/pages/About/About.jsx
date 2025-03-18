import React from 'react';
import axios from 'axios';

export default function About() {
    const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_API_URL });

    const teamMembers = [
        {
            name: 'Alfonso Zoia',
            title: 'GSOM',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Simone Cerrato',
            title: 'GSOM',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Stefano Scaccabarozzi',
            title: 'GSOM',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Nicola Bauce',
            title: 'GSOM',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Danilo de Anna',
            title: 'GSOM',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Dominik Leon Ucher',
            title: 'Web Developer',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Abeer Salem Alani',
            title: 'Web Developer',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Miguel Angel Avila Santos',
            title: 'Web Developer',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        },
        {
            name: 'Andreea Bitlan',
            title: 'Web Developer',
            description: 'Student at Politecnico di Milano (POLIMI)',
            imageUrl: '../../../img/profile.jpg'
        }
    ];

    return (
        <div className="p-8 bg-gray-100">
            <section className="mb-8 text-center">
                <h1 className="text-5xl font-bold mb-4">GOLDINGAPP</h1>
                <h2 className="text-2xl font-bold mb-4 text-gray-700">The platform to enhance the professionalism of senior workers</h2>
                <div className="flex flex-col md:flex-row items-center">
                    <img src="../../../img/logo_2.jpg" alt="Description" className="w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6" />
                    <p className="text-lg text-gray-600">GOLDINGAPP® (Phoenix) is an innovative app designed to connect "silver age" workers (50 and over) of the Baby Boomers and X generations with companies looking for skills, experience and suitability. The platform is based on a win-win logic: on the one hand, giving companies privileged access to highly qualified and motivated people; On the other hand, it helps senior professionals to revalue their expertise by providing flexible job opportunities, consultancy or mentorship.</p>
                </div>
            </section>
            <section>
                <h2 className="text-4xl font-semibold mb-6 text-center">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member text-center bg-white p-6 rounded-lg shadow-md">
                            <img src={member.imageUrl} alt={`${member.name}`} className="w-32 h-32 rounded-full mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-800">{member.name}</h3>
                            <p className="text-gray-600">{member.title}</p>
                            <p className="text-gray-500">{member.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}