// Components/About.jsx
import React from "react";
import sampleImage from "/texture.png"; // replace with your image path
import team1 from "/text1.jpeg"; // replace with actual team images
import team2 from "/text1.jpeg";
import team3 from "/text1.jpeg";
import team4 from "/text1.jpeg";

function About() {
  const team = [
    { id: 1, name: "Alice Johnson", role: "CEO", img: team1 },
    { id: 2, name: "Michael Smith", role: "CTO", img: team2 },
    { id: 3, name: "Sophia Williams", role: "Designer", img: team3 },
    { id: 4, name: "James Brown", role: "Developer", img: team4 },
    { id: 5, name: "Alice Johnson", role: "CEO", img: team1 },
    { id: 6, name: "Michael Smith", role: "CTO", img: team2 },
    { id: 7, name: "Sophia Williams", role: "Designer", img: team3 },
    { id: 8, name: "James Brown", role: "Developer", img: team4 },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 mb-10" id="about-section">
      <div className="text-center mt-24">
        {/* Pyramid Heading */}
        <h1 className="text-7xl font-bold text-black leading-none">
          Lorem
          <br />
          ipsum dolor
          <br />
          sit amet consectetur
          <br />
          adipisicing elit magni
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-xl text-gray-500">
          We build modern web experiences that empower businesses 🚀. <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
          Eligendi, reiciendis?
        </p>

        {/* Button */}
        <button className="cursor-pointer mt-8 px-8 py-3 bg-gray-200 text-black/80 text-lg font-medium rounded-full shadow-md hover:bg-gray-300 transition duration-300 border border-gray-300">
          Learn More
        </button>
      </div>

      {/* Section + image wrapper */}
      <div className="mt-16 w-full max-w-6xl">
        {/* Section below button */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - heading */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-gray-800">
              We strive to deliver impactful digital products that transform
              businesses.
            </p>
          </div>

          {/* Right side - simple low-light text */}
          <div>
            <p className="text-lg text-gray-500 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
            </p>
          </div>
        </div>

        {/* Full-width image */}
        <div className="mt-12">
          <img
            src={sampleImage}
            alt="About section"
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* 4 Cards Section */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-gray-100 flex flex-col justify-center items-center text-center p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 h-56"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Card {item}
              </h3>
              <p className="text-gray-600">
                This is a description for card {item}. All cards are the same
                size.
              </p>
            </div>
          ))}
        </div>

        {/* Our Team Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          {/* Left heading */}
          <div className="">
            {" "}
            {/* margin-left */}
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              OUR <br />
            </h2>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight ml-4">
              TEAM
            </h2>
          </div>

          {/* Right description */}
          <p className="text-lg text-gray-500">
            Meet the people behind our success — a dedicated and passionate team
            building amazing digital solutions. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quae, delectus. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Maxime quas totam eveniet quae
            reprehenderit, sed placeat omnis rem distinctio voluptates.
          </p>
        </div>

        {/* Team Member Cards */}
       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {team.map((member, index) => (
    <div
      key={member.id}
      className={`bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300
        ${index % 2 === 0 ? "mb-8" : "mt-8"}`} 
    >
      <img
        src={member.img}
        alt={member.name}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900">
        {member.name}
      </h3>
      <p className="text-gray-500">{member.role}</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default About;
