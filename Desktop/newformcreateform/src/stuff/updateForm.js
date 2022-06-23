import React, {useState} from 'react'
import { TextField, Button } from '@mui/material';
import './formQuestions.css'
import { useNavigate } from 'react-router-dom';

const UpdateForm = (props) => {
  const navigate = useNavigate()
  const [serviceList, setServiceList] = useState([{ service: "", type: "radio", valid: false  }]);
  let [serviceListValues, setServiceListValues] = useState([]);
  
  let sent = props.sent
  let {title, setTitle} = props
  let [invalid, setInvalid] = useState(true);
  let [formId, setFormId] = useState(true);
  let randomArr = []
   if(title) {
      fetch('http://localhost:6969/forms')
        .then(res => res.json())
        .then(data => {
          for(const key in data) {
            if(data[key].title && data[key].form_id && data[key].title === title) {
              setFormId(formId = data[key].form_id)
            }
            
          }
        })
   }
  
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    if(value.trim() && sent) {
      list[index].valid = true;
      console.log(list[index].valid)
    } else {
      list[index].valid = false;
      console.log(list[index].valid)
    }
    for(let i = 0; i < list.length; i++) {
      if(list[i].valid) {
   
        setInvalid(invalid = false)
      } else {
        setInvalid(invalid = true)
      }
    }
    console.log(list[index])
    setServiceList(list);
    console.log(title, 'TITLE HRERE')
  };



  const handleTitleChange = (e) => {
    const { value } = e.target;
    const list = [...serviceList]
    for(let i = 0; i < list.length; i++) {
    //   if(list[i].valid && value) {
        if(value.trim()) {
        setInvalid(invalid = false)
      } else {
        setInvalid(invalid = true)
      }
    }
    setTitle(value);
  };


  const handleServiceRemove = (index) => {
    const list = [...serviceList];
    list.splice(index, 1);
    setServiceList(list);

  };

  const handleServiceAdd = () => {
    setServiceList([...serviceList, { service: "", type: "radio", valid: false }]);
    console.log(serviceList, 'AASSAAAAAAAAAAAAAAAAAAAAA')
    setInvalid(true)
  };
  
  const handleServiceSubmit = () => {
    
      for(const key in serviceList) {
        
          serviceListValues.push(serviceList[key].service) 
          
          console.log(serviceList[key].service)
        
       
          
        
        
        
   
    
    
        
      }

      if(!invalid) {
        console.log(invalid, serviceListValues)
        for(let i= 0; i < serviceListValues.length; i++) {
          
          fetch(`http://localhost:6969/forms/${formId}/questions`, {
            method: "POST",
            body: JSON.stringify({
              questionId: i,
              question: serviceListValues[i]
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          console.log(serviceListValues[i])
        }
        
      console.log('valid')

      setServiceList([{ service: "", type: "radio" }]);
      setTitle(title = "")
      
      navigate('/preview')
     

      } else {
        
         
        setServiceListValues([]);
      }

    }

    console.log(serviceListValues)

    return (
        <div className="entire-form">
      
      <div className="title-div">
        {/* <label className="title-text">Evaluation Title</label>
      <TextField
                name="title"
                type="text"
                label="Evaluation title"
                variant="filled"
                className="title-input"
                value={title}
                onChange={(e) => handleTitleChange(e)}
                required
  /> */}
      </div>
      
      <form className="App" autoComplete="off">
      {title && <h2 className='formname'>Form Name: {title}</h2>}
      <div className="form-field">
         <label htmlFor="service" className="objective-statement">Objective statement(s)</label> 
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
               <TextField
                name="service"
                type="text"
                label="Objective statement"
                fullWidth={true}
                value={singleService.service}
                onChange={(e) => handleServiceChange(e, index)}
                required
              /> 
              
            
              {serviceList.length - 1 === index && (
                <div>
                  <Button
                      type="button"
                      
                      variant="outline"
                      onClick={handleServiceAdd}
                      className="add-btn space-top "
                      
                    >
                      <span>Add a Statement</span>
                </Button> 
                <Button
                      type="button"
                      onClick={handleServiceSubmit}
                      className="add-btn space-top"
                    >
                      <span>Create Evaluation</span>
                </Button>

                  </div>
                
              )}
            </div>
            <div className="second-division">
              {serviceList.length !== 1 && (
                <div>
                  <Button
                  type="button"
                  onClick={() => handleServiceRemove(index)}
                  className="remove-btn"
                >
                  <span>Remove</span>
                </Button>
                
                  </div>

                
                
              )}
            </div>
          </div>
        ))}
      </div>
      
    </form>
    <div className="output">
        <h2>Preview</h2>
        {serviceList &&
    <ol>
         {serviceList.map((singleService, index) => (
        <div>
          <li key={index} className="question-name">{singleService.service}</li>
           {/* <div className="fake-radios">
            <div className="fake-radio"></div>
            <label className="number">1</label>
            <div className="fake-radio"></div>
            <label className="number">2</label>
            <div className="fake-radio-checked"></div>
            <label className="number">3</label>
            <div className="fake-radio"></div>
            <label className="number">4</label>
            <div className="fake-radio"></div>
            <label className="number">5</label>
          </div> */}
        </div> 
        
      ))}
    </ol>
          }
      </div>

      {invalid && <h1 style={{color: 'crimson', fontWeight: '100', fontFamily: 'Roboto', fontSize: 3 + 'rem'}}>Invalid Form.</h1>}
    
    
    </div>
    )
}


export default UpdateForm