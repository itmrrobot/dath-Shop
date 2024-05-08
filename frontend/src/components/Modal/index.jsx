import Modal from 'react-modal';
import './CustomModal.css';
function ModalComp({ children, showModal, handleClose }) {
    // const [showModal, setShowModal] = useState(false);
    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleClose}
            style={{
                // overlay: {
                //     // backgroundColor: 'papayawhip',
                //     zIndex: '10',
                // },
                overlay: {
                    // backgroundColor: 'red',
                    zIndex: '10',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'absolute',
                    // top: '40px',
                    // transform: 'translateY(-50%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    right: '40px',
                    bottom: '40px',
                    border: '1px solid #ccc',
                    // background: 'red',
                    width: '60%',
                    height: '70%',
                    overflow: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    borderRadius: '4px',
                    outline: 'none',
                    padding: '60px',
                },
            }}
            ariaHideApp={false}
        >
            {children}
        </Modal>
    );
}

export default ModalComp;
