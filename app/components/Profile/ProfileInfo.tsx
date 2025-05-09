"use client"
import React, { FC, useEffect, useState } from 'react';


import { styles } from "../../../app/styles/Style";
import Image from 'next/image';
import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcons from "../../../public/assests/avatar.jpeg";
import { useActivationMutation} from "../../../redux/features/auth/authApi";
// import useUpdateAvatarMutaion from "../../../redux/features/auth/authApi"

import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  // const [localAvatar, setLocalAvatar] = useState(user.avatar || avatar);
  const [updateAvatar, { isSuccess ,error }] = useUpdateAvatarMutation();
  const[loaduser,setLoadUser]=useState(false);

  const {  } = useLoadUserQuery(undefined, { skip: !isSuccess });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result as string;
        // setLocalAvatar(newAvatar); // Update local state with new avatar
        updateAvatar( avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      // refetch(); // Re-fetch user data
      setLoadUser(true);
      console.log("Avatar updated successfully");
    }
    if (error) {
      console.error("Error updating avatar:", error);
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submit");
    // Add additional logic here if needed
  };

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='relative'>
          <Image
            src={user.avatar||avatar ? user.avatar.url ||avatar: avatarIcons}
            alt=''
            width={120}
            height={120}
            className='w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full'
          />
          <input
            type='file'
            id='avatar'
            className='hidden'
            onChange={imageHandler}
            accept='image/png,image/jpg,image/jpeg,image/webp,image/avif'
          />
          <label htmlFor='avatar'>
            <div className='w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer'>
              <AiOutlineCamera size={20} className='z-1' />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className='w-full pl-6 800px:pl-10'>
        <form onSubmit={handleSubmit}>
          <div className='800px:w-[50%] m-auto black pb-4'>
            <div className='w-[100%]'>
              <label className='block pb-2'>Full Name</label>
              <input
                type='text'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='w-[100%] pt-2'>
              <label className='block pb-2'>Email Address</label>
              <input
                type='text'
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                readOnly
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type='submit'
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
function useUpdateAvatarMutation(): [any, { isSuccess: any; error: any; }] {
  throw new Error('Function not implemented.');
}

