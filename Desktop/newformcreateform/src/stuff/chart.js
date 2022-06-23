import react, { useEffect } from 'react'
import './chart.css'


import { Chart as GChart} from "react-google-charts" ;

const Chart = (props) => {
    useEffect(() => {
      
          
      
      
    
    }, [])
    const options = {
      title: props.title ? props.title : "Responses",
      
    };

    const data = [
      ["response", "responses"],
      ["Strongly Disagree", props.one ? props.one: 0],
      ["Disagree", props.two ? props.two: 0],
      ["Neutral", props.three ? props.three: 0],
      ["Agree", props.four ? props.four: 0],
      ["Strongly Agree", props.five ? props.five: 0],
    ];
    
    return (
       <div>
<GChart
className='chart'
      chartType={props.type}
      data={data}
      options={options}
      width={"100%"}
      height={"80.5px"}
    />
      </div>
    )
}
export default Chart