import React from 'react';
import { socialImgs } from '../constants';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='flex flex-col justify-center'>
          <a href="/">Visit My Blog</a>
        </div>
        <div className='socials'>
          {socialImgs.map((socialImg,index)=>(
            <div key={index} className='icon'>
              <a href={socialImg.link} target='_blank'>
                <img src={socialImg.imgPath} alt="social icon" />
              </a>
              
            </div>
          ))}
        </div>
        <div className='flex flex-col justify-center'>
          <p>© {new Date().getFullYear()} Ali Elnoby. All rights reserved.</p>
        </div>
      </div>
      
    </footer>
  )
}

export default Footer