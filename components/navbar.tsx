import { Button } from '@/components/ui/button';
import MobileSidebar from '@/components/mobile-sidebar';

const Navbar = () => {
  return ( 
    <div className='flex items-center p-4'>
      <MobileSidebar />
      <div className='flex w-full justify-end'>
        userButton
      </div>
    </div>
  );
}

export default Navbar;