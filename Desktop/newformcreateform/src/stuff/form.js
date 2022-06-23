import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Form(props) {
  const [serviceList, setServiceList] = useState([{ service: "", type: "radio", valid: false  }]);
  let [serviceListValues, setServiceListValues] = useState([]);
  
  let {sent, setSent, title, setTitle, double, setDouble} = props
  let [invalid, setInvalid] = useState(true);
  let navigate = useNavigate()
   useEffect(() => {
    setDouble(false)
   }, [])
  
  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    if(value.trim()) {
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
    console.log(title)
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
        
          setServiceListValues(serviceListValues += serviceList[key].service + "? ")
          console.log(serviceList[key].service)
        
       
          
        
        
        
   
    
    
        
      }

      if(!invalid && title) {
        console.log(invalid, serviceListValues)
        fetch('http://localhost:6969/forms', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: `${title}-before-uid-${Math.random() * 10000000}`,
          })
      }).then(
        result => {
          fetch('http://localhost:6969/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: `${title}-after-uid-${Math.random() * 10000000}`,
            })
        })

        fetch('http://localhost:6969/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: `${title}copy2-before-uid-${Math.random() * 10000000}`,
            })
        })

        fetch('http://localhost:6969/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: `${title}copy2-after-uid-${Math.random() * 10000000}`,
            })
        })
        },


        error => console.error(error)
      )

      
      console.log('valid')
      setSent(true)
      console.log(sent, 'sent!')
      navigate('/questions')
      setServiceList([{ service: "", type: "radio" }]);

      setServiceListValues([]);
      
      
      
      } else {
        
         
        setServiceListValues([]);
      }

     

    console.log(serviceListValues)
    
  };
  
  const handleDoubleServiceSubmit = () => {
    
    for(const key in serviceList) {
      
        setServiceListValues(serviceListValues += serviceList[key].service + "? ")
        console.log(serviceList[key].service)
      
     
        
      
      
      
 
  
  
      
    }

    if(!invalid && title) {
      console.log(invalid, serviceListValues)
      fetch('http://localhost:6969/forms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: `${title}-before-uid-${Math.random() * 10000000}`,
        })
    }).then(
      result => {
        fetch('http://localhost:6969/forms', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: `${title}-after-uid-${Math.random() * 10000000}`,
          })
      })

      
      },


      error => console.error(error)
    )

    
    console.log('valid')
    setSent(true)
    console.log(sent, 'sent!')
    navigate('/questions')
    setServiceList([{ service: "", type: "radio" }]);
    setDouble(true)
    setServiceListValues([]);
    
    
    
    } else {
      
       
      setServiceListValues([]);
    }

   

  console.log(serviceListValues)
  
};


  return (
    <div className="entire-form">
      
        <div className="title-div">
          <label className="title-text">Program Title</label>
        <TextField
                  name="title"
                  type="text"
                  label="Program title"
                  variant="filled"
                  className="title-input"
                  onChange={(e) => handleTitleChange(e)}
                  required
                />
        </div>
        
        <form className="App" autoComplete="off">
        
        <div className="form-field">
          {/* <label htmlFor="service" className="objective-statement">Objective statement(s)</label> */}
          {serviceList.map((singleService, index) => (
            <div key={index} className="services">
              <div className="first-division">
                {/* <TextField
                  name="service"
                  type="text"
                  label="Objective statement"
                  fullWidth={true}
                  value={singleService.service}
                  onChange={(e) => handleServiceChange(e, index)}
                  required
                /> */}
                
              
                {serviceList.length - 1 === index && (
                  <div>
                    {/* <Button
                        type="button"
                        
                        variant="outline"
                        onClick={handleServiceAdd}
                        className="add-btn space-top "
                        
                      >
                        <span>Add a Statement</span>
                  </Button> */}
                  <Button
                        type="button"
                        onClick={handleServiceSubmit}
                        className="add-btn space-top"
                      >
                        {/* <span>Create Program Title (2 before afters)</span> */}
                        <span>Create 360 Feedback</span>
                  </Button>
                  <Button
                        type="button"
                        onClick={handleDoubleServiceSubmit}
                        className="add-btn space-top"
                      >
                        {/* <span>Create Program Title (1 before after)</span> */}
                        <span>Create Self-Evaluation</span>
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
      {/* <div className="output">
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
          {/* </div> 
          
        ))}
      </ol>
            }
        </div> */} 
        {invalid && <h1 style={{color: 'crimson', fontWeight: '100', fontFamily: 'Roboto', fontSize: 2.3 + 'rem'}}>Program requires a title.</h1>}
      
      
      </div>
    
  );
}

export default Form;