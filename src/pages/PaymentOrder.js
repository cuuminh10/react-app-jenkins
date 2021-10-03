import TableModeTabs from 'src/components/TableModeTabs';
import PaymentOrderEntity from 'src/entities/payment-order.entity';

const mappingData = new PaymentOrderEntity();
const PurchaseOrder = () => (<TableModeTabs mappingData={mappingData} />);

export default PurchaseOrder;
