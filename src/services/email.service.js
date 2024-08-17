import { storageService } from './async-storage.service.js'
import {loadFromStorage, saveToStorage} from "./util.service.js";

export const emailService = {
    query,
    save,
    remove,
    getById,
    createRobot,
    getDefaultFilter,
}

const STORAGE_KEY = 'emails'

_createRobots()

// const loggedinUser = {
//     email: 'user@appsus.com',
//     fullname: 'Mahatma Appsus'
// }

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY);

    // const filterBy = {
    //     status: 'inbox/sent/star/trash',
    //     txt: 'puki', // no need to support complex text search
    //     isRead: true/false/null, // (optional property, if missing: show all)
    // }

    if (filterBy) {
        let { status, txt, isRead } = filterBy

        emails = emails.filter(email => email.subject.includes(txt) || email.body.includes(txt))
    }
    return emails;
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    console.log(emailToSave)
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createRobot(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
    }
}

function getDefaultFilter() {
    return {
        type: '',
        minBatteryStatus: 0,
        maxBattery: '',
        model: ''
    }
}

function _createRobots() {
    let emails = loadFromStorage(STORAGE_KEY);

    if(emails && emails.length > 0) return

    emails = [
        {
            id: 'e101',
            subject: 'Miss you!',
            body: 'Would love to catch up sometime.',
            isRead: false,
            isStarred: false,
            sentAt: 1651133930594,
            removedAt: null,
            from: 'momo@momo.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e102',
            subject: 'Meeting Reminder',
            body: 'Don\'t forget our meeting tomorrow at 10am.',
            isRead: true,
            isStarred: true,
            sentAt: 1551135930594,
            removedAt: null,
            from: 'boss@company.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e103',
            subject: 'Weekend Plans',
            body: 'Are we still on for the hiking trip this weekend?',
            isRead: false,
            isStarred: false,
            sentAt: 1621137930594,
            removedAt: null,
            from: 'friend@social.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e104',
            subject: 'Invoice #12345',
            body: 'Please find the attached invoice for last month\'s services.',
            isRead: true,
            isStarred: false,
            sentAt: 1681139930594,
            removedAt: null,
            from: 'billing@service.com',
            to: 'user@appsus.com'
        },
        {
            id: 'e105',
            subject: 'Job Application Update',
            body: 'Thank you for applying. We are reviewing your application.',
            isRead: false,
            isStarred: true,
            sentAt: 1581141930594,
            removedAt: null,
            from: 'hr@company.com',
            to: 'user@appsus.com'
        }
    ];

    saveToStorage(STORAGE_KEY, emails);
}

window.rs = emailService;




