import { useNavigate } from 'react-router-dom';
import { Navigation } from './components/navigation';
export default function Test() {
    const nav = useNavigate();
    const onNext = () => {
        nav('/take-image', {state: {imageType: 'front', svgType: 'front'}})
    }
    
    return (
        <Navigation/>
        
    )
}
//<button onClick={onNext}> go </button>