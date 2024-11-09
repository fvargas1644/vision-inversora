interface DescriptionInterface{
    children: React.ReactNode,
    title: string
}

export default function Description({children, title} : DescriptionInterface){
    return (
        <div className="vi_page_container">
            <h2>{title}</h2>
            <br />
            {children}
        </div>
    )
}