import TableModeMail from 'src/components/TableModeMail';
import InboxEntity from 'src/entities/inbox.entity';

const mappingData = new InboxEntity();
const PurchaseOrder = () => (<TableModeMail mappingData={mappingData} />);

export default PurchaseOrder;
