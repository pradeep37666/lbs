import Footer from '../../../components/marketing/Footer/Footer'
import NavBar from '../../../components/marketing/NavBar/NavBar'

const CancellationPolicy = () => {
  return (
    <>
      <NavBar selected='info_hub' />
      <div className='policy-container'>
        <div className='policy-header'>
          <p className='policy-title'>
            Little Big Shed Cancellations and Refund Policy
          </p>
          <p className='policy-sub-title'>
            Our General Rental Agreement and Privacy Policy apply to this
            policy.
            <br />
            Our Cancellations and Refund Policy is designed to protect both
            lenders and borrowers. If either party wants to cancel an order
            after it has been confirmed by the Lender, the cancelling party must
            promptly notify the other party through the in-app chat. <br />
            <br />
            <strong>For Lenders:</strong> <br />
            If you cancel a Hire Item you will need to contact&nbsp;
            <a href='mailto:support@littlebigshed.com'>
              support@littlebigshed.com
            </a>
            &nbsp;in order to release the funds. You will be charged a payment
            fee for the facilitation of the transaction. If the parties cannot
            agree whether the Hire Item is substantially different to as
            advertised, the parties must use their best endeavours to resolve
            the issue. <br />
            <br />
            <strong>For Borrower:</strong>
            <br />
            If you cancel a Hire Item you will need to contact&nbsp;
            <a href='mailto:support@littlebigshed.com'>
              support@littlebigshed.com
            </a>
            &nbsp;in order to release the funds. You will be charged a payment
            fee for the facilitation of the transaction. If you cancel the order
            after it has been confirmed by the Lender, you will forfeit any
            third-party payment fees. If you cancel more than 24 hours before
            the Hire Item is due to be delivered by the Lender then there is no
            fee, other than the third-party payment fees. If you cancel less
            than 24 hours before the Hire Item is due to be delivered by the
            Lender, you will lose 50% of your deposit. You will also only be
            refunded 80% of your initial borrow deposit to account for our
            handling fees. <br />
            <br />
            <strong>Other:</strong> <br />
            If the lender doesn’t show up to hand over the item, please contact
            Little Big Shed as soon as possible — you’ll need to contact us via
            our contact form, email or phone within 24 hours of when the rental
            was scheduled to receive a full reimbursement of the cost of the
            rental minus the third party payment fee.
          </p>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default CancellationPolicy
