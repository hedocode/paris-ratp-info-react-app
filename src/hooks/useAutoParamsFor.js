
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePreviousValue from './usePreviousValue';

function useAutoParamsFor(paramName, value, setterToEmptyIfNoPrevious) {
    const [searchParams, setSearchParams] = useSearchParams();
    const previousValue = usePreviousValue(value);

    useEffect(
        () => {
            if (setterToEmptyIfNoPrevious && previousValue) {
                setterToEmptyIfNoPrevious("");
            }
            const newParams = searchParams;
            if(value) {
                newParams.set(paramName, value);
                
            } else  {
                newParams.delete(paramName);
            }
            setSearchParams(newParams);
    
        }, [value]
    )
}

export default useAutoParamsFor;