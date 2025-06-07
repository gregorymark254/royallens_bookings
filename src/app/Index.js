"use client";
import { useEffect, useState } from "react";
import axios from 'axios'
import Pagination from './Pagination'
import Link from 'next/link'

export default function Page() {

  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const getPackages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/packages/')
        setPackages(response.data.items)
        setCount(response.data.count)
        setTotal(response.data.total)
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
        if (!error.response) {
          setError('Network error! Check your connection.');
        } else if (error.response.status) {
          setError(error.response.data.detail);
        } else {
          setError('An unexpected error occurred!');
        }
      }
    }
    getPackages()
  },[])

  return (
    <div>
      <section className="container mx-auto p-4 w-full lg:w-2/3">
        <div className='text-center my-4'>
          <h1 className='text-4xl font-bold'>Book Your Photography Session</h1>
          <h4 className='text-slate-600 text-xl'>Pick a package below to schedule your shoot</h4>
        </div>

        <div>
          {loading ? (
            <div className='flex items-center justify-center'>
              <span>Loading...</span>
            </div>
          ) : error ? (
            <div className='bg-[#e7eaf4] grid place-items-center h-[70vh]'>
              <div className='grid place-items-center text-red-600 p-4'>
                <h3>Error..</h3>
                <span>{error}</span>
              </div>
            </div>
          ) : (
            <div>
              {packages.length > 0 ? (
                <div>
                  <h2 className='text-xl font-bold'><u>Packages</u></h2>
                  {packages.map((item) => (
                    <div key={item.id} className='grid grid-cols-2 lg:grid-cols-5 gap-4 my-4 bg-slate-200 p-4 rounded-lg divide-x'>
                      <div>
                        <img className='w-20 h-20 bg-black' src="https://i.postimg.cc/R0NpvBfZ/white.png" alt="" />
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                        <h4>{item.category}</h4>
                      </div>
                      <div>
                        <p>{item.features}</p>
                        <p>{item.add_ons}</p>
                      </div>
                      <div>
                        <p>KSH. {item.price?.toLocaleString()}</p>
                      </div>
                      <Link href={`/booking/${item.id}`} className='flex items-center justify-start'>
                        <span className="bg-[#F3C42E] hover:bg-[#f0c817ce] text-white rounded-lg px-5 py-2 transition-colors">Book Now</span>
                      </Link>
          
                    </div>
                  ))}
                 </div>
              ) : (
                <div className='grid place-items-center'>
                  <div className='grid place-items-center p-4'>
                    <h3>Info</h3>
                    <h4>No Data</h4>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className='mt-8 flex items-center justify-end'>
            <Pagination
              nPages={Math.ceil(total / recordsPerPage)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>
    </div>
  );
}