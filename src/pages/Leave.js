import TableModeApprove from 'src/components/TableModeApprove';
import LeaveEntity from 'src/entities/leave.entity';

const mappingData = new LeaveEntity();
const Leave = () => (<TableModeApprove mappingData={mappingData} />);

export default Leave;
