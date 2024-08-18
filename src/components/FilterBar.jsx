import {useEffect, useState} from "react";

export function FilterBar({filter, filterBy}) {
    const [ filterByToEdit, setFilterByToEdit ] = useState(filterBy);

    useEffect(() => {
        filterBy(filterByToEdit)
    }, [filterByToEdit]);

    function handleChange({ target }) {
        const { type, name } = target;
        const value = target.value;

        setFilterByToEdit(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section className='filter-bar'>
            <input
                type="text"
                value={filterBy.txt}
                onChange={handleChange}
                id='txt'
                name='txt'
                placeholder='Search'/>
        </section>
    )
}
