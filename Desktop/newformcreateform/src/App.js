
import './App.css';
import React, {useState} from 'react'
import Form from './stuff/form';
import FormQuestions from './stuff/formQuestions';
import PreviewForm from './stuff/previewForm';
import UpdateForm from './stuff/updateForm';
import PreviewOneForm from './stuff/previewOneForm';
import {Routes, Route, Navigate} from 'react-router-dom'
import PreviewBeforeAfter from './stuff/previewBeforeAfter';
import Graph from './stuff/graph';
import Layout from './stuff/layout';
import PreviewQuad from './stuff/previewQuad';
function App() {
  const[sent, setSent] = useState(false)
  const [title, setTitle] = useState('');
  const[double, setDouble] = useState(false)
  return (
    <div className="App">
      <Routes>
        <Route path="/title" element={<Layout>
          <Form sent={sent} setSent={setSent} title={title} setTitle={setTitle} double={double} setDouble={setDouble}/>
          </Layout> }/>
      
      
       <Route path="/questions" element={<Layout><FormQuestions sent={sent} setSent={setSent} title={title} setTitle={setTitle} double={double} setDouble={setDouble}/> </Layout>}/>
      
       <Route path="/preview" element={<Layout><PreviewForm sent={sent} setSent={setSent} title={title} setTitle={setTitle}/> </Layout>}/>
       <Route path="/update/:id" element={<UpdateForm sent={sent} setSent={setSent} title={title} setTitle={setTitle}/> }/>
      
       <Route path="/forms/:id" element={<PreviewOneForm sent={sent} setSent={setSent} title={title} setTitle={setTitle}/> }/>
       <Route path="/graphs/:id" element={<Graph sent={sent} setSent={setSent} title={title} setTitle={setTitle}/> }/>
       <Route path="/previewgraphs" element={<Layout><PreviewBeforeAfter sent={sent} setSent={setSent} title={title} setTitle={setTitle}/></Layout> }/>
       <Route path="/previewfourgraphs" element={<Layout><PreviewQuad sent={sent} setSent={setSent} title={title} setTitle={setTitle}/></Layout> }/>
        <Route path="*" element={<Navigate to="/title"/> }/>
      </Routes>
    </div>
  );
}

export default App;
