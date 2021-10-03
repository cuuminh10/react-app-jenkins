import TableModeTabs from 'src/components/TableModeTabs';
import SaleOrderEntity from 'src/entities/sale-order.entity';

const mappingData = new SaleOrderEntity();
const SaleOrder = () => (<TableModeTabs mappingData={mappingData} />);

export default SaleOrder;
