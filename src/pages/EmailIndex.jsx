import {AsideMenu} from "../components/AsideMenu.jsx";
import {FilterBar} from "../components/FilterBar.jsx";
import {EmailFolderList} from "../components/EmailFolderList.jsx";

export function EmailIndex() {
    return (
        <section className='email-index'>
            <AsideMenu />

            <FilterBar />

            <EmailFolderList />
        </section>
    )
}
