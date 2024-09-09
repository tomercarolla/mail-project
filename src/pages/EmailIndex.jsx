import {EmailFolderList} from "../components/EmailFolderList.jsx";
import {EmailFilter} from "../components/EmailFilter.jsx";
import {useEffect, useRef, useState} from "react";
import {emailService} from "../services/email.service.js";
import {EmailList} from "../components/EmailList.jsx";
import {Outlet, useLocation, useParams, useSearchParams} from "react-router-dom";
import {debounce, getExistingProperties} from "../services/util.service.js";
import {EmailCompose} from "../components/EmailCompose.jsx";
import {showErrorMsg, showSuccessMsg} from "../services/event-bus.service.js";

export function EmailIndex() {
    const params = useParams();
    const [emails, setEmails] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultFilter = emailService.getFilterFromSearchParams(searchParams);
    const [filterBy, setFilterBy] = useState(defaultFilter);
    const {folder, id} = useParams();
    const [unreadCount, setUnreadCount] = useState(0)

    ///todo - fix debounce - 3
    // const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 4000)).current;

    useEffect(() => {
        loadEmails();
        setSearchParams(getExistingProperties(filterBy));
    }, [filterBy, folder]);

    useEffect(() => {
        loadUnReadCount();
    }, [emails, folder]);


    async function loadEmails() {
        try {
            const filter = {
                ...filterBy,
                status: folder,
            };
            const emails = await emailService.query(filter);

            setEmails(emails);
        } catch (err) {
            console.log(err);

            showErrorMsg('Could not load emails');
        }
    }

    async function loadUnReadCount() {
        try {
            const unreadCount = await emailService.getUnreadCount();

            setUnreadCount(unreadCount);
        } catch (err) {
            console.log('Had issues loading unreadCount', err);
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

            showSuccessMsg('selected mails were updated');
        } catch (err) {
            console.log(err);
        }
    }

    async function toggleRead(e, selectedEmail) {
        try {
            const updatedEmail = {
                ...selectedEmail,
                isRead: !selectedEmail.isRead
            };

            await emailService.save(updatedEmail);

            setEmails(emails.map(email =>
                email.id === updatedEmail.id ? updatedEmail : email
            ));

            showSuccessMsg('selected mails were updated');
        } catch (error) {
            console.log('cant update email', error);
        }
    }

    function onSetFilterBy(filter) {
        setFilterBy(filter);
    }

    if (!emails) return <div>Loading...</div>;

    return (
        <section className='email-index'>
            <EmailFolderList emailsCount={unreadCount}/>

            <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy}/>

            {!id ? <EmailList folder={folder} emails={emails} toggleStar={toggleStar} toggleRead={toggleRead}/> : (
                <Outlet/>)}

            {searchParams.has('compose') ? <EmailCompose/> : null}
        </section>
    )
}
