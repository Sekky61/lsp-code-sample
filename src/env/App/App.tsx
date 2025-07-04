import type {FC} from 'react';

import './index.css';
import '../../lib/CodeSample/CodeSample.css';

import {CodeSample} from '@/lib';
import type {CodeSampleObject} from '@/lib/types';

import j from '../../lib/CodeSample/__tests__/testingData.json';

const App: FC = () => {
    return (
        <div>
            <CodeSample codeSample={j as unknown as CodeSampleObject} />
        </div>
    );
};

export default App;
