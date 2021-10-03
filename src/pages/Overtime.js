import TableModeApprove from 'src/components/TableModeApprove';
import OvertimeEntity from 'src/entities/overtime.entity';

const mappingData = new OvertimeEntity();
const OverTime = () => (<TableModeApprove mappingData={mappingData} />);

export default OverTime;
