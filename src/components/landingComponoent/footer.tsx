
import {
    FaWhatsapp,
    // FaFacebook,
    // FaInstagram,
    // FaTwitterSquare
} from 'react-icons/fa'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
        <div>
            <h1 className='w-full text-3xl font-bold text-[#00df9a]'>Kudisphere</h1>
            <p className='py-4'>Borderless transaction on the Go!</p>
            <div className='flex justify-between md:w-[75%] my-6'>
                
                {/* <a href="" target="_blank" rel="noopener noreferrer"><FaFacebook size={30}/></a> */}
                
                {/* <a href="" target="_blank" rel="noopener noreferrer"><FaInstagram size={30} /></a> */}
                
                {/* <a href="" target="_blank" rel="noopener noreferrer"><FaTwitterSquare size={30} /></a> */}
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><FaWhatsapp style={{ color: 'green', fontSize: '2rem' }} />
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><FaWhatsapp style={{ color: 'green', fontSize: '2rem' }} />
                </a>
                {/* <a href="" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} size="2x" />  </a> */}
            </div>
            </div>
            <div className='lg:col-span-2 flex justify-between'>
                <div>
                    <h6 className='font-medium text-gray-400'>Solution</h6>
                    <ul >
                        <li className='py-2 text-sm'>Analytics</li>
                        <li className='py-2 text-sm'>Contact Us </li>
                        <li className='py-2 text-sm'>FAQ</li>
                        <li className='py-2 text-sm'>Conversion</li>
                        <li className='py-2 text-sm'>Analytics</li>
                    </ul>
                </div>
                 {/* <div>
                    <h6 className='font-medium text-gray-400'>Solution</h6>
                    <ul >
                        <li className='py-2 text-sm'>Analytics</li>
                        <li className='py-2 text-sm'>Contact Us </li>
                        <li className='py-2 text-sm'>FAQ</li>
                        <li className='py-2 text-sm'>Conversion</li>
                        <li className='py-2 text-sm'>Analytics</li>
                    </ul>
                </div> */}
                 {/* <div>
                    <h6 className='font-medium text-gray-400'>Solution</h6>
                    <ul >
                        <li className='py-2 text-sm'>Analytics</li>
                        <li className='py-2 text-sm'>Contact Us </li>
                        <li className='py-2 text-sm'>FAQ</li>
                        <li className='py-2 text-sm'>Conversion</li>
                        <li className='py-2 text-sm'>Analytics</li>
                    </ul>
                </div> */}



            </div>
        
    </div>
  )
}

export default Footer