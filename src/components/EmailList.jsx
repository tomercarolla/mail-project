import {EmailPreview} from "./EmailPreview.jsx";

export function EmailList({emails, toggleStar, toggleRead}) {
    return (
        <section className='email-list'>
            <ul>
                {emails.map(email => (
                    <li key={email.id} className={!email.isRead ? 'unread' : ''}>
                        <input
                            type="checkbox"
                            className='star'
                            checked={email.isStarred}
                            onChange={(e) => toggleStar(e, email)} />
                        <EmailPreview email={email} />
                        <div className="actions">
                            <button className='read' onClick={(e) => toggleRead(e, email)}>Read</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
