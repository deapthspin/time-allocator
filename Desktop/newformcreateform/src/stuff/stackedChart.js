import React, { Component } from "react";
import Chart from "react-google-charts";

class StackedChart extends Component {
  
  constructor(props) {
    super(props)
  }
  render() {
      return (
          <div className="container mt-5">
              
              <Chart
                width={'700px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={
                 
this.props.data
                }
                options={{
                  title: 'Responses',
                  chartArea: { width: '50%' },
                  isStacked: 'percent',
                  // isStacked: true,
                  hAxis: {
                    title: 'Total Responses',
                    minValue: 0,
                  },
                  vAxis: {
                    title: 'Question',
                  },
                  series: {
                    0:{color:'#a80d02'},
                    1:{color:'#fc8803'},
                    2:{color:'#fcca03'},
                    3:{color:'#43d400'},
                    4:{color:'#2b8501'}
                  }
                }}
                rootProps={{ 'data-testid': '3' }}
              />           
          </div>
      )
  }
}
export default StackedChart;