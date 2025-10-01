
import { ReactTyped } from 'react-typed';

import { Link } from "react-router";

const Hero = () => {
  return (
    <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <p className='text-[#00df9a] fond-bold p-2'> Join the move! Enjoy</p>
            <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>Borderless Transaction</h1>
            <div>
                <p className='md:text-5xl sm:text-4xl text-xl font-bold py-2'>Send and receive</p>
                <ReactTyped className='md:text-5xl sm:text-4xl text-xl font-bold text-[#00df9a]  ' strings={["cryptocurrency", "USD", "Euro", "Pounds"]} typeSpeed={100} backSpeed={120} loop/>
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-600 pt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic fuga nostrum veritatis provident nobis ad iusto nam facilis quod architecto.</p>

            <button className='bg-[#00df9a] text-black w-[200px] rounded-md font-medium my-6 mx-auto py-3'><Link to="/signup" className="">Get Started</Link></button>

        </div>
    </div>
  )
}

export default Hero