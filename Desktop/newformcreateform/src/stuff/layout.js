import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Typography } from '@mui/material'
import React from 'react'
import './layout.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddCircleOutlineOutlined, DeleteOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
import TimelineIcon from '@mui/icons-material/Timeline';
    

const Layout = ({children}) => {

    const navigate = useNavigate()
    const location = useLocation()


    return (
        <div className='flex'>
            <Drawer className="drawer" variant="permanent" anchor='left' classes={{ paper: 'drawerPaper'}}>
                <div>
                    <Typography variant="h6" className='name'>
                        The Website Formerly known as "Teval"
                    </Typography>
                </div>
                <List className='drawer-list'>
                    <ListItem button onClick={() => {navigate('/title')}} className={location.pathname == '/title' ? 'active' : null}>
                        <ListItemIcon><AddCircleOutlineOutlined color="primary"/></ListItemIcon>
                        <ListItemText primary="Create Form"/>
                    </ListItem>
                    <ListItem button onClick={() => {navigate('/preview')}} className={location.pathname == '/preview' ? 'active' : null}>
                        <ListItemIcon><SubjectOutlined color="primary"/></ListItemIcon>
                        <ListItemText primary="Preview Forms"/>
                    </ListItem>
                    {/* <ListItem button onClick={() => {navigate('/delete')}} className={location.pathname == '/delete' ? 'active' : null}>
                        <ListItemIcon><DeleteOutlineOutlined className='delete-icon'/></ListItemIcon>
                        <ListItemText primary="Delete Forms"/>
                    </ListItem> */}
                    <ListItem button onClick={() => {navigate('/previewgraphs')}} className={location.pathname == '/previewgraphs' ? 'active' : null}>
                        <ListItemIcon><TimelineIcon className='graph-icon'/></ListItemIcon>
                        <ListItemText primary="Self-Evaluation"/>
                    </ListItem>
                    <ListItem button onClick={() => {navigate('/previewfourgraphs')}} className={location.pathname == '/previewgraphs' ? 'active' : null}>
                        <ListItemIcon><TimelineIcon className='graph-icon'/></ListItemIcon>
                        <ListItemText primary="360 Feedback"/>
                    </ListItem>
                </List>
            </Drawer>
            <div className='children-elem'>
              {children}  
              
            </div>
            
        </div>

    )
}

export default Layout