import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {emailService} from "../services/email.service.js";
import styled from "styled-components";
import {useDateFormatter} from "../services/util.service.js";

export function EmailDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const formattedDate = useDateFormatter();

    useEffect(() => {
        loadEmail();
    }, [])

    async function loadEmail() {
        try {
            const emails = await emailService.getById(id);
            setEmail(emails);
        } catch (err) {
            console.log(err);
            alert('Could not load emails');
        }
    }

    if (!email) return <div>Loading...</div>

    return (
        <Detail>
            <button onClick={() => navigate(-1)}>Back</button>

            <div className="divider"></div>

            <div className="email-content">
                <div className='title'>
                    <h1>{email.subject}</h1>
                    <p>{formattedDate(email.sentAt)}</p>
                </div>
                <p>{email.from}</p>
                <p>{email.body}</p>
            </div>
        </Detail>
    )
}

const Detail = styled.div`
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: #fff;

    .email-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
    }
    
    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .divider {
        width: 100%;
        height: 1px;
        background-color: #000;
    }
`;
