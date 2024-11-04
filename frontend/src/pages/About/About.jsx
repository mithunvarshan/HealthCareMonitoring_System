
import { assets } from '/src/assets/assets_frontend/assets';

const About = () => {
  return (
    <div className='text-gray-500'>
      {/* About Us Heading */}
      <div className='text-center text-2xl pt-10'>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      {/* About Us Content */}
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About Prescripto" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm'>
          <p>Welcome to Prescripto, your trusted partner in managing your healthcare needs.</p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance patient care and streamline access to healthcare resources.
          </p>
          <b className='text-gray-800'>Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for everyone, simplifying access to healthcare and empowering people to take charge of their health.
          </p>
        </div>
      </div>

      {/* Why Choose Us Heading */}
      <div className='text-center text-xl my-4'>
        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span>
        </p>
      </div>

      {/* Why Choose Us Content */}
      <div className='flex flex-col md:flex-row mb-20 gap-8'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]'>
          <b>Efficiency :</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]'>
          <b>Convenience :</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px]'>
          <b>Personalization :</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
