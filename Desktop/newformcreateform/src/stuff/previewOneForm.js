import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './previewOneForm.css'

import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Slider, Typography } from '@mui/material';
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

const PreviewOneForm = () => {
    const navigate = useNavigate()
    const params = useParams().id
    let [searched, setSearched] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [input, setInput] = useState(3)
    let[array, setArray] = useState([])
    let[answers, setAnswers] = useState([3,3,3,3,3])
    let[forms, setForms] = useState([])
    let[canRender, setCanRender] = useState(false)

    let [currentFormName, setCurrentFormName] = useState('')
    let [currentFormId, setCurrentFormId] = useState(undefined)
    let [questions, setQuestions] = useState([])
    let arr = []
    let form = []
    let array2 = []
    let array3 = []
    async function submit() {
        setIsLoading(isLoading = true)
        
        let res = await fetch('http://localhost:6969/forms')
        let data = await res.json()
            
                for(const key in data) {
                    if(data[key].form_id === searched) {
                        setCurrentFormName(currentFormName = data[key].title)
                        setCurrentFormId(currentFormId = data[key].form_id)
                    }
                    
                }
            

            let res2 = await fetch('http://localhost:6969/questions')
            let data2 = await res2.json()
                
                    for(const key in data2) {
                        console.log(data2[key].formid * 1)
                        if(data2[key].formid * 1 === currentFormId) {
                            
                            
                            
                            questions.push('')
                            
                        }
                    }
                    
                    let response1 = await fetch(`http://localhost:6969/questions/${currentFormId}`)
                    let data5 = await response1.json()
                    for(const key in data5) {
                        
                        questions[data5[key].question_id] = data5[key].question
        
                        console.log(questions)
                    }
                
        console.log(currentFormName, currentFormId, questions)
    }
    

    function onChange(e) {
        setSearched(e.target.value.toLowerCase())
    }

    function inputOnChange(e) {
        if(Number(e.target.value) && Number(e.target.value) <= 5) {
            
        
        }
    }

    // function getForms() {
    //     setIsLoading(isLoading = true)
    //     fetch('http://localhost:6969/forms')
    //     .then(res => res.json())
    //     .then(data => {
    //         for(const key in data) {
                
    //                 if(data[key].title) {
    //                     form.push(
    //                         data[key].title
    //                       )
    //                 }
                    
    //                   console.log(data[key].title, form)
                
    //         }
    //         for(let i =0; i < form.length; i++) {
        
          
                
                
                
                

    //             setForms(forms = form)
    //           }
              
    //     })
    //     setIsLoading(isLoading = false)
    // }
    
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
        navigate('/preview')
    }

    function radioChangeHandler(e) {
        console.log(e.target)
        answers[questions.findIndex(question => question === e.target.name)] = e.target.value
        console.log(answers[questions.findIndex(question => question === e.target.name)], answers)
    }



    async function startForm(e) {
        
        let res = await fetch('http://localhost:6969/forms')
        let data = await res.json()
            console.log(data)
                for(const key in data) {
                    console.log(params, data[key].form_uid,  data[key].title )
                    if(data[key].title && data[key].form_uid === params) {
                        
                        setSearched(searched = data[key].form_id)
                        submit()
                    }
                }
            
        
        
    }
    
    useEffect(() => {
        setCanRender(canRender = false)
        console.log('adsasd')
        startForm()
        setTimeout(() => {
            setCanRender(canRender = true)
        }, 100)
    }, [])

    return (

        <div className='app'>
            
            <div className='center'>
            
            
            <section>
                {/* {questions.length <= 0 && <Button onClick={startForm} variant="outlined">GET FORM</Button>} */}
                
                {questions.length > 0 && canRender && <ol>
                    {questions.map(item => <div key={Math.random() * 10000} className="radios">
                                           
                                            
                                                <label  key={Math.random() * 10000} className='list-item'>{item}</label>
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
                   

                   
                
                
            </section>
            </div>
            
        </div>
    )
}

export default PreviewOneForm