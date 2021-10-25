import { observer } from 'mobx-react-lite';
import RecipientName from './recipientNameCol';

const PostConfiguration = observer(({ configStore }) => {
  return (
    <>
      <RecipientName configStore={configStore} />
    </>
  );
});
export default PostConfiguration;
