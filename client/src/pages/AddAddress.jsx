import React, { useEffect, useState } from 'react';
import { assets } from "../assets/assets";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// Input field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
    />
)

const AddAddress = () => {
    const {axios, user, navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            // Convert zipcode and phone to numbers as expected by the model
            const addressData = {
                ...address,
                zipcode: Number(address.zipcode),
                phone: Number(address.phone)
            };
            
            const { data } = await axios.post('/api/address/add', {address: addressData});
            if (data.success) {
                toast.success(data.message);
                navigate('/cart');
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
      if (!user) {
        navigate('/cart');
      }
    }, []);
    

  return (
    <>
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        </div>
        {/* flex flex-col-reverse md:flex-row justify-between */}
        <div className='grid grid-cols-2 gap-5 items-center mt-5'>
            <div>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name={'firstName'} type='text' placeholder='First Name' />
                        <InputField handleChange={handleChange} address={address} name={'lastName'} type='text' placeholder='Last Name' />
                    </div>
                    <InputField handleChange={handleChange} address={address} name={'email'} type='email' placeholder='Email Address' />
                    <InputField handleChange={handleChange} address={address} name={'street'} type='text' placeholder='Street' />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name={'city'} type='text' placeholder='City' />
                        <InputField handleChange={handleChange} address={address} name={'state'} type='text' placeholder='State' />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name={'zipcode'} type='number' placeholder='Zip code' />
                        <InputField handleChange={handleChange} address={address} name={'country'} type='text' placeholder='Country' />
                    </div>
                    <InputField handleChange={handleChange} address={address} name={'phone'} type='text' placeholder='Phone' />
                    <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
                </form>
            </div>
            <img src={assets.add_address_image} alt="Add Address" className='md:mr-16 mb-16 md:mt-0 ml-auto' />
        </div>
    </>
  )
}

export default AddAddress;