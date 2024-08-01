import React, { useEffect, useState, useRef } from 'react';
import videoSrc from './assets/electronjs_video.mp4';


function App(){

  const [isVisible, setisVisible] = useState(true)
  const videoRef = useRef(null);

  const reSize = () => {
    const width= 300
    const height= 70

    electron.resizeWindow(width, height);
    startListening()
    setisVisible(false)

    if (videoRef.current) {
      videoRef.current.pause(); 
      videoRef.current.currentTime = 0;
    }
    if (videoRef.current) {
      videoRef.current.style.display = 'none'; // Hide the video
    }
  }

  const [combination, setCombination] = useState('')
  const startListening = () => {
    electron.onKeyCombination((combination) => {
      setCombination(combination);
      console.log('Key Combination:', combination);
    });
  };

  useEffect(() => {
    if(isVisible){
      document.body.classList.add('beforeClick');
      document.body.classList.remove('afterClick');
    }
    else{
      document.body.classList.remove('beforeClick');
      document.body.classList.add('afterClick');
    }
  }, [isVisible])


  return (
    <>
      <video ref={videoRef} autoPlay loop muted style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`${isVisible?'beforeClick':'afterClick'}`}>
        <button onClick={() => {reSize()}} style={{display: isVisible?'block':'none'}}>Start</button>
        <div className='keystrokes'>{combination}</div>
      </div>
    </>
  )
}

export default App

