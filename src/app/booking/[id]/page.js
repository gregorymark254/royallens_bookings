'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Page() {

    const { id }= useParams()
    const [packages, setPackages] = useState([])
 
  // getting package details
  useEffect(() => {
    const getPackage = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/packages/${id}`)
        setPackages(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getPackage()
  },[id])

    return (
        <div className="container mx-auto p-4 w-full lg:w-2/3">
            <div className='text-center my-4'>
                <h1 className='text-4xl font-bold'>Customize Your Package</h1>
                <h4 className='text-slate-600 text-xl'>Fill in the details below and continue...</h4>
            </div>

            <div>
                <p>{packages.name}</p>
                <p>{packages.category}</p>
                <p>{packages.duration}</p>
                <p>{packages.features}</p>
                <p>{packages.price}</p>
            </div>

            <div>
                from
            </div>
        </div>
    );
}