import React, { useState, useEffect } from 'react';
import './coding.css';

const Coding = () => {
    const [code, setCode] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const codeExample = `
    1   import Data from './data.js'
    2   const Coding = (data) => {
    3       const User = {
    4           name: 'John',
    5           email: 'jhon54@gmail.com',
    6           age: 30,
    7       }
    8       Data.push(User)
    9       console.log(Data)
    10  }
    `;

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentIndex < codeExample.length) {
                setCode(codeExample.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            } 
            //este codigo para que vuelva a repetir
            // else {
            //     setCurrentIndex(0);
            // }
        }, 50);

        return () => clearInterval(interval);
    }, [currentIndex, codeExample]);

    return (
        <div className="code-example">
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
};

export default Coding;