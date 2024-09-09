import {storageService} from './async-storage.service.js'
import {loadFromStorage, saveToStorage} from "./util.service.js";

export const emailService = {
    query,
    save,
    remove,
    getById,
    getDefaultFilter,
    getFilterFromSearchParams,
    getUnreadCount,
}

const STORAGE_KEY = 'emails'

_createEmails()

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY);

    emails = _filterEmails(emails, filterBy);
    // _sortMails(mails, sortBy)
    return emails;

    // if (filterBy) {
    //     let {folder, txt, isRead} = filterBy;
    //
    //     const isReadBool = isRead === 'true';
    //
    //     emails = emails.filter(email =>
    //         (email.from.includes(txt) || email.subject.includes(txt) || email.body.includes(txt)) &&
    //         (isRead === '' || email.isRead === isReadBool) &&
    //         (folder === 'inbox' || email.folder === folder)
    //     );
    // }
    //
    // return emails;
}

async function getUnreadCount() {
    const emails = await storageService.query(STORAGE_KEY);

    return emails.filter(mail => mail.status === 'inbox' && !mail.isRead).length;
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: '',
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter();
    const filterBy = {};

    for (const key in defaultFilter) {
        filterBy[key] = searchParams.get(key) || '';
    }

    return filterBy;
}

function _createEmails() {
    let emails = loadFromStorage(STORAGE_KEY);

    if (emails && emails.length > 0) return

    emails = [
        {
            id: 'e101',
            status: 'inbox',
            subject: 'Miss you!',
            body: 'Would love to catch up sometime.',
            isRead: false,
            isStarred: false,
            sentAt: null,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            status: 'draft',
            subject: 'Meeting Reminder',
            body: 'Don\'t forget our meeting tomorrow at 10am.',
            isRead: true,
            isStarred: false,
            sentAt: null,
            removedAt: null,
            from: 'boss@company.com',
            to: null
        },
        {
            id: 'e103',
            status: 'sent',
            subject: 'Weekend Plans',
            body: 'Are we still on for the hiking trip this weekend?',
            isRead: true,
            isStarred: false,
            sentAt: 1621137930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'user2@appsus.com'
        },
        {
            id: 'e104',
            status: 'sent',
            subject: 'Invoice #12345',
            body: 'Please find the attached invoice for last month\'s services.',
            isRead: true,
            isStarred: true,
            sentAt: 1681139930594,
            removedAt: null,
            from: 'user@appsus.com',
            to: 'user2@appsus.com'
        },
        {
            id: 'e105',
            status: 'trash',
            subject: 'Job Application Update',
            body: 'Thank you for applying. We are reviewing your application.',
            isRead: false,
            isStarred: true,
            sentAt: 1581141930594,
            removedAt: 1581141930594,
            from: 'hr@company.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e106',
            status: 'inbox',
            subject: 'Miss youuuu!',
            body: 'Would love to catch up sometimeeee.',
            isRead: true,
            isStarred: false,
            sentAt: null,
            removedAt: null,
            from: 'tomer@msn.com',
            to: 'user@appsus.com'
        },
    ];

    saveToStorage(STORAGE_KEY, emails);
}

function _filterEmails(emails, filterBy) {
    if (filterBy.status) {
        emails = _filterEmailsByFolder(emails, filterBy.status);
    }
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i');

        emails = emails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from));
    }
    if (typeof filterBy.isRead === 'boolean') {
        emails = emails.filter(mail => mail.isRead === filterBy.isRead);
    }

    return emails;
}

function _filterEmailsByFolder(emails, status) {
    switch (status) {
        case 'inbox':
            emails = emails.filter(mail => (mail.to === loggedinUser.email) && !mail.removedAt);
            break
        case 'sent':
            emails = emails.filter(mail => (mail.from === loggedinUser.email) && mail.sentAt && !mail.removedAt);
            break
        case 'starred':
            emails = emails.filter(mail => mail.isStarred && !mail.removedAt);
            break
        case 'trash':
            emails = emails.filter(mail => mail.removedAt);
            break
        case 'draft':
            emails = emails.filter(mail => mail.status === 'draft' && !mail.sentAt && !mail.removedAt);
            break
    }

    return emails;
}

window.rs = emailService;




