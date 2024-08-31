import {useEffect, useState} from "react";

export function EmailFilter({filterBy, onSetFilterBy}) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

    useEffect(() => {
        onSetFilterBy(filterByToEdit);
    }, [filterByToEdit]);

    function handleChange({target}) {
        const {name} = target;
        const value = target.value;

        setFilterByToEdit(prev => ({...prev, [name]: value}));
    }

    return (
        <section className='email-filter'>
            <input
                type="text"
                value={filterBy.txt}
                onChange={handleChange}
                id='txt'
                name='txt'
                placeholder='Search'/>

            <select id="isRead"
                    name="isRead"
                    value={filterByToEdit.isRead}
                    onChange={handleChange}>
                <option value="">All</option>
                <option value='true'>Read</option>
                <option value="false">Unread</option>
            </select>
        </section>
    )
}
