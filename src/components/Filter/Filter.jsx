import React, { useState, useEffect }  from 'react'
import '../Filter/Filter.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { isAllTransferFilters } from './utils';
import {defaultTransferFilters, emptyTransferFilters} from './constants';


function Filter({currency, setCurrensy, transferFilter, setTransferFilter}) {

	//состояние для отображения чекбокса "Все"
const [isAllChecked, setIsAllChecked] = useState(true)

useEffect (() => {
	if (isAllTransferFilters(transferFilter)) {
		setIsAllChecked(true)
	} else {
		setIsAllChecked(false)
	}
}, [transferFilter])


	const checkedFilterAll = (e) => {
		if (isAllChecked) {
			setTransferFilter(emptyTransferFilters)
		} else {
			setTransferFilter(defaultTransferFilters)
		}
	}

	const checkedFilter = (e) => {
		const value = e.target.value
		if (transferFilter[value]) {
			setTransferFilter((prev) => ({
				...prev,
				[value]: false
			}))
		} else {
			setTransferFilter((prev) => ({
				...prev,
				[value]: true
			}))
		}
	}

	
	const changeHandler = (event) => {
		setCurrensy(event.target.id);
		switch (event.target.id) {
			case 'rub':
				return setCurrensy('rub')
			case 'usd':
				return setCurrensy('usd')
			case 'eur':
				return setCurrensy('eur')
			default:
				return setCurrensy('rub')
		}
	};

	return (
		<div className='filter'>
			<div className='filter_currencies'>
				<h3>ВАЛЮТА</h3>
				<div className='currenciesButtons'>
					<button id='rub' className={currency === 'rub' ? 'button active' : 'button'} onClick={changeHandler}>RUB</button>
					<button id='usd' className={currency === 'usd' ? 'button active' : 'button'} onClick={changeHandler}>USD</button>
					<button id='eur' className={currency === 'eur' ? 'button active' : 'button'} onClick={changeHandler}>EUR</button>
				</div>
			</div>
			<div className='filter_check'>
				<h3>КОЛИЧЕСТВО ПЕРЕСАДОК</h3>
				<FormControlLabel
          value="end"
          control={<Checkbox 
							id='all'
							checked={isAllChecked}
							name="checkboxAll"
							value='all'
							onChange={checkedFilterAll}						
						/>}
          label="Все"
					labelPlacement="end"
        />
				<FormControlLabel
          value="end"
          control={<Checkbox 
							id='none'
							checked={transferFilter[0]}
							name="checkbox0"
							value='0'
							onChange={checkedFilter}
						/>}
          label="Без пересадок"
          labelPlacement="end"
        />
				<FormControlLabel
          value="end"
          control={<Checkbox 
							id='one'
							checked={transferFilter[1]}
							name="checkbox1"
							value='1'
							onChange={checkedFilter}
						/>}
          label="1 пересадка"
          labelPlacement="end"
        />
				<FormControlLabel
          value="end"
          control={<Checkbox 
							id='two'
							checked={transferFilter[2]}
							name="checkbox2"
							value='2'
							onChange={checkedFilter}				
						/>}
          label="2 пересадки"
          labelPlacement="end"
        />
				<FormControlLabel
          value="end"
          control = {<Checkbox 
							id='three'
							checked={transferFilter[3]}
							name="checkbox3"
							value='3'
							onChange={checkedFilter}							
						/>}
          label="3 пересадки"
          labelPlacement="end"
        />																				
			</div>
		</div>
	)
	}




export default Filter