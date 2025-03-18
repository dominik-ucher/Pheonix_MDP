import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'flowbite-react';
import Logo from '../../../img/logo_2.jpg';

const Unauthorized_401 = () => {
  return (
    <div className="px-4 py-8 items-center flex justify-center flex-col-reverse lg:flex-row gap-6">
      <div className="w-full lg:w-1/2 relative pb-8 lg:pb-10">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-500 mb-2">401 Unauthorized</h1>
          <h2 className="text-lg lg:text-2xl font-bold text-gray-800 mb-4">
            Oops, looks like you do not have access to this page!
          </h2>
          <p className="text-gray-800 mb-4 text-lg">
            You can login by clicking{' '}
            <Link className="font-bold underline" to="/login">
              here
            </Link>
            , if you do not have a user yet then click{' '}
            <Link className="font-bold underline" to="/register">
              here!
            </Link>
          </p>
          <div className='flex justify-center items-center gap-4'>
            <Button color="dark" size="xl">
                <Link to="/">Back to Home!</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/3 flex justify-center">
        <img className="max-w-full h-auto" src={Logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Unauthorized_401;