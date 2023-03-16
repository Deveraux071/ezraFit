import Webcam from 'react-webcam';
import { useRef, useState } from 'react';

export const Camera = () => {
    const webRef = useRef(null);
    const [imageTaken, setImageTaken] = useState(false);
    const [img, setImg] = useState(null);

    const showImage = () => {
        let img = webRef.current.getScreenshot();
        localStorage.setItem('image1', img);
        setImageTaken(true);
    }
    return (
        <div>
            <Webcam ref={webRef}/>
            <button onClick={() => {showImage()}}>Show image in console</button>
            {imageTaken ? (
                <img src={localStorage.getItem('image1')}></img>
            ) : (<></>)}
        </div>
        
        
    )
}