import React from 'react';
import { useState, useRef, useEffect } from 'react';

export default function CameraBox() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
            video: {width: 1920, height: 1080}
        }).then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(err => {
            console.error(err);
        })
    }

    const takePhoto = () => {
        // display timer then take picture

        const width = 414;
        const height = width/(16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let context = photo.getContext('2d');
        context.drawImage(video, 0, 0, width, height);
    }

    useEffect(() => {
        getVideo();
    }, [videoRef])

    return (
        <div>
            <div>
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>click</button>
            </div>
            <div>
                <canvas ref={photoRef}></canvas>
                <button>close</button>
            </div>
        </div>
    )
}