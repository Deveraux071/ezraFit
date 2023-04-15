import { Helmet } from 'react-helmet';
import { Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const nexts = {
    'spread': {
        'waist': {
            'img': 'side',
            'type': 'waist'
        }, 
        'hip': {
            'img': 'side',
            'type': 'hip'
        }, 
        'chest': {
            'img': 'side',
            'type': 'chest'
        }, 
        'neck': {
            'img': 'spread',
            'type': 'shoulder'
        }, 
        'shoulder': {
            'img': 'spread',
            'type': 'wrist'
        }, 
        'wrist': {
            'img': 'check',
            'type': 'neck'
        }, 
    },
    'side': {
        'waist': {
            'img': 'spread',
            'type': 'chest'
        },
        'chest': {
            'img': 'spread',
            'type': 'hip'
        },
        'hip': {
            'img': 'spread',
            'type': 'neck'
        }
    },
    'check': {
        'neck': {
            'img': 'check',
            'type': 'shoulder'
        },
        'shoulder': {
            'img': 'leg',
            'type': 'waist'
        },
    },
    'leg': {
        'waist': {
            'img': 'leg',
            'type': 'leg'
        }
    }
}

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
            let found = false;
            for (const img in nexts) {
                for (const type in nexts[img]) {
                    if (img !== currImg) {
                        break;
                    }
                    else if (type === currType) {
                        setCurrImg(nexts[img][type]['img'])
                        setCurrType(nexts[img][type]['type'])
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            setPos('left')
        }
        else if (pos === 'done') {
            navigate('/calculating', {state: {points: dict}})
        }
    }, [pos, ])

    
    const getPos = (e) => {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
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
            <Helmet>
                <title>Get Measurements - Select Image Point | EzraFit</title>
            </Helmet>
            <Typography fontSize='2rem'>Click the {pos} point of the {currType === 'leg' ? 'ankle' : currType}</Typography>
            <img data-testid='img' src={localStorage.getItem(currImg)} alt={currType} onClick={(e) => getPos(e)}></img>
        </Box>
    )
}
