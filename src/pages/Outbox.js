import TableModeMail from 'src/components/TableModeMail';
import OutboxEntity from 'src/entities/outbox.entity';

const mappingData = new OutboxEntity();
const PurchaseOrder = () => (<TableModeMail mappingData={mappingData} />);

export default PurchaseOrder;
