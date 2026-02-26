import { Spinner } from 'react-bootstrap'

export const Loader = ({ show = true }) => {

    return (
        <>
            {show &&
                <div className='MainLoader' style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    background: "#0000003d",
                    height: '100vh',
                    zIndex: 9999
                }}>
                    <Spinner animation="border" size="lg" style={{ color: "white" }} />
                </div>
            }
        </>
    )
}
