import type {FC} from 'react';

import {CodeSample} from '@/lib';
import './index.css';
import type {CodeSampleObject} from '@/lib/CodeSample/CodeSampleProps';

import j from '../../lib/CodeSample/__tests__/testingData.json';

const App: FC = () => {
    return (
        <div>
            <CodeSample codeSample={j as unknown as CodeSampleObject} />
        </div>
    );
};

export default App;
