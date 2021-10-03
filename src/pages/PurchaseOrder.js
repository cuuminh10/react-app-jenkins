import TableModeTabs from 'src/components/TableModeTabs';
import PurchaseOrderEntity from 'src/entities/purchase-order.entity';

const mappingData = new PurchaseOrderEntity();
const PurchaseOrder = () => (<TableModeTabs mappingData={mappingData} />);

export default PurchaseOrder;
