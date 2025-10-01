
import Laptop from '../../assets/laptop.jpg'

function Analytics() {
  return (
    <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4 ' src={Laptop} alt='/' />
            <div className='text-[#00df9a] font-bold '>
                <p>Lorem ipsum dolor sit.</p>
                <h1>
                    Lorem ipsum dolor sit amet, consectetu.
                </h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque quo iusto maiores id tempora impedit architecto soluta provident alias quam?</p>

            </div>
        </div>
    </div>
  )
}

export default Analytics