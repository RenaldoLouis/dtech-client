import { Button } from 'daya_cipta_erp';
import { useState } from 'react';
import reactLogo from '../../../assets/react.svg';
import "./Home.css";
import viteLogo from '/vite.svg';

const Home = () => {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <Button label={"asdas"} primary={true}></Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default Home;