import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './previewForm.css'
import { IconButton, Input, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import FormLabel from '@mui/material/FormLabel';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Slider, Typography } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';

const marks = [
    {
      value: 1,
      label: 'Strongly Disagree',
    },
    {
      value: 2,
      label: 'Disagree',
    },
    {
      value: 3,
      label: 'Neutral',
    },
    {
      value: 4,
      label: 'Agree',
    },
    {
        value: 5,
        label: 'Strongly Agree',
      },
  ];

const PreviewForm = () => {
    const navigate = useNavigate()
    let [searched, setSearched] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [input, setInput] = useState(3)
    let[array, setArray] = useState([])
    let[answers, setAnswers] = useState([3,3,3,3,3])
    let[forms, setForms] = useState([])
    let [currentFormName, setCurrentFormName] = useState('')
    let [currentFormId, setCurrentFormId] = useState(undefined)
    let [currentFormUid, setCurrentFormUid] = useState(undefined)
    let [editMode, setEditMode] = useState(false)
    let [questions, setQuestions] = useState([])
    let [sortingNumber, setSortingNumber] = useState(0)
    let [questionsU, setQuestionsU] = useState([])
    let arr = []
    let arrU = []
    let form = []
    let realForms = []
    let formIds = []
    let array2 = []
    let array3 = []







    async function submit() {
        setQuestions(questions = [])
        setIsLoading(isLoading = true)
        setAnswers(answers = [3,3,3,3,3])
        let res = await fetch('http://localhost:6969/forms')
        let data = await res.json()
            
                for(const key in data) {
                    console.log('made it in first try', searched === data[key].title.toLowerCase())
                    if(data[key].title.toLowerCase() === searched.toLowerCase()) {
                        console.log('in??', data[key].title, data[key].form_uid, data[key].form_id)
                        
                        setCurrentFormName(currentFormName = data[key].title)
                        console.log(currentFormName)
                        setCurrentFormUid(currentFormUid = data[key].form_uid)
                        setCurrentFormId(currentFormId = data[key].form_id)
                    }
                    
                }
                console.log(currentFormName,
                currentFormUid,
                currentFormId)
           

            let response = await fetch(`http://localhost:6969/questions/${currentFormId}`)
            let data2 = await response.json()
                
                    for(const key in data2) {
                        console.log(data2[key].formid * 1)
                        if(data2[key].formid * 1 === currentFormId) {
                            console.log(data2[key].question)
                            arr.push(data2[key].question)
                            console.log(arr)
                           questions.push(data2[key].question)
                            console.log(questions)

                            arrU.push(data2[key].question + data2[key].question_id)
                            
                            setQuestionsU(questionsU = arrU)
                            console.log(questionsU)
                        }
                    }
                    
                
                for(let i = 0; i < Number(questions.length); i++) {
                    answers.push(3)
                }
                
        console.log(currentFormName, currentFormId, questions, questionsU)
    }
    









    function onChange(e) {
        setSearched(e.target.value.toLowerCase())
    }

    function inputOnChange(e) {
        if(Number(e.target.value) && Number(e.target.value) <= 5) {
            console.log('ASd')
        
        }
    }














    async function getForms() {
        setIsLoading(isLoading = true)
        
        let res = await fetch('http://localhost:6969/forms')
        let data = await res.json()
        
           
            for(const key in data) {
                
                    if(data[key].title) {
                        form.push(
                            data[key].title
                          )
                          formIds.push(
                              data[key].form_id
                          )
                    }
                     
                      
                
            }
            
            for(let i =0; i < form.length; i++) {
        
          
                
                let response = await fetch('http://localhost:6969/questions')
                let data2 = await response.json()
                   
                        
                        for(const key in data2) {
                            if((data2[key].formid * 1) === formIds[i] && !realForms.includes(form[i])) {
                                realForms.push(form[i])
                                forms.push(form[i])
                            }
                            // setForms(realForms)
                          
                        }
                        
                    
                
                

                
                
              }
              
        
        
        setIsLoading(isLoading = false)
    }












    
    function submitForm(e) {
        console.log(currentFormName, answers.length, answers)
        for(let i = 0; i < answers.length; i++) {
            console.log(answers[i])
            fetch(`http://localhost:6969/forms/${currentFormId}/responses`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionnum: i,
                    response: answers[i]
                })
            })

        }
        
        console.log(currentFormName)
        console.log(answers)
        setSearched(searched = '')
        submit()
    }

    function radioChangeHandler(e) {
        console.log(e.target)
        answers[questions.findIndex(question => question === e.target.name)] = e.target.value
        console.log(answers[questions.findIndex(question => question === e.target.name)], answers)
    }

    function sendToForm(e) {
        console.log(e.target)
        setSearched(searched = e.target.textContent.toLowerCase())
        console.log(searched, 'A')
        submit()
        
    }
    
    useEffect(() => {
        getForms()
        
        
    }, [])
    
    function deleteForm(e) {
        let response = window.confirm('are you sure?')
        if(response) {
           fetch(`http://localhost:6969/forms/${currentFormId}`, {
            method: 'DELETE',

        }) 
        navigate('/title')
        }

        
        
        

    }

    function formCharts(e) {
        
        
        navigate(`/graphs/${currentFormId}`)
        
    }

    function questionChange(e) {
        fetch(`http://localhost:6969/questions/${currentFormId}/${e.target.id}`, {
            method: "PUT",
            body: JSON.stringify({
                question: e.target.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    function toggleEdit(e) {
        setEditMode(!editMode)
        setSearched(searched = currentFormName)
        submit()
    }

    function previewThisForm(e) {
        navigate(`/forms/${currentFormUid}`)
    }

    function copy(e) {
        navigator.clipboard.writeText(currentFormUid)
    }

    return (

        <div className='app'>
            <div className='background'>
                <div className='slightTransparent'>
                    <h1 className='backgroundText'></h1>
                    <h1 className='smile'>:)</h1>
                    <h1 className='backgroundText'></h1>
                </div>
            </div>
            
                
            <div className='center'>
            

            <section>
                
                {questions.length > 0 && <ol className='formNquestions'>
                    {questions.length > 0 && <Button variant='contained' className='deleteForm' onClick={deleteForm}>Delete</Button>}
                    {/* {questions.length > 0 && <Button variant='contained' className='oneForm' onClick={previewThisForm}>Preview this form</Button>} */}
                    {questions.length > 0 && <Button variant='contained' className='formGraph' onClick={formCharts}>Graph</Button>}
                    {/* {questions.length > 0 && <Button variant='contained' className='deleteForm' onClick={deleteForm}>Update</Button>} */}
                    {questions.length > 0 && <Button variant='contained' className='updateForm' startIcon={editMode ? <EditOffOutlinedIcon/> : <ModeEditOutlineOutlinedIcon/>} onClick={toggleEdit}>{editMode ? 'Stop editing' : 'Edit form'}</Button>}
                    {questions.length > 0 && 
                        <h3>Form uid:</h3>
                        }
                    {questions.length > 0 && <Paper className='formUidPaper'>
                        <h3>{currentFormUid}</h3>
                        <Button variant="contained" className='copytoclipboard' onClick={copy}>Copy to clipboard</Button>
                        </Paper>}
                    {questions.map((item, index) => <div key={Math.random() * 10000} className="radios">

                                                {!editMode && <li key={Math.random() * 10000} className='list-item'>{item}</li>}
                                                {editMode && <Input  key={Math.random() * 10000} className='list-item' variant="standard"  id={`${index}`} onChange={questionChange} defaultValue={item}/>}
                                                <br/>
                                                <Slider
                                                name={`${item}`}
                                                    
                                                    onChange={radioChangeHandler}
                                                    className="slider"
                                                    aria-label="Rating"
                                                    defaultValue={3}
                                                    valueLabelDisplay="off"
                                                    step={1}
                                                    marks={marks}
                                                    min={1}
                                                    max={5}
                                                />
                                            
                                      </div>)
                                      }
                           <Button variant="contained" onClick={submitForm} className="submit">Submit Form</Button>           
                </ol>}

                
                
                    
                   {/* {isLoading && <h1>Loading...</h1>} */}
                   

                   <Drawer className="drawer" variant="permanent" anchor='right' classes={{ paper: 'drawerPaper'}}>
                   {/* <Button variant="contained" onClick={getForms} className='button'>Fetch all forms</Button> */}
                <div>
                    <Typography variant="h6">
                        All Forms Available
                    </Typography>
                </div>
                <List className='drawer-list'>
                {forms.length > 0 && forms.map(item => <div key={Math.random() * 10000}>
                
                <ListItem key={Math.random() * 10000} className={currentFormName.toLowerCase() === item.toLowerCase() ? 'list-item underline' : 'list-item'} onClick={sendToForm} button>
                    <ListItemIcon><FormatListBulleted color='secondary'/></ListItemIcon>  
                    <ListItemText>{item}</ListItemText>
                    
                </ListItem>
                                   
</div>)}
                </List>
            </Drawer>
                
                
            </section>
            </div>
            
        </div>
    )
}

export default PreviewForm