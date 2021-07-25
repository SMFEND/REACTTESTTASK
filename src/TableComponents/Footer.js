import React, {useContext} from "react"
import ChosenContext from './Context'
export default function Footer() {
    const value = useContext(ChosenContext)
    console.log(value)
    return (
            value ?
            <footer> 
                <h1>{value}</h1>
            </footer> 
            :
            <footer>
                <h1>Footer</h1>
            </footer>
    )   
}