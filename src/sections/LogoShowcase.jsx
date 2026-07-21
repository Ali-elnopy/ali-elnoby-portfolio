import React from 'react'
import { logoIconsList } from '../constants'

const LogoIcon = ({icon})=>{
  return(
    <div className='flex-none flex-center marquee-item'>
      <img src={icon.imgPath} alt={`Logo icon ${icon.imgPath}`} />
    </div>
  )
}

const LogoShowcase = () => {
  return (
    <div className='md:my-20 my-10 relative'>
      <div className='gradient-edge'/>
      <div className='gradient-edge'/>

      <div className='marquee h-52'>
        <div className='marquee-box md:gap-12 gap-5'>
          {logoIconsList.map((icon) => (
            <LogoIcon key={icon.imgPath} icon={icon} />
          ))}

          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`${icon.imgPath}-${index}`} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LogoShowcase