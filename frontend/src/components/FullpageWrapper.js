import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import AboutSection from './sections/AboutSection'
import WelcomeSection from './sections/WelcomeSection'
import LogoSection from './sections/LogoSection'
import ServicesSection from './sections/ServicesSection'
import services from '../services/service'
import { useEffect, useState } from 'react'
import '../styles.css'

const FullpageWrapper = ({ setUser }) => {
  const [tiers, setTiers] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await services.getAll()
        setTiers(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchServices()
  }, [])

  return (
    <div>
      <ReactFullpage
        resetSliders={true}
        controlArrows={true}
        animateAnchor={true}
        scrollBar={true}
        keyboardScrolling={true}
        menu={'#menu'} // menu for anchors
        loopHorizontal={true}
        licenseKey={'GPLv3'}
        activeClass={'active'} //adds an active class to the correct menu button
        anchors={['home', 'blog', 'about', 'services']}
        lockAnchors={true} //anchor feature
        navigation={true} //enables cool dots
        arrowNavigation={true} //enables arrows for slides
        slidesNavigation={true}
        slidesNavPosition={'bottom'}
        scrollingSpeed={1000}
        autoScrolling={true}
        loopBottom={true}
        render={({ state, fullpageApi }) => {
          return (
            <div id='fullpage-wrapper' className='Fullpage__Scroll'>
              <div className='section section1'>
                <LogoSection />
              </div>
              <div className='section section2'>
                <WelcomeSection />
              </div>
              <div className='section section3'>
                <AboutSection />
              </div>
              <div className='section section4'>
                <ServicesSection setUser={setUser} tiers={tiers} />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default FullpageWrapper
