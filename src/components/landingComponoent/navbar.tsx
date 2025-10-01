
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { Link } from "react-router";

const Navbar = () => {
  const [nav, setNav]=useState(false)

  const handleNav = () => {
    setNav(!nav)
  }
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='w-auto text-3xl font-bold text-[#00df9a]'>Kudisphere</h1>
        <ul className=' hidden lg:flex'>
          <li className='p-4'>
             <Link to="/" className="">Crypto To NGN</Link>
            </li>
          <li className='p-4'><Link to="/" className="">USD To NGN</Link></li>
          <li className='p-4'><Link to="/" className="">EURO To NGN</Link></li>
          <li className='p-4'><Link to="/" className="">POUNDS To NGN</Link></li>
          <li className='p-4'><Link to="/" className="">CONTACT US</Link></li>
          <li className='p-4'><Link to="/signin" className="">SIGN IN</Link></li>
        </ul>
        <div onClick={handleNav} className='block lg:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          
        </div>
        <div className={nav ? 'fixed left-0 top-0 w-[60%]   h-full m-4 bg-[#000300] ease-in-out duration-700 block lg:hidden' :'fixed left-[-100%]' }>
          <h1 className='w-auto text-3xl font-bold text-[#00df9a]'>Kudisphere</h1>
          <ul className=' uppercase'>
            <li className='p-4 border-b border-gray-600'>Crypto To NGN</li>
            <li className='p-4 border-b border-gray-600'>USD To NGN</li>
            <li className='p-4 border-b border-gray-600'>EURO To NGN</li>
            <li className='p-4 border-b border-gray-600'>POUNDS To NGN</li>
            <li className='p-4 border-b border-gray-600'>CONTACT US</li>
            <li className='p-4'><Link to="/signin" className="">SIGN IN</Link></li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar