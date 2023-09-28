import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as Messages } from '../assets/Icons/Messages.svg'
export const notify = (message) =>
toast(
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        paddingLeft: 5
      }}
    >
      <Messages height='25px' width='25px' className='UserShedNav__Icon' />
      {"  "}
      <span style={{ marginLeft: 5 }}>{message}</span>
    </div>
  );
