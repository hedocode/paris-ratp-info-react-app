
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePreviousValue from './usePreviousValue';

function useAutoParamsFor(
    paramName,
    value,
    setterToEmptyIfNoPrevious,
    defaultValue
) {
    const [searchParams, setSearchParams] = useSearchParams();
    const previousValue = usePreviousValue(value);

    useEffect(
        () => {
            if (setterToEmptyIfNoPrevious && previousValue) {
                setterToEmptyIfNoPrevious(defaultValue || "");
            }
            if(value) {
                searchParams.set(paramName, value);
                
            } else  {
                searchParams.delete(paramName);
            }
            setSearchParams(searchParams);
    
        }, [value]
    )
}

export default useAutoParamsFor;