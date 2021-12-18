import './Layout.module.css'

const Layout = ({header, body, footer}) => {
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
            <div className='footer'>
                {footer}
            </div>
        </section>
    )
}

export default Layout;