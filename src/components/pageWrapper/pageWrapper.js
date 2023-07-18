import './pageWrapper.css'
import Header from './../header/header.js'
import Footer from '../footer/footer'

const PageWrapper = props => {
  return (
    <div className='PageWrapper'>
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default PageWrapper
