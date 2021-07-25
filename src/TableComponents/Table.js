import React, {useState, useMemo, useEffect} from "react"
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import {Filter} from './Filter'
import ChosenContext from './Context'
import Footer from './Footer'

function Table() {
    const [tariffs_list, setTariffs_list] = useState([])
    const [cars, setCars] = useState([{"mark":"Acura","model":"ILX","tariffs":{"Комфорт":{"year":2015},"Стандарт":{"year":2014}}}]);
    const [chosen, setChosen] = useState('')

    const columns = useMemo(() => tariffs_list, [tariffs_list])
    const data = useMemo(() => cars, [cars])
  

    useEffect(() => {
        fetch("https://city-mobil.ru/api/cars")
        .then(response => response.json())
        .then(json => {
            let arr = []
            setCars(json.cars)
            arr.push({Header: 'Имя и модель', accessor: (row) => {
                return row.mark + ' ' + row.model 
            },})
            for (let element of json.tariffs_list)
                arr.push({Header: element, accessor: `tariffs.${ element }.year`, Cell: ({value}) => { 
                    if(value) 
                        return String(value); 
                    else return '-'
                }})
            setTariffs_list(arr)
        })
        .catch(err => {
            throw new Error("Stop")
        })
    }, [])
    
    const carsTable = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy)

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
        state,
        setGlobalFilter,
    } = carsTable

    const {globalFilter} = state;
    return (
        <ChosenContext.Provider value={chosen}>
        <div className="content">
        <Filter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
            <thead>
                {
                headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? ' ⬇️ ' : ' ⬆️' ) : ''}
                            </span>
                        </th>
                    ))}
                    </tr>
                ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return ( 
                        <tr {...row.getRowProps()} onClick={() => {
                            setChosen(`Вы выбрали ${row.original.mark} ${row.original.model}`)
                        }}>
                             {
                             row.cells.map(cell => {
                                 return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                             })
                            }
                        </tr>
                        )
                    })
                }           
            </tbody>
        </table>
        </div>
        <Footer />
        </ChosenContext.Provider>
    )
}

export default Table;