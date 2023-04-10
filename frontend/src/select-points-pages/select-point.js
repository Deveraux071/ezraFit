import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export const SelectPoint = ( {img, type, dict} ) => {
    const [pos, setPos] = useState('left')
    const navigate = useNavigate()
    const location = useLocation();
    
    if (!img) {
        img = location.state.img
        type = location.state.type
        dict = location.state.dict
    }

    const [currType, setCurrType] = useState(type)
    const [currImg, setCurrImg] = useState(img)

    const revertPos = () => {
        if (pos === 'left') {
            setPos('right')
        }
        else {
            setPos('done')
        }
    }

    useEffect(() => {
        if (pos === 'done' && currType !== 'leg') {
            if (currImg === 'spread') {
                if (currType === 'waist' || currType === 'hip' || currType === 'chest') {
                    setCurrImg('side')
                }
                else if (currType === 'neck') {
                    setCurrImg('spread')
                    setCurrType('shoulder')
                }
                else if (currType === 'shoulder') {
                    setCurrImg('spread')
                    setCurrType('wrist')
                }
                else if (currType === 'wrist') {
                    setCurrImg('check')
                    setCurrType('neck')
                }
            }
            else if (currImg === 'side') {
                if (currType === 'waist') {
                    setCurrImg('spread')
                    setCurrType('chest')
                }
                else if (currType === 'chest') {
                    setCurrImg('spread')
                    setCurrType('hip')
                }
                else if (currType === 'hip') {
                    setCurrImg('spread')
                    setCurrType('neck')
                }
            }
            else if (currImg === 'check') {
                if (currType === 'neck') {
                    setCurrImg('check')
                    setCurrType('shoulder')
                }
                else if (currType === 'shoulder') {
                    setCurrImg('leg')
                    setCurrType('waist')
                }
            }
            else if (currImg === 'leg') {
                if (currType === 'waist') {
                    setCurrType('leg')
                }
            }
            setPos('left')
        }
        else if (pos === 'done') {
            navigate('/calculating', {state: {points: dict}})
        }
    }, [pos, ])

    
    const getPos = (e) => {
        console.log(currType)
        console.log(currImg)
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        console.log(dict)
        if (currType in dict) {
            if (currImg in dict[currType]) {
                dict[currType][currImg][pos] = [x, y]
            }
            else {
                dict[currType][currImg] = {}
                dict[currType][currImg][pos] = [x, y]
            }
        }
        else {
            dict[currType] = {}
            dict[currType][currImg] = {}
            dict[currType][currImg][pos] = [x, y]
        }
        revertPos()
        
        return {
            x,
            y
        }
    }

    return (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Typography fontSize='2rem'>Click the {pos} point of the {currType === 'leg' ? 'ankle' : currType}</Typography>
            <img src={localStorage.getItem(currImg)} onClick={(e) => getPos(e)}></img>
        </Box>
        
    )
}