import React from "react";
import { useState, useEffect, useMemo} from 'react';
import './styles/App.css'
import logo from './images/logo.png'
import Filter from "./components/Filter/Filter";
import TicketList from "./components/TicketList/TicketList";
import { useFetching } from './hooks/useFetching';
import TicketService from './API/TicketService';
import Preloader from './components/UI/preloader/Preloader';
import Alert from '@mui/material/Alert';
import {defaultTransferFilters, emptyTransferFilters} from './components/Filter/constants';

function App() {
  const [tickets, setTickets] = useState([])
  const [currency, setCurrensy] = useState('rub')
  const [transferFilter, setTransferFilter] = useState(defaultTransferFilters)

  const filterTickets = useMemo (() => {
    return tickets.filter((ticket) => {
      return transferFilter[ticket.stops]
    })
    
  }, [tickets, transferFilter])

  const [fetchTickets, isTicketLoading, ticketError] = useFetching (async () => {
    const tickets = await TicketService.getAll();
    setTickets(tickets)
  })

  

  useEffect(() => {
      fetchTickets()
  }, [])

  return (
    <div className="wrapper">
      <header><img src={logo} className='logo'></img></header>
      <div className="container">
          <Filter 
            currency={currency} 
            setCurrensy={setCurrensy} 
            transferFilter={transferFilter} 
            setTransferFilter={setTransferFilter} 
          />
      {ticketError &&
        <Alert severity="error">Произошла ошибка <b>{ticketError}</b></Alert>
      }
      {isTicketLoading 
        ? <div className="preloader_container"><Preloader/></div>
        : (Object.values(transferFilter).every(v => v === false)
          ? <Alert className="emptyTicketList" severity="info">Список билетов пуст. Выберите один из фильтров</Alert>
          : <TicketList tickets={filterTickets} currency={currency}/>) 
      }
      </div>
    </div>
  );
}

export default App;
