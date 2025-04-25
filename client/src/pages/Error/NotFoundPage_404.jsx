import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Logo from '../../../img/logo_w_text.png';

const NotFoundPage_404 = () => {
  return (
    <div className="px-4 py-8 items-center flex justify-center flex-col-reverse lg:flex-row gap-6">
      <div className="w-full lg:w-1/2 relative pb-8 lg:pb-10">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-500 mb-2">404 Page Not Found</h1>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800 mb-6">
            Oops, looks like this page does not exist!
          </h2>
          <div className='flex justify-center items-center gap-4'>
          <Button color="dark" size="xl">
            <Link to="/">Back to Home!</Link>
          </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <img className="mb-20" src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default NotFoundPage_404;