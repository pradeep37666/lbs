import Footer from '../../../components/marketing/Footer/Footer'
import NavBar from '../../../components/marketing/NavBar/NavBar'

const DamagesAndDisputes = () => {
  return (
    <>
      <NavBar selected='info_hub' />
      <div className='policy-container'>
        <div className='policy-header'>
          <p className='policy-title'>
            Little Big Shed Damages and Disputes Policy
          </p>
          <p className='policy-sub-title'>
            Our General Rental Agreement and Privacy Policy apply to this
            policy.
            <br />
            Our Damages and Disputes Policy is designed to protect both lenders
            and borrowers. If either party wants to raise a dispute. This must
            be done by notifying both the lender or borrower and Little Big Shed
            through the in-app chat within 12 hours of pickup of the item.
            <br />
            <br />
            <strong>For the Borrower:</strong> <br />
            If an item is substantially different as advertised by a Lender
            (including being damaged or not working), and a Borrower wishes to
            seek a refund, the Borrower must first raise a dispute. The Borrower
            is required to inspect the item for safety before use.
            <br />
            <br />
            If it is agreed that the item is in a substantially different as
            advertised, Little Big Shed will:
          </p>
          <ol class='policy-list'>
            <li type='a'>
              Refund the full Hire Fee to the Borrower (inclusive of all fees);
            </li>
            <li type='a'>
              add a penalty fee to the Lender's account covering the Third-Party
              Payment Fees incurred by the borrower. All penalty fees will be
              deducted from the Lender's next payment in the next Lender Payment
              Run.
            </li>
          </ol>
          <br />
          <p>
            A user, who is either a Borower or a Lender, may be restricted on
            the platform for violating Little Big Shed’s Community Guidelines.
            This may include but is not limited to:
          </p>
          <ul class='policy-list'>
            <li>
              Use of inappropriate and abusive language towards other users
            </li>
            <li>Lender failing to pay up the penalty fees</li>
            <li>Multiple reports of listing not matching the actual product</li>
            <li>Multiple reports of returning a damaged item</li>
          </ul>
          <p>
            <br />
            <strong>
              What happens when a user is restricted on the platform?
            </strong>
            <br />
            When a user is restricted on the platform, they will not be able to
            log in to their account. This limits all functionalities of the
            account. The user profile will keep a track of the account
            restrictions in the backend. The account restriction can be removed
            when the dispute is resolved and a request is made via email to the
            Little Big Shed’s Customer Care Team.
            <br />
            <br />
            At Little Big Shed, we want all our users to feel safe and secure
            and build our community through trust. All our platform users go
            through our verification process. To protect yourself further, we
            advise you to check the other member’s profile and reviews before
            lending or borrowing an item.
            <br />
            <br />
            If a Lender is lending an item and has special instructions, we ask
            the Lender to educate the Borrower on how to use the item. Also to
            perform thorough inspections of the item both before and after the
            rental period with the Borrower. It always pays to double-check all
            of the item’s functions to ensure both the users are in agreement
            with the condition of the item.
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DamagesAndDisputes
