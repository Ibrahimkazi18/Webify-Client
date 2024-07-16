"use client"

import UserForm from "@/components/user-form";

const SetUpPage = async () => {

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-900'>
      <div className='bg-slate-800 h-96 w-96 rounded-md shadow-black shadow-xl p-6'>
        <UserForm />
      </div>
    </div>
  );
}

export default SetUpPage