import { useReducer } from 'react';
import Context from './Context';
import reducer, { initialState } from './reducer';
import LoadingOverlay from 'react-loading-overlay-ts';
import RingLoader from 'react-spinners/RingLoader';
import './loading.css';
function Provider({ children }) {
    const [isLoading, dispatch] = useReducer(reducer, initialState);
    // console.log(isLoading);
    return (
        <LoadingOverlay
            // styles={{
            //     _loading_overlay_content: {
            //         width: '400px',
            //         height: '400px',
            //         position: 'fixed',

            //         // overflow: active ? 'hidden' : 'scroll',
            //     },
            // }}
            active={isLoading}
            // styles={{
            //     _loading_overlay_content: {
            //         position: 'fixed',

            //     },
            // }}
            spinner={
                <div
                    style={{
                        marginBottom: '14px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <RingLoader color="#FFFFFF" />
                </div>
            }
            // spinner
            text="Waiting for a Second!! "
        >
            <Context.Provider value={[isLoading, dispatch]}>{children}</Context.Provider>
        </LoadingOverlay>
    );
}

export default Provider;
