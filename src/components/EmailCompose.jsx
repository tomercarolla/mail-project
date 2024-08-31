import styled from "styled-components";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function EmailCompose() {
    const navigate = useNavigate();
    const location = useLocation();
    const [minimized, setMinimized] = useState(false);

    const handleCloseClick = () => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('compose');
        navigate(`${location.pathname}#${location.hash}?${searchParams.toString()}`);
    };

    return (
        <Compose className={minimized ? 'minimized' : ''}>
            <div className="header">
                <h3>New Message</h3>
                <div className="actions">
                    <button onClick={() => setMinimized(prev => !prev)}>
                        {minimized ? '+' : '-'}
                    </button>
                    <button onClick={handleCloseClick}>x</button>
                </div>
            </div>
            <div className="details">
                <input type='text' className="to" placeholder='To' />
                <input type='text' className="subject" placeholder='Subject' />
            </div>
            <div className="content"></div>
            <div className="footer">
                send
            </div>
        </Compose>
    )
}

const Compose = styled.div`
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 50px;
    background-color: #fff;
    width: 550px;
    height: 500px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: height .3s linear;
    
    &.minimized {
        height: 50px;
    }
    
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }
    
    .details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        
        .to, .subject {
            border: none;
            background-color: #f7f7f7;
            border-radius: 5px;
            padding: 10px;
        }
    }
    
    .content {
        flex: 1;
    }
`;
