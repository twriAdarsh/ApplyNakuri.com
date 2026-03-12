import React from 'react'


export const OurCompanies = () => {
  const companyLogos = [
    {
      id: 1,
      logo: "https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png",
    },
    {
      id: 2,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png",
    },
    {
      id: 3,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wipro_Primary_Logo_Color_RGB.svg/1200px-Wipro_Primary_Logo_Color_RGB.svg.png",
    },
    {
      id: 4,
      logo: "https://static.vecteezy.com/system/resources/thumbnails/013/760/485/small_2x/abstract-connection-logo-illustration-in-trendy-and-minimal-style-png.png",
    },
    {
      id: 5,
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Switch_%28technology_company%29_logo.svg/1200px-Switch_%28technology_company%29_logo.svg.png",
    },
    {
      id: 6,
      logo: "https://companieslogo.com/img/orig/CTSH-82a8444b.png?t=1652276339",
    },
  ]

  return (
    <div className="py-12 bg-gray-50 -mx-4 xl:-mx-24">
      <div className='max-w-screen-xl mx-auto px-6 md:px-12'>
        <h2 className='text-center text-lg md:text-xl font-semibold text-gray-500 mb-8'>Trusted by leading companies</h2>

        <ul className="grid grid-cols-3 md:grid-cols-6 justify-items-center items-center gap-6">
          {companyLogos.map((obj) => (
            <li key={obj.id}>
              <div className="flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300">
                <img
                  src={obj.logo}
                  width={70}
                  height={10}
                  alt="partner company"
                  className="transform hover:scale-110 transition duration-300 ease-in-out grayscale hover:grayscale-0"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
