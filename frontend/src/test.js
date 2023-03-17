import { useNavigate } from 'react-router-dom';

export default function Test() {
    const nav = useNavigate();
    const onNext = () => {
        nav('/take-image', {state: {imageType: 'front', svgType: 'front'}})
    }
    
    return (
        <button onClick={onNext}> go </button>
    )
}