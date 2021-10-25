import { observer } from 'mobx-react-lite';
import RecipientCol from './recipientCol';
import RecipientMail from './recipientMail';
import RecipientName from './recipientNameCol';

const MailConfiguration = observer(({ configStore }) => {
  return (
    <>
      <RecipientCol configStore={configStore} />
      {configStore.recipient === 'other' && (
        <>
          <RecipientName configStore={configStore} />
          <RecipientMail configStore={configStore} />
        </>
      )}
    </>
  );
});
export default MailConfiguration;
