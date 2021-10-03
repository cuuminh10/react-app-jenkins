import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { Typography, Box } from '@material-ui/core';

const BaseChart = ({ type, chartOptions }) => (
  <Box className="c-base-chart">
    <Box sx={{ color: 'text.primary' }} className="c-base-chart__total">
      <Typography sx={{ fontSize: '0.857rem', fontWeight: 'bold' }} variant="p">
        Total
      </Typography>
      <Typography sx={{ fontSize: '0.93rem' }} variant="p">{chartOptions.total}</Typography>
    </Box>
    <Chart options={chartOptions.options} series={chartOptions.series} type={type} width={240} height={90} />
  </Box>
);

BaseChart.propTypes = {
  chartOptions: PropTypes.object,
  type: PropTypes.string
};

export default BaseChart;
