import {eventBusService} from '../services/event-bus.service.js'
import {useState, useEffect, useRef} from 'react'
import styled from "styled-components";
import {Icon} from "@mui/material";


export function UserMsg() {
    const [msg, setMsg] = useState(null);
    const timeoutIdRef = useRef();


    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', msg => {
            setMsg(msg);

            if (timeoutIdRef.current) {
                timeoutIdRef.current = null;

                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout(closeMsg, 3000);
        });

        return unsubscribe;
    }, [])


    function closeMsg() {
        setMsg(null);
    }


    if (!msg) return null;

    return (
        <ToastMessage className={`${msg.type}`}>
            {msg.txt}
            <Icon>close</Icon>
        </ToastMessage>
    )
}

const ToastMessage = styled.section`
    background-color: #292c29;
    padding: 0.7em;
    position: fixed;
    bottom: 1em;
    left: 1em;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 0.4em;

    &.success {
        color: white;
    }

    &.error {
        border: 1px rgb(243, 84, 84) solid;
        color: white;
    }

    span {
        color: white;
        cursor: pointer;
    }
`;