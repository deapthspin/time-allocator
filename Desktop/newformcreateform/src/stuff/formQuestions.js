import React, {useEffect, useState} from 'react'
import { TextField, Button } from '@mui/material';
import './formQuestions.css'
import { useNavigate } from 'react-router-dom';

const FormQuestions = (props) => {
  const navigate = useNavigate()
  const [serviceList, setServiceList] = useState([{ service: "", type: "radio", valid: false  }]);
  let [serviceListValues, setServiceListValues] = useState([]);
  
  let sent = props.sent
  let {title, setTitle} = props
  let [invalid, setInvalid] = useState(true);
  const [formId, setFormId] = useState(0);
  let randomArr = []
  
    if(title) {
      fetch('http://localhost:6969/forms')
        .then(res => res.json())
        .then(data => {
          for(const key in data) {
            
            if(data[key].title && data[key].form_id && data[key].title.split('-')[0] === title) {
              setFormId(data[key].form_id)
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
        
        fetch(`http://localhost:6969/forms/${formId - 1}/questions`, {
          method: "POST",
          body: JSON.stringify({
            questionId: i,
            question: serviceListValues[i]
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

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



        fetch(`http://localhost:6969/forms/${formId + 1}/questions`, {
          method: "POST",
          body: JSON.stringify({
            questionId: i,
            question: serviceListValues[i]
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })




        fetch(`http://localhost:6969/forms/${formId + 2}/questions`, {
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

    
  const handleDoubleServiceSubmit = () => {
    
    for(const key in serviceList) {
      
        serviceListValues.push(serviceList[key].service) 
        
        console.log(serviceList[key].service)
      
     
        
      
      
      
 
  
  
      
    }

    if(!invalid) {
      console.log(invalid, serviceListValues)
      for(let i= 0; i < serviceListValues.length; i++) {
        
        fetch(`http://localhost:6969/forms/${formId - 1}/questions`, {
          method: "POST",
          body: JSON.stringify({
            questionId: i,
            question: serviceListValues[i]
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })

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



    return (
        <div className="entire-form">
      
      <div className="title-div">
        {/* <label className="title-text">Program Title</label>
      <TextField
                name="title"
                type="text"
                label="Program title"
                variant="filled"
                className="title-input"
                value={title}
                onChange={(e) => handleTitleChange(e)}
                required
  /> */}
      </div>
      
      <form className="App">
      {title && <h2 className='formname'>Program Name: {title}</h2>}
      <div className="form-field">
         <label className="objective-statement">Objective statement(s)</label> 
        {serviceList.map((singleService, index) => (
          <div key={index} className="services">
            <div className="first-division">
               <TextField
                name="service"
                type="text"
                label="Objective statement"
                fullWidth={true}
                value={singleService.service}
                variant="outlined"
                onChange={(e) => handleServiceChange(e, index)}
                onKeyPress={(e) => e.key === 'Enter' && handleServiceAdd()}
                required
              /> 
              
              
            
              {serviceList.length - 1 === index && (
                <div>
                  <TextField className='have-to-keep-here-so-doesnt-link-me-randomly' disabled></TextField>
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
                      onClick={props.double ? handleDoubleServiceSubmit : handleServiceSubmit}
                      className="add-btn space-top"
                    >
                      <span>Create Program</span>
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

      {invalid && <h1 style={{color: 'crimson', fontWeight: '100', fontFamily: 'Roboto', fontSize: 2.3 + 'rem'}}>The program is not valid.</h1>}
    
    
    </div>
    )
}


export default FormQuestions