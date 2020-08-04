import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPins } from '../actions/pins';

const Pin = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPins(1));
    }, [dispatch])

    return (
        <div>

        </div>
    )
}

export default Pin;