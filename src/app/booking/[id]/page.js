'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { toast } from 'sonner'

export default function Page() {

  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [date, setDate] = useState('');
  const [start_time, setStart_time] = useState('');
  const [end_time, setEnd_time] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [available, setAvailable] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [video, setVideo] = useState(0);

  const [full_name, setFull_name] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [package_id, setPackage_id] = useState(id);
  const [photographers, setPhotographers] = useState(photo);
  const [videographers, setVideographers] = useState(video);
  const [total_amount, setTotal_amount] = useState('');
  const [special_request, setSpecial_request] = useState('');
  const [amount, setAmount] = useState(total_amount);

  const increment = () => setPhoto(prev => prev + 1);
  const decrement = () => {
    if (photo > 0) setPhoto(prev => prev - 1);
  };

  const videoincrement = () => setVideo(prev => prev + 1);
  const videodecrement = () => {
    if (video > 0) setVideo(prev => prev - 1);
  };


  // condtion to add price change when adding photographer or videographer
  useEffect(() => {
  if (packages?.price) {
    const total = packages.price + (photo * 5000) + (video * 8000);
    setTotal_amount(total);
  }
  }, [photo, video, packages]);


  // get the selected package by id
  useEffect(() => {
    const getPackage = async () => {
      try {
        const response = await axios.get(`https://test.roadrimz.com/packages/${id}`);
        setPackages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPackage();
  }, [id]);


  // check if the slot is available
  const checkAvailability = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://test.roadrimz.com/bookings/', {
        date, start_time, end_time
      });
      setAvailable(true);
      setStep(2);
    } catch (error) {
      if (!error?.response) {
        setError('Network Error! Check your connection');
      } else {
        setError(error?.response?.data?.detail || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };


  // make the booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://test.roadrimz.com/bookings/add', {
        date, start_time, end_time, full_name, email, phone, address, package_id,
        location, photographers:photo, videographers:video, total_amount, special_request
      });
      toast.success('Booking successful')
      setStep(3);
    } catch (error) {
      if (!error?.response) {
        toast.error('Network Error! Check your connection');
      } else {
        toast.error(error?.response?.data?.detail || "Something went wrong");
      }
    }
  }

  // send stk push request
  const makePayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://test.roadrimz.com/payments/mpesa', {
        phone, amount, email
      })
      toast.success(`Stk push sent to ${phone}`)
      setStep(3)
    } catch (error) {
      if (!error?.response) {
        toast.error('Network Error! Check your connection');
      } else {
        toast.error(error?.response?.data?.detail || "Something went wrong");
      }
    }
  }

  return (
    <div className="container mx-auto p-4 w-full lg:w-2/3">
      <div className='text-center my-4'>
        <h1 className='text-4xl font-bold'>Customize Your Package</h1>
        <h4 className='text-slate-600 text-xl'>Book a day for your shoot... </h4>
      </div>

      <div className='bg-slate-200 p-4 rounded-lg'>
        <h2><u>Package Details</u></h2>
        <h3 className='font-bold'>{packages.name}</h3>
        <p>{packages.category}</p>
        <p>{packages.duration} HRS</p>
        <p>{packages.features}</p>
        <p>KSH. {packages.price?.toLocaleString()}</p>
      </div>

      {step === 1 && (
        <div className='my-4'>
          {error && (<span className='bg-red-200 text-red-700 p-2 rounded-lg'>{error}</span>)}
          <form onSubmit={checkAvailability}>
            <div className='flex flex-wrap gap-4'>
              <div className='my-2'>
                <label htmlFor="date">Select Date
                  <input 
                    type="date"
                    className="mt-1 block w-full py-2 px-3 border rounded-md"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </label>
              </div>
              <div className='my-2'>
                <label htmlFor="time">Start Time
                  <input 
                    type="time"
                    className="mt-1 block w-full py-2 px-3 border rounded-md"
                    required
                    value={start_time}
                    onChange={(e) => setStart_time(e.target.value)}
                  />
                </label>
              </div>
              <div className='my-2'>
                <label htmlFor="time">End Time
                  <input 
                    type="time"
                    className="mt-1 block w-full py-2 px-3 border rounded-md"
                    required
                    value={end_time}
                    onChange={(e) => setEnd_time(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <button disabled={loading} className="mt-2 py-2 px-4 rounded-md bg-gray-800 text-white cursor-pointer hover:bg-gray-700">
              {loading ? 'Checking...' : 'Check Availability'}
            </button>
          </form>
        </div>
      )}

      {step === 2 && available && (
        <div className="my-4 bg-slate-100 p-4 rounded-lg">
          <div className='text-center'>
            <h2 className="text-lg font-bold text-green-700">Time slot available</h2>
            <p>Continue with your booking details...</p>
          </div>
          
          {/* Step 2 Form Here */}
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className='my-2 p-2 w-full lg:w-1/2 hidden'>
              <label htmlFor='name'>Package Id <span className='text-red-600'>*</span>
                <input 
                  type='number'
                  required
                  className='mt-1 block w-full py-2 px-3 border rounded-md'
                  value={package_id}
                  onChange={(e) => setPackage_id(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-wrap">
              <div className='my-2 p-2 w-full lg:w-1/2'>
                <label htmlFor='name'>Full Name <span className='text-red-600'>*</span>
                  <input 
                    type='text'
                    required
                    className='mt-1 block w-full py-2 px-3 border rounded-md'
                    value={full_name}
                    onChange={(e) => setFull_name(e.target.value)}
                  />
                </label>
              </div>
              <div className='my-2 p-2 w-full lg:w-1/2'>
                <label htmlFor='contact'>Email <span className='text-red-600'>*</span>
                  <input 
                    type='email'
                    required
                    className='mt-1 block w-full py-2 px-3 border rounded-md'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className='my-2 p-2 w-full lg:w-1/2'>
                <label htmlFor='number'>Phone number <span className='text-red-600'>*</span>
                  <input 
                    type='number'
                    required
                    className='mt-1 block w-full py-2 px-3 border rounded-md'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
              </div>
              <div className='my-2 p-2 w-full lg:w-1/2'>
                <label htmlFor='address'>Address <span className='text-red-600'>*</span>
                  <input 
                    type='text'
                    required
                    className='mt-1 block w-full py-2 px-3 border rounded-md'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className='my-2 p-2 w-full lg:w-1/2'>
                <label htmlFor='location'>Shoot Location <span className='text-red-600'>*</span>
                  <input 
                    type='text'
                    required
                    className='mt-1 block w-full py-2 px-3 border rounded-md'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </label>
              </div>
              <div className='my-2'>
                <label htmlFor='photographer' className='block mb-1 font-medium'>
                  Extra Photographer
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrement}
                    className="bg-gray-300 px-3 py-1 rounded-md text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{photo}</span>
                  <button
                    type="button"
                    onClick={increment}
                    className="bg-gray-300 px-3 py-1 rounded-md text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className='my-2'>
                <label htmlFor='photographer' className='block mb-1 font-medium'>
                  Extra Videographer
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={videodecrement}
                    className="bg-gray-300 px-3 py-1 rounded-md text-lg font-bold"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{video}</span>
                  <button
                    type="button"
                    onClick={videoincrement}
                    className="bg-gray-300 px-3 py-1 rounded-md text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className='my-2'>
              <label htmlFor='request'>Special Request <span className='text-slate-200'>(Optional)</span>
                <textarea 
                  name="request" id="request"
                  className='mt-1 block w-full py-2 px-3 border rounded-md'
                  placeholder="Tell us if you had something in mind..."
                  value={special_request}
                  onChange={(e) => setSpecial_request(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="my-4 p-2">
              <h3 className="text-lg font-semibold">Total Amount:</h3>
              <p className="text-2xl font-bold text-green-700">KSH {total_amount?.toLocaleString()}</p>
            </div>
            <button className='mt-2 py-2 px-4 w-full bg-gray-800 text-white cursor-pointer hover:bg-gray-700 rounded-md'>Complete Booking</button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="my-4 bg-slate-100 p-4 rounded-lg">
          <div className='text-center'>
            <h2 className="text-lg font-bold text-green-700">Complete Your Booking</h2>
            <p>Make payment now...</p>
          </div>

          {/* step 3 form */}
          <form className="mt-4" onSubmit={makePayment}>
            <p>Enter your phone number to get a mpesa payment prompt.</p>
            <div className='my-2 p-2 w-full lg:w-1/2'>
              <label htmlFor='name'>Email <span className='text-red-600'>*</span>
                <input 
                  type='email'
                  required
                  className='mt-1 block w-full py-2 px-3 border rounded-md'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className='my-2 p-2 w-full lg:w-1/2'>
              <label htmlFor='name'>Phone number <span className='text-red-600'>*</span>
                <input 
                  type='number'
                  required
                  className='mt-1 block w-full py-2 px-3 border rounded-md'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
            <div className='my-2 p-2 w-full lg:w-1/2'>
              <label htmlFor='name'>Amount
                <input 
                  type='number'
                  required
                  className='mt-1 block w-full py-2 px-3 border rounded-md'
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
            </div>
            <button className='mt-2 py-2 px-4 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 rounded-md'>Make payment</button>
          </form>
        </div>
      )}
    </div>
  );
}
