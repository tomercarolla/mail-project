import {EmailPreview} from "./EmailPreview.jsx";
import {Link, Outlet, useParams} from "react-router-dom";

export function EmailList({emails, toggleStar, toggleRead}) {
    return (
        <section className='email-list'>
            <ul>
                {emails.map(email => (
                    <li key={email.id} className={!email.isRead ? 'unread' : ''}>
                        <Link to={`/email/${email.id}`}>
                            <input
                                type="checkbox"
                                className='star'
                                checked={email.isStarred}
                                onChange={(e) => toggleStar(e, email)}/>

                            <EmailPreview email={email}/>

                            <div className="actions">
                                <button className='read' onClick={(e) => toggleRead(e, email)}>Read</button>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
