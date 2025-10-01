

function NewsLetters() {
  return (
    <div className='w-full py-16 px-4 text-white'>
        <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 '>
            <div className='lg:col-span-2'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Stay Aheadof crypto and financial price and update</h1>
                <p>Join our channels </p>
            </div>
            <div className='my-4'>
                <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
                    <input className='p-3 bg-white flex w-full rounded-md text-black' type="number" placeholder='Enter whatsapp number'  />
                    <button className='bg-[#00df9a] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>Add Me</button>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur. <span className='text-[#00df9a]'>Privacy Policy</span></p>
            </div>
        </div>
    </div>
  )
}

export default NewsLetters