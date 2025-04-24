import { useState } from 'react';

import { QueryProvider } from '@/app/providers/query-provider';

function App() {
    const [count, setCount] = useState(0);
    return (
        <>
            <QueryProvider>
                <div>
                    <h1>Hello World</h1>
                    <button onClick={() => setCount(count + 1)}>Click me</button>
                    <p>Count: {count}</p>
                </div>
            </QueryProvider>
        </>
    );
}

export default App;
