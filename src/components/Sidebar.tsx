import React from 'react';
import { Button } from '@mui/material';

interface SidebarProps {
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
  return (
    <div className='sidebar'>
      <Button onClick={() => onCategoryChange('')}>Home</Button>
      <Button onClick={() => onCategoryChange('airpods')}>AirPods</Button>
      <Button onClick={() => onCategoryChange('laptops')}>Laptops</Button>
      <Button onClick={() => onCategoryChange('mobiles')}>Mobiles</Button>
      <Button onClick={() => onCategoryChange('cameras')}>Cameras</Button>
      <Button onClick={() => onCategoryChange('watches')}>Watches</Button>
    </div>
  );
};

export default Sidebar;

