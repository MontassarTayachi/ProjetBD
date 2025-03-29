import React, { useEffect } from 'react';
import Nav from './utils/Nav';
import UsersList from './utils/UsersList';
import AddUser from './utils/Adduser';
import CardItems from './utils/CardItems';
import {api} from '../../config';
import { Alert, Snackbar } from '@mui/material';
const Settings = () => {
    const [open, setOpen] = React.useState(false);
    const [rowsProfile, setRowsProfile] = React.useState([]);
    const [rowsStructure, setRowsStructure] = React.useState([]);
    const [rowsDomaine, setRowsDomaine] = React.useState([]);
    const [Employer, setEmployer] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [opensnackbar, setOpensnackbar] = React.useState(false);
    const [snackbarmessage, setSnackbarmessage] = React.useState('');
    const [update, setUpdate] = React.useState(0);
    const openSnackbar = (message) => {
        setSnackbarmessage(message);
        setOpensnackbar(true);
    };
    const fetch_data = async () => {
      try {
        const response = await fetch(api+'api/profil/getAll');
        const data = await response.json();
        setRowsProfile(data);
        const response2 = await fetch(api+'api/structure/getAll');
        const data2 = await response2.json();
        setRowsStructure(data2);
        const response3 = await fetch(api+'api/domaine/getAll');
        const data3 = await response3.json();
        setRowsDomaine(data3);
        const response4 = await fetch(api+'api/employeur/getAll');
        const data4 = await response4.json();
        setEmployer(data4);
        const response5 = await fetch(api+'api/user');
        const data5 = await response5.json();
        setUsers(data5);
        console.log(data5);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => { 
      fetch_data();
          }
    , [open,update]);


    return (
    <>
     <div className='Settings'>
     <Nav name="List of Users" fun={()=>{setOpen(true)}} namefunction="Add User " />
     <div className='qq989498'><UsersList  update={setUpdate} openSnackbar={openSnackbar} data={users}/></div> 
     {open&&<AddUser  openSnackbar={openSnackbar} fun={()=>{setOpen(false)}} open={open} />}
       <Snackbar open={opensnackbar} autoHideDuration={6000} onClose={() => setOpensnackbar(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}  >
                  <Alert onClose={() => setOpensnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    {snackbarmessage}
                  </Alert>
              </Snackbar>
    <div className='cardItems'>
    <CardItems them='profile' update={setUpdate} data={rowsProfile} libelle="libelle" ap='profil' />
     <CardItems them='Structure' update={setUpdate} data={rowsStructure} libelle="libelle" ap='structure' />
     </div>
     <div className='cardItems'>
     <CardItems them='Domaine' update={setUpdate} data={rowsDomaine} libelle="libelle" ap="domaine" />
     <CardItems them='Employer'  update={setUpdate} data={Employer}libelle="nomemployeur" ap="employeur" />
    </div>
   </div>
    </>    
    );
};

export default Settings;