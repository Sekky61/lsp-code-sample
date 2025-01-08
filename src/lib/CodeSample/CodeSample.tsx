import type {FC} from 'react';

import classes from './CodeSample.module.css';

export type Props = {
    codeSample?: CodeSample;
};

export const CodeSample: FC<Props> = ({codeSample}) => {
    return <div className={classes.counter}>{codeSample?.code}</div>;
};
