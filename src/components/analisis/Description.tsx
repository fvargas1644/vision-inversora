interface DescriptionInterface{
    children: React.ReactNode,
    title: string
}

export default function Description({children, title} : DescriptionInterface){
    return (
        <div className="vi_page_container">
            <article style={{padding: '30px 20px'}}>
                <h2>{title}</h2>
                <p style={{fontSize: '14px'}}>{children}</p>
            </article>
        </div>
    )
}