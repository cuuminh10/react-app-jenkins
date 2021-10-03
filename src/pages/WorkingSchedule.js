import TableModeApprove from 'src/components/TableModeApprove';
import WorkingScheduleEntity from 'src/entities/working-schedule.entity';

const mappingData = new WorkingScheduleEntity();
const WorkingSchedule = () => (<TableModeApprove mappingData={mappingData} />);

export default WorkingSchedule;
