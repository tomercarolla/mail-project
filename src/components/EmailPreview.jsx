export function EmailPreview({email}) {
    return (
        <>
            <p className='text-ellipsis'>{email.from}</p>
            <p className='text-ellipsis'>{email.subject}</p>
        </>
    )
}
