import './App.css';
import { useState, useRef, useEffect } from 'react';
import { Button, Input, TextField } from '@mui/material';
import { ContentCopy, Edit } from '@mui/icons-material';

function App() {
  // localStorage.removeItem('activities')
  const [activities, setActivities] = useState(localStorage.getItem('activities') ? JSON.parse(localStorage.getItem('activities')) : [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ])

  const [inputName, setInputName] = useState("")

  const targetedHour = useRef()
  const [canRender, setCanRender] = useState(true)
  let [blocksToCollect, setBlocksToCollect] = useState([{name: 'test', id: 1}])


 

// THIS IS THE PAGE UPDATER
  useEffect(() => {
    setCanRender(false)
    
    setTimeout(() => setCanRender(true), 50)
    
  }, [activities, blocksToCollect])
  
  function manualUpdate() {
    setCanRender(false)
    
    setTimeout(() => setCanRender(true), 50)
  }
 
  function dragIn(hour) {
    targetedHour.current = hour
    console.log(hour)
    
  } 

  function enterHour(block) {
    if(targetedHour.current) {
      if(targetedHour.current.target.id) {
        if(targetedHour.current.target.id === 'delete') {
          let blockId = block.target.id
          // console.log('delete')
          let newDeleted = [...blocksToCollect]
          newDeleted.splice(blockId, 1)
          setBlocksToCollect(newDeleted)
        } else {
          let day = targetedHour.current.target.id.split('-')[0]
          let hourId = targetedHour.current.target.id.split('-')[1]
          let newActivities = [...activities]
          
          if (newActivities[day][hourId] !== '') {
            console.log(newActivities[day][hourId])
            let newCollect = [...blocksToCollect]
            newCollect.push({name: newActivities[day][hourId], id: newCollect.length + 1})
            setBlocksToCollect(blocksToCollect = newCollect)
            console.log(blocksToCollect, newCollect)
          }
          newActivities[day][hourId] = block.target.innerText
          setActivities(newActivities)
          let blockId = block.target.id
          console.log(blockId)
          let newDeleted = [...blocksToCollect]
          newDeleted.splice(blockId, 1)
          setBlocksToCollect(newDeleted)
          

        }
        localStorage.setItem('activities', JSON.stringify(activities))
      }
      
    }
  }

  function createBlock(e, name) {
    if(e !== 0) {
      e.preventDefault()
    }
    if (name) {
      let newCollect = [...blocksToCollect]
      newCollect.push({name: name, id: newCollect.length + 1})
      setBlocksToCollect(old => old = newCollect)
      setInputName('')
    } else {
      let newCollect = [...blocksToCollect]
      newCollect.push({name: inputName, id: newCollect.length + 1})
      setBlocksToCollect(old => old = newCollect)
      setInputName('')
    }
  }

  function takeOut(e) {
    e.preventDefault()
    if(e.target.innerText) {
      createBlock(0, e.target.innerText)
      let day = e.target.id.split('-')[0]
      let hourId = e.target.id.split('-')[1]

      let temp = [...activities]

      temp[day][hourId] = ''
      setActivities(temp)

      localStorage.setItem('activities', JSON.stringify(activities))
    }
  }

  function dupe(e) {
    let id = e.target.id * 1
    createBlock(0, blocksToCollect[id].name)
  }

  function edit(e) {
    e.preventDefault()
    let id = e.target.id * 1
    let newName = prompt('edit')

    blocksToCollect[id].name = newName

    manualUpdate()
  }


  return (
    <div className="App">
      {canRender && <div className='table'>
        <div className='flex-horiz'>
          <div className='center'>
            <h1>monday
              <ol className='day'>
                {activities[0].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`0-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>
          
          <div className='center'> 
            <h1>tuesday
            <ol>
                {activities[1].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`1-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>

          <div className='center'>
            <h1>wednesday
            <ol>
                {activities[2].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`2-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>
          
          <div className='center'>
            <h1>thursday
            <ol>
                {activities[3].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`3-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>

          <div className='center'>
            <h1>friday
            <ol>
                {activities[4].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`4-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>
                  
          <div className='center'>
            <h1>saturday
            <ol>
                {activities[5].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`5-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>

          <div className='center'>
            <h1>sunday
            <ol>
                {activities[6].map((item, id) => (
                  <div className='hour' onDragEnter={dragIn} onClick={takeOut}>
                    <li id={`6-${id}`} className='hourText'>{item}</li>
                  </div>
                ))}
              </ol>
            </h1>
          </div>
          
          <div className='creating-zone'>
                <h1>create a block</h1>
                <div className='background-white'>
                  <TextField value={inputName} label="NAME OF BLOCK" variant="outlined" onChange={(e) => {setInputName(e.target.value)}}/>
                </div>
                <Button variant='contained' className='createButton' onClick={createBlock}>CREATE</Button>
                <div className='delete-zone' id='delete' onDragEnter={dragIn}>
                  <h2>delete</h2>
                </div>
          </div>
        </div>
      </div>}
      {canRender && <div className='collecting-zone'>
          {/* the block of activity */}
          {console.log(blocksToCollect)}
          {canRender && blocksToCollect.map((obj, index) => (
            <div className='block' draggable='true' id={index} onDragEnd={enterHour}>
              <h1>{obj.name}</h1>
              <Button className='duplicate' variant='contained' id={index} startIcon={<ContentCopy/>} onClick={dupe}/>
              <br/>
              <Button className='copy' variant='contained' id={index} startIcon={<Edit/>} onClick={edit}/>
              
          </div>
          ))}
          

      </div>}

      
    </div>
  );
}

export default App;
