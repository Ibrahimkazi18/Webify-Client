"use client"

import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import MembershipForm from './membership-form';


const MembershipPage = () => {

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Membership Plans' description='Select a membership plan for your account'/>
      </div>
        <Separator />

        <div>
            <MembershipForm />    
        </div>
    </>
  );
};

export default MembershipPage;
