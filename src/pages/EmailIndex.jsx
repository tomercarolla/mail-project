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
    const {pathname} = useLocation();
    const folder = pathname.split('/').pop();
    const defaultFilter = emailService.getFilterFromSearchParams(searchParams);
    const [filterBy, setFilterBy] = useState(defaultFilter);
    const {id} = useParams();
    ///todo - fix debounce - 3
    // const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current;

    // console.log(folder)
    // console.log(filterBy)

    useEffect(() => {
        loadEmails();
        setSearchParams(getExistingProperties(filterBy));
    }, [filterBy, id, pathname])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filterBy);

            setEmails(emails);
        } catch (err) {
            console.log(err);
            alert('Could not load emails');
        }
    }

    function toggleStar(e, selectedEmail) {
        const updateEmail = emails.map(email =>
            email.id === selectedEmail.id ? {...email, isStarred: !email.isStarred} : email
        );

        setEmails(updateEmail);
        ///todo - fix save - 2
        // emailService.save(selectedEmail);
    }

    function toggleRead(e, selectedEmail) {
        const updateEmail = emails.map(email =>
            email.id === selectedEmail.id ? {...email, isRead: !email.isRead} : email
        );

        setEmails(updateEmail);
        ///todo - fix save - 2
        // emailService.save(selectedEmail);
    }

    function onSetFilterBy(filter) {
        setFilterBy(filter)
    }

    if (!emails) return <div>Loading...</div>

    return (
        <section className='email-index'>
            <EmailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} emailsCount={emails.length} />

            <EmailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            {!id ? <EmailList emails={emails} toggleStar={toggleStar} toggleRead={toggleRead} /> : null}

            {searchParams.has('compose') ? <EmailCompose /> : null}

            <Outlet />
        </section>
    )
}
