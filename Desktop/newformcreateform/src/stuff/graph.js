import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import './graph.css'
import ApexCharts from 'apexcharts'
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Chart from './chart';

import FormLabel from '@mui/material/FormLabel';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Slider, Typography } from '@mui/material';
import { FormatListBulleted } from '@mui/icons-material';



const Graph = () => {
    const params = useParams().id
    let [searched, setSearched] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [input, setInput] = useState(3)
    let[array, setArray] = useState([])
    let[responses, setResponses] = useState([])
    let[responseAmount, setResponseAmount] = useState([])
    let[rawResponses, setRawResponses] = useState([])
    let[rawRawResponses, setRawRawResponses] = useState([])
    let[RealResponses, setRealResponses] = useState([])
    let[forms, setForms] = useState([])
    const[questionLength, setQuestionLength] = useState(0)
    const [currentFormName, setCurrentFormName] = useState('')
    const [currentFormId, setCurrentFormId] = useState(undefined)
    let [questions, setQuestions] = useState([])
    const[popup, setPopup] = useState(false)
    const[chartType, setChartType] = useState('PieChart')
    let arr = []
    let form = []
    let array2 = []
    let array3 = []
    function submit() {
        setResponses(responses = [])
        setRawResponses(rawResponses = [])
        setResponseAmount(responseAmount = [])
        fetch('http://localhost:6969/forms')
            .then(res => res.json())
            .then(data => {
                for(const key in data) {
                    if(data[key].form_id === searched) {
                        setCurrentFormName(data[key].title)
                        setCurrentFormId(data[key].form_id)
                    }
                    
                }
            })

            fetch('http://localhost:6969/questions')
                .then(res => res.json())
                .then(data => {
                    for(const key in data) {
                        
                        if(data[key].formid * 1 === currentFormId) {
                            console.log(data[key].question)
                            arr.push(data[key].question)
                            
                           
                           
                            
                            setQuestions(questions = arr)
                            setQuestionLength(questions.length)
                            
                            setQuestionLength(questions.length)
                            responses.push([0,0,0,0,0])
                            rawResponses.push(0)
                            responseAmount.push(0)
                        }
                        
                    }
                    
                    for(let i = 0; i < questionLength; i++) {
                        fetch(`http://localhost:6969/responses/${currentFormId}/${i}`)
                    .then(res => res.json())
                    .then(data => {
                        for(const key in data) {
                            rawResponses[(data[key].questionnum * 1)] += (data[key].response * 1)
                            if(data[key].response * 1 === 1) {
                                responses[(data[key].questionnum * 1)][0] += 1
                                responseAmount[(data[key].questionnum * 1)]+=1
                            } else if(data[key].response * 1 === 2) {
                                responses[(data[key].questionnum * 1)][1] += 1
                                responseAmount[(data[key].questionnum * 1)]+=1
                            } else if(data[key].response * 1 === 3) {
                                responses[(data[key].questionnum * 1)][2] += 1
                                responseAmount[(data[key].questionnum * 1)]+=1
                            } else if(data[key].response * 1 === 4) {
                               
                                responses[(data[key].questionnum * 1)][3] += 1
                                responseAmount[(data[key].questionnum * 1)]+=1
                            } else if(data[key].response * 1 === 5) {
                                
                                responses[(data[key].questionnum * 1)][4] += 1
                                responseAmount[(data[key].questionnum * 1)]+=1
                                // responseAmount[(data[key].questionnum * 1)] += 1
                            }
                            
                            console.log(rawRawResponses)
                            setRealResponses(RealResponses = responses)
                            setRawRawResponses(rawRawResponses = rawResponses)
                            
                        }
                        
                        
                    })
                        
                    }
                })
                for(let x = 0;x < responses.length; x++) {
                    for(let i = 0; i < responses[x].length; i++) {
                        responses[x][i] = 0
                        // if(1 === 2) {
                        //     responses[x][i] + 1
                        // }
                        // } else if(responses[x][i] === 2) {
                        //     responses[x][i] + 1
                        // }  else if(responses[x][i] === 3) {
                        //     responses[x][i] + 1
                        // }  else if(responses[x][i] === 4) {
                        //     responses[x][i] + 1
                        // }  else if(responses[x][i] === 5) {
                        //     responses[x][i] + 1
                        // } 
                    }
                }
               
            
        console.log(currentFormName, currentFormId, questions, questionLength, responses)
    }
    


    

    function startForm(e) {
        fetch('http://localhost:6969/forms')
            .then(res => res.json())
            .then(data => {
                for(const key in data) {
                    
                    if(data[key].title && data[key].form_id === (params * 1)) {
                        
                        setSearched(searched = data[key].form_id)
                        submit()
                    }
                }
            })
        
        
    }
    
    function setBar() {
        console.log(chartType)
        setChartType('BarChart')
    }

    function setLine() {
        console.log(chartType)
        setChartType('LineChart')
    }

    function setPie() {
        console.log(chartType)
        setChartType('PieChart')
    }
    

    return (

        <div className='app'>
            
            <div className='center'>
            
            
            <section>
                <Button onClick={startForm} variant="outlined">GET GRAPH</Button>
                <div className='dropdown'>
                        
                     <Paper>
                        <Button onClick={setBar} className="dropdownButton">Bar</Button>
                        <br/>
                        <Button onClick={setLine} className="dropdownButton">Line</Button>
                        <br/>
                        <Button onClick={setPie} className="dropdownButton">Pie</Button>
                    </Paper>
                    </div>
                    <Paper>

                {questions && <ol className='orderedlist'>
                    {questions.map((item, index) =>  <div key={Math.random() * 10000} className="radios">
                    
             
                                                <li  key={Math.random() * 10000} className='li'>{item}</li>
                                                <br/>
                                                {rawRawResponses.length !== 0 && responseAmount !== 0 && <h6>AVG RESPONSE : {(rawRawResponses[index].toString() / responseAmount[index] * 1).toFixed(3)}</h6>}
                                                
                                               {responses.length > 0  && responses !== undefined && <Chart type={chartType} one={responses[index][0] ? responses[index][0] : 0} two={responses[index][1] ? responses[index][1] : 0} three={responses[index][2] ? responses[index][2] : 0} four={responses[index][3] ? responses[index][3] : 0} five={responses[index][4] ? responses[index][4] : 0}/>}
                                                
                    
                                      </div>)
                                      }       
                </ol>}
                </Paper>

                
                
                    
                   {isLoading && <h1>Loading...</h1>}
                   

                   
                
                
            </section>
            </div>
            
        </div>
    )
}

export default Graph