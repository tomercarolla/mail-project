import {AsideMenu} from "../components/AsideMenu.jsx";
import {FilterBar} from "../components/FilterBar.jsx";
import {useEffect, useState} from "react";
import {emailService} from "../services/email.service.js";
import {EmailList} from "../components/EmailList.jsx";

export function EmailIndex() {
    const [emails, setEmails] = useState(null);

    const defaultFilter = emailService.getDefaultFilter();
    const [filter, setFilter] = useState(defaultFilter);

    useEffect(() => {
        loadEmails();
    }, [filter])

    async function loadEmails() {
        try {
            const emails = await emailService.query(filter);
            setEmails(emails);
        } catch (err) {
            console.log(err);
            alert('Could not load emails');
        }
    }

    function toggleStar(e, selectedEmail) {
        e.stopPropagation();

        const updateEmail = emails.map(email =>
            email.id === selectedEmail.id ? {...email, isStarred: !email.isStarred} : email
        );

        setEmails(updateEmail);
        // emailService.save(selectedEmail);
    }

    function toggleRead(e, selectedEmail) {
        e.stopPropagation();

        const updateEmail = emails.map(email =>
            email.id === selectedEmail.id ? {...email, isRead: !email.isRead} : email
        );

        setEmails(updateEmail);
        // emailService.save(selectedEmail);
    }

    function filterBy(filter) {
        setFilter(filter)
    }

    if (!emails) return <div>Loading...</div>

    return (
        <section className='email-index'>
            <AsideMenu emailsCount={emails.length} />

            <FilterBar filter={filter} filterBy={filterBy} />

            <EmailList emails={emails} toggleStar={toggleStar} toggleRead={toggleRead} />
            {/*<EmailFolderList />*/}
        </section>
    )
}
