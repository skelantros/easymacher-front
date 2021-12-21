import './Layout.module.css'

const Layout = ({header, body}) => {
    return(
        <section className='myGrid'>
            <div className='header'>
                {header}
            </div>
            <div className='leftSidebar' />
            <div className='body'>
                {body}
            </div>
            <div className='rightSidebar' />
        </section>
    )
}

export default Layout;

