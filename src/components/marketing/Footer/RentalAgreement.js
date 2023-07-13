import Footer from '../../../components/marketing/Footer/Footer'
import NavBar from '../../../components/marketing/NavBar/NavBar'

const RentalAgreement = () => {
  return (
    <>
      <NavBar selected='info_hub' />

      <div className='policy-container' style={{ width: '100%' }}>
        <div className='policy-header'>
          <p className='policy-title'>Little Big Shed Rental Agreement</p>

          <iframe
            src='/Policies/LBS_Terms&Conditions.pdf#toolbar=0&view=fit'
            title='PDF Document'
            width='100%'
            height='1000px'
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RentalAgreement
