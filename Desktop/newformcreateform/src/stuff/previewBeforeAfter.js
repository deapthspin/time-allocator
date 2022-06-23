import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './previewBeforeAfter.css'
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
import Chart from './chart';
import StackedChart from './stackedChart';
const PreviewBeforeAfter = () => {
    const navigate = useNavigate()
    let [searched, setSearched] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let [responses, setResponses] = useState([])
    let [rawResponses, setRawResponses] = useState([])
    let [afterResponses, setAfterResponses] = useState([])
    let [afterRawResponses, setAfterRawResponses] = useState([])
    let [input, setInput] = useState(3)
    let[array, setArray] = useState([])
    let[answers, setAnswers] = useState([]) // for submission of form so i dont need
    let[forms, setForms] = useState([])
    let [currentFormName, setCurrentFormName] = useState('')
    let [currentFormId, setCurrentFormId] = useState(undefined)
    let [currentFormUid, setCurrentFormUid] = useState(undefined)
    let [afterCurrentFormUid, setAfterCurrentFormUid] = useState(undefined)
    let [editMode, setEditMode] = useState(false)
    let [questions, setQuestions] = useState([])
    let [sortingNumber, setSortingNumber] = useState(0)
    let [questionsU, setQuestionsU] = useState([])
    const[chartType, setChartType] = useState('PieChart')
    let[responseAmount, setResponseAmount] = useState([])
    let[afterResponseAmount, setAfterResponseAmount] = useState([])
    const[canRender, setCanRender] = useState(false)
    let[chartData, setChartData] = useState([
        ['Responses', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
    ])
    let [allAddedBefore, setAllAddedBefore] = useState(0)
    let [allAddedAfter, setAllAddedAfter] = useState(0)
    
    let arr = []
    let arrU = []
    let form = []
    let realForms = []
    let formIds = []
    let array2 = []
    let array3 = []


   
    




    async function submit() {
        setQuestions(questions = [])
        setResponseAmount(responseAmount = [])
        setResponses(responses = [])
        setRawResponses(rawResponses = [])
        
        setIsLoading(isLoading = true)
        setAnswers(answers = [])
        let res = await fetch('http://localhost:6969/forms')
        let data = await res.json()
            
                for(const key in data) {
                
                    if(data[key].title.toLowerCase().split('-')[0] === searched.toLowerCase() && data[key].title.toLowerCase().split('-')[1] !== 'after') {
                       
                        
                        setCurrentFormName(currentFormName = data[key].title)
                        
                        setCurrentFormUid(currentFormUid = data[key].form_uid)
                        setCurrentFormId(currentFormId = data[key].form_id)
                    } else if(data[key].title.toLowerCase().split('-')[0] === searched.toLowerCase() && data[key].title.toLowerCase().split('-')[1] === 'after') {
                        setAfterCurrentFormUid(afterCurrentFormUid = data[key].form_uid)
                    }
                    
                }

                
                
           

            let response = await fetch(`http://localhost:6969/questions/${currentFormId}`)
            let data2 = await response.json()
                
                    for(const key in data2) {
                        
                        if(data2[key].formid * 1 === currentFormId) {
                            
                            arr.push(data2[key].question)
                            
                           questions.push('')
                            
                            
                            arrU.push(data2[key].question + data2[key].question_id)
                            
                            setQuestionsU(questionsU = arrU)
                            
                        }
                    }
                    
                
                for(let i = 0; i < Number(questions.length); i++) {
                    responses.push([0,0,0,0,0])
                    afterResponses.push([0,0,0,0,0])
                    responseAmount.push(0)
                    afterResponseAmount.push(0)
                    rawResponses.push(0)
                    afterRawResponses.push(0)
                    
                }

                let res2 = await fetch(`http://localhost:6969/responses/${currentFormId}`)


                let data3 = await res2.json()

                

                for(let i = 0; i < responses.length; i++) {
                    for(const key in data3) {


                        
                        
                        
                        







                        if((data3[key].response * 1) === 1 && (data3[key].questionnum * 1) === i) {
                            responses[i][0] += 1
                            responseAmount[i] += 1
                            rawResponses[i] += (data3[key].response * 1)
                        } else if((data3[key].response * 1) === 2 && (data3[key].questionnum * 1) === i) {
                            responses[i][1] += 1
                            responseAmount[i] += 1
                            rawResponses[i] += (data3[key].response * 1)
                        } else if((data3[key].response * 1) === 3 && (data3[key].questionnum * 1) === i) {
                            responses[i][2] += 1
                            responseAmount[i] += 1
                            rawResponses[i] += (data3[key].response * 1)
                            
                        } else if((data3[key].response * 1) === 4 && (data3[key].questionnum * 1) === i) {
                            responses[i][3] += 1
                            responseAmount[i] += 1
                            rawResponses[i] += (data3[key].response * 1)
                        } else if((data3[key].response * 1) === 5 && (data3[key].questionnum * 1) === i) {
                            responses[i][4] += 1
                            responseAmount[i] += 1
                            rawResponses[i] += (data3[key].response * 1)
                        }
                    }
                    
                }
                
                
                let res3 = await fetch(`http://localhost:6969/responses/${currentFormId + 1}`)
                let data4 = await res3.json()

                

                for(let i = 0; i < responses.length; i++) {
                    for(const key in data4) {


                        

                        
                        







                        if((data4[key].response * 1) === 1 && (data4[key].questionnum * 1) === i) {
                            afterResponses[i][0] += 1
                            afterResponseAmount[i] += 1
                            afterRawResponses[i] += (data4[key].response * 1)
                        } else if((data4[key].response * 1) === 2 && (data4[key].questionnum * 1) === i) {
                            afterResponses[i][1] += 1
                            afterResponseAmount[i] += 1
                            afterRawResponses[i] += (data4[key].response * 1)
                        } else if((data4[key].response * 1) === 3 && (data4[key].questionnum * 1) === i) {
                            afterResponses[i][2] += 1
                            afterResponseAmount[i] += 1
                            afterRawResponses[i] += (data4[key].response * 1)
                            
                        } else if((data4[key].response * 1) === 4 && (data4[key].questionnum * 1) === i) {
                            afterResponses[i][3] += 1
                            afterResponseAmount[i] += 1
                            afterRawResponses[i] += (data4[key].response * 1)
                        } else if((data4[key].response * 1) === 5 && (data4[key].questionnum * 1) === i) {
                            afterResponses[i][4] += 1
                            afterResponseAmount[i] += 1
                            afterRawResponses[i] += (data4[key].response * 1)
                        }
                    }
                    
                }
 
                let response1 = await fetch(`http://localhost:6969/questions/${currentFormId}`)
            let data5 = await response1.json()
            for(const key in data5) {
                
                questions[data5[key].question_id] = data5[key].question

                
            }
    }
    









    function onChange(e) {
        setSearched(e.target.value.toLowerCase())
    }

    function inputOnChange(e) {
        if(Number(e.target.value) && Number(e.target.value) <= 5) {
            
        
        }
    }














    async function getForms() {
        setIsLoading(isLoading = true)
        
        let res = await fetch('http://localhost:6969/forms')
        let data = await res.json()
        
           
            for(const key in data) {
                    
                    if(data[key].title && data[key].title.split('-')[1] !== 'after') {
                        form.push(
                            data[key].title.split('-')[0]
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
        
        for(let i = 0; i < answers.length; i++) {
            
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
        
        
        setSearched(searched = '')
        submit()
    }
    

    function radioChangeHandler(e) {
       
        answers[questions.findIndex(question => question === e.target.name)] = e.target.value
       
    }   

    function getChartData() {
        for(let i = 0; i < questions.length; i++) {
            chartData.push([questions[i], responses[i][0] + afterResponses[i][0], responses[i][1] + afterResponses[i][1], responses[i][2] + afterResponses[i][2], responses[i][3] + afterResponses[i][3], responses[i][4] + afterResponses[i][4]])
        }
       //JDSHFJKHDSFKJHSDFLSDJHflSJDHLFLJSHFJHSHFLSKJDHFKSDHFHSDHLFJHSDJFHSDLJKFHSHFJSHHFDSFKJHSDLFKJHDSJFHJKSDHFLJDSHLFKJHDS
    }


    function sendToForm(e) {
        setCanRender(false)
        setChartData(chartData = [
            ['Responses', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
        ])
        setSearched(searched = e.target.textContent.toLowerCase())
        submit()
       
        setAfterResponseAmount(afterResponseAmount = [])
        setAfterResponses(afterResponses = [])
        setAfterRawResponses(afterRawResponses = [])
        setAllAddedBefore(allAddedBefore = 0)
        setAllAddedAfter(allAddedAfter = 0) //IUIADHLKHSDFGLKUDSLFGFKSDLHFHDLSHFDSFHLJKSDHFLKJDSHLKJSHFKLJHSDKJFHLDSKJHFLKJDSHFKLJHSJFD
        setTimeout(() => {
            getChartData()
            setCanRender(true)
            console.log(afterResponses, afterResponseAmount, afterRawResponses, responses, responseAmount, rawResponses)
            setCanRender(true)
            for(let i = 0; i < questions.length; i++) {
                setAllAddedBefore(allAddedBefore += rawResponses[i] / responseAmount[i]) 
                setAllAddedAfter(allAddedAfter += afterRawResponses[i] / afterResponseAmount[i])
            }
            
            
        }, 110)

        setTimeout(() => {
            
            
            
            
            
            
        }, 120)
        
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

    function copyAfter(e) {
        navigator.clipboard.writeText(afterCurrentFormUid)
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
                    
                    {questions.length > 0 && 
                        <h3>Form uid:</h3>
                        }
                    {questions.length > 0 && <Paper className='formUidPaper'>
                        <h3>Before {currentFormUid}</h3>
                        <h3>After {afterCurrentFormUid}</h3>
                        <h5>Copy to Clipboard</h5>
                        <Button variant="contained" className='copytoclipboard' onClick={copy}>BEFORE</Button>
                        <Button variant="contained" className='copytoclipboard' onClick={copyAfter}>AFTER</Button>
                        </Paper>}
                        {/* <Paper>
                            <StackedChart data={chartData}/> //for next time bc this still works
                        </Paper> */}
                        {canRender && <h1>Program value add: <br/> {canRender && <span className='programvalueadd'>{!(((allAddedAfter - allAddedBefore) / allAddedBefore) * 100) ? '' : (((allAddedAfter - allAddedBefore) / allAddedBefore) * 100) >= 0 ? '+' : '' }{(((allAddedAfter - allAddedBefore) / allAddedBefore) * 100).toFixed(3)}%</span>}</h1>}
                       
                        
                        <h6>Participants rate themselves on the objective statements before the programme. They then do the same after the programme, also reflecting on their initial responses before the programme if they felt they had underrated or overrated themselves before.</h6>
                        <br className='smallbr'/>
                        <h6>This allowed us to adjust the “Before” numbers and calculate the average self perceived improvement across all four objectives; this we call the <strong>Programme Value Add</strong>.</h6>
                        
                        <br />
                        
                    {questions.length > 0 && questions.map((item, index) => <div key={Math.random() * 10000} className="radios">
                                                
                                                <li key={Math.random() * 10000} className='list-item'><h1 className='bigh1'>{item}</h1></li>  
                                                <hr/>
                                                
                                                
                                                <div className='before-container-two'>
                                                    <h3 className='before'>BEFORE</h3>
                                                    <h4>Responses: {responseAmount[index]} </h4>
                                                    <h2>Average responses</h2>
                                                    {canRender && <h1>{responseAmount[index] > 0 ? (rawResponses[index] / responseAmount[index]).toFixed(3) : 'No responses'}</h1>}
                                                </div>
                                                
                                                <div className='after-container-two'>
                                                    <h3 >AFTER</h3>
                                                    <h4>Responses: {afterResponseAmount[index]} </h4>
                                                    <h2>Average responses</h2>           
                                                    {canRender && <h1> {responseAmount[index] > 0 ? (afterRawResponses[index] / afterResponseAmount[index]).toFixed(3) : 'No responses'}</h1>}
                                                </div>                                                     
                                                
                                                {responses.length > 0  && responses !== undefined && <Chart title="Before" type={chartType} one={responses[index][0] ? responses[index][0] : 0} two={responses[index][1] ? responses[index][1] : 0} three={responses[index][2] ? responses[index][2] : 0} four={responses[index][3] ? responses[index][3] : 0} five={responses[index][4] ? responses[index][4] : 0}/>}
                                                {afterResponses.length > 0  && afterResponses !== undefined && <Chart title="After" type={chartType} one={afterResponses[index][0] ? afterResponses[index][0] : 0} two={afterResponses[index][1] ? afterResponses[index][1] : 0} three={afterResponses[index][2] ? afterResponses[index][2] : 0} four={afterResponses[index][3] ? afterResponses[index][3] : 0} five={afterResponses[index][4] ? afterResponses[index][4] : 0}/>}
                                                <hr/>
                                                {/* <h3>AFTER</h3>
                                                <h2>Average response</h2>
                                                {canRender &&<h1>{(afterRawResponses[index] / afterResponseAmount[index]).toFixed(3)}</h1>} */}
                                                {/* <small className='smallll'>END OF THIS QUESTION'S RESPONSES</small> */}
                                                
                                                
                                      </div>)
                                      }
                           {/* <Button variant="contained" onClick={} className="submit">Submit Form</Button>            */}
                </ol>}

                
                
                    
                   {/* {isLoading && <h1>Loading...</h1>} */}
                   

                   <Drawer className="drawer" variant="permanent" anchor='right' classes={{ paper: 'drawerPaper'}}>
                   {/* <Button variant="contained" onClick={getForms} className='button'>Fetch all forms</Button> */}
                <div>
                    <Typography variant="h6">
                        All Programs Available
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

export default PreviewBeforeAfter