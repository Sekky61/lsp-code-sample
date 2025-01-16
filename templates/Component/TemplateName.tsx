import type {FC} from 'react';
import {useEffect} from 'react';

import classes from './TemplateName.module.css';
import useLogic from './useLogic';

export type Props = {
    /** Set initial value */
    initialValue?: number;
};

export const TemplateName: FC<Props> = ({initialValue = 0}) => {
    const {count, incrementCount} = useLogic(initialValue);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log('throttle');
    }, []);
    return (
        <div className={classes.templateName}>
            <h2 className={classes.header}>Counter</h2>
            <button className={classes.button} type="button" onClick={incrementCount}>
                Increment by one
            </button>
            <div>
                Total value: <strong>{count}</strong>
            </div>
        </div>
    );
};
