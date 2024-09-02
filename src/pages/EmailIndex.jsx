import {EmailFolderList} from "../components/EmailFolderList.jsx";
import {EmailFilter} from "../components/EmailFilter.jsx";
import {useEffect, useRef, useState} from "react";
import {emailService} from "../services/email.service.js";
import {EmailList} from "../components/EmailList.jsx";
import {Outlet, useLocation, useParams, useSearchParams} from "react-router-dom";
import {debounce, getExistingProperties} from "../services/util.service.js";
import {EmailCompose} from "../components/EmailCompose.jsx";

export function EmailIndex() {
    const [emails, setEmails] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultFilter = emailService.getFilterFromSearchParams(searchParams);
    const [filterBy, setFilterBy] = useState(defaultFilter);
    const {folder, id} = useParams();

    ///todo - fix debounce - 3
    // const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 4000)).current;

    useEffect(() => {
        loadEmails();
        setSearchParams(getExistingProperties(filterBy));
    }, [filterBy, folder]);

    async function loadEmails() {
        try {
            const filter = {
                ...filterBy,
                folder: folder,
            }
            const emails = await emailService.query(filter);

            setEmails(emails);
        } catch (err) {
            console.log(err);
            alert('Could not load emails');
        }
    }

    async function toggleStar(e, selectedEmail) {
        try {
            const updatedEmail = {
                ...selectedEmail,
                isStarred: !selectedEmail.isStarred
            };

            await emailService.save(updatedEmail);
            setEmails(emails.map(email =>
                email.id === updatedEmail.id ? updatedEmail : email
            ));
        } catch (err) {
            console.log(err)
        }
    }

    async function toggleRead(e, selectedEmail) {
        const updatedEmail = {
            ...selectedEmail,
            isRead: !selectedEmail.isRead
        };

        await emailService.save(updatedEmail);
        setEmails(emails.map(email =>
            email.id === updatedEmail.id ? updatedEmail : email
        ));
    }

    function onSetFilterBy(filter) {
        setFilterBy(filter)
    }

    if (!emails) return <div>Loading...</div>

    //todo - fix counter delay - 1
    const counter = emails.filter(email => !email.isRead && (folder === 'inbox' || email.folder !== 'trash')).length;

    return (
        <section className='email-index'>
            <EmailFolderList emailsCount={counter}/>

            <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>

            {!id ? <EmailList folder={folder} emails={emails} toggleStar={toggleStar} toggleRead={toggleRead}/> : (
                <Outlet/>)}

            {searchParams.has('compose') ? <EmailCompose/> : null}
        </section>
    )
}
