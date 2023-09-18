import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import Navbar from './Navbar'
import WelcomeSection from './sections/WelcomeSection'
import LogoSection from './sections/LogoSection'

const FullpageWrapper = () => {
  const onLeave = (origin, destination, direction) => {
    console.log('Leaving section ' + origin.index)
  }
  const afterLoad = (origin, destination, direction) => {
    console.log('After load: ' + destination.index)
  }

  return (
    <div>
      <ReactFullpage
        offsetSections={false} //used to show non full screen section parts
        resetSliders={true}
        controlArrows={true}
        animateAnchor={true}
        keyboardScrolling={true}
        menu={'#menu'} // menu for anchors
        loopHorizontal={true}
        licenseKey={'GPLv3'}
        activeClass={'active'} //adds an active class to the correct menu button
        anchors={['firstPage', 'secondPage', 'thirdPage', 'fourthPage']}
        lockAnchors={true} //anchor feature
        navigation={true} //enables cool dots
        arrowNavigation={true} //enables arrows for slides
        slidesNavigation={true}
        slidesNavPosition={'bottom'}
        scrollingSpeed={1000} /* used this for something to work... */
        sectionsColor={[]}
        autoScrolling={true}
        fitToSection={true}
        loopBottom={true}
        onLeave={onLeave}
        afterLoad={afterLoad}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className="section section1">
                <LogoSection />
              </div>
              <div className="section section2">
                <WelcomeSection />
              </div>
              <div className="section section3">
                <WelcomeSection />
              </div>
            </div>
          )
        }}
      />
    </div>
  )
}

export default FullpageWrapper
