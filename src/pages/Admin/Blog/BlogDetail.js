import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components';
import { Navigation } from '../../../components/FormControles/Navigation/navigation';

const BlogDetail = () => {

    const location = useLocation();
    
    

    useEffect(()=>{
      console.log('state', location.state);
    },[]);

  return (
    <div>BlogDetail</div>
  )
}

export default BlogDetail