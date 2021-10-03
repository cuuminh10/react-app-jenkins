import TableModeTabs from 'src/components/TableModeTabs';
import PurchaseRequestEntity from 'src/entities/purchase-request.entity';

const mappingData = new PurchaseRequestEntity();
const PurchaseOrder = () => (<TableModeTabs mappingData={mappingData} />);

export default PurchaseOrder;
