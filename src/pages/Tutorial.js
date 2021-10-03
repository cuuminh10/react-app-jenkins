import TableCustom from 'src/components/TableCustom';
import MemberEntity from 'src/entities/member.entity';

const mappingData = new MemberEntity();
const Tutorial = () => (
  <TableCustom title="Tutorial" mappingData={mappingData} />
);

export default Tutorial;
