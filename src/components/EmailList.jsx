import {EmailPreview} from "./EmailPreview.jsx";
import {Link, Outlet, useParams} from "react-router-dom";

export function EmailList({emails, toggleStar, toggleRead}) {
    return (
        <section className='email-list'>
            <ul>
                {emails.map(email => (
                    <li key={email.id}>
                        <Link to={`/email/${email.id}`} className={!email.isRead ? 'unread' : ''}>
                            <div>
                            <input
                                type="checkbox"
                                className='star'
                                checked={email.isStarred}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => toggleStar(e, email)}/>
                            </div>

                            <EmailPreview email={email}/>

                            <div className="actions">
                                <button className='read' onClick={(e) => {
                                    e.preventDefault();
                                    toggleRead(e, email)
                                }}>Read</button>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
