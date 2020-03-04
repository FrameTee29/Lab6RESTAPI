import React, {useState, useEffect}  from 'react'
import axios from 'axios'

export default () => {

    const [students, setStudents] = useState({})
    const [sid, setSid] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('') 
    const [height, setHeight] = useState(0)  
    const [weight, setWeight] = useState(0) 

    useEffect( () => {
        getStudents()
    } , [] )

    const getStudents = async () => {
       const result = await axios.get(`http://localhost/api/students`)
       console.log(result.data)
       setStudents(result.data)
    }

    const addStudent = async () => {
        const result = await axios.post(`http://localhost/api/students`, {
            sid,
            name,
            surname,
            height,
            weight
        })
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (sid) => {
        var result = await axios.get(`http://localhost/api/students/${sid}`)
        console.log(result.data)
        setSid(result.data.sid)
        setName(result.data.name)
        setSurname(result.data.surname)
        setHeight(result.data.height)
        setWeight(result.data.weight)        
    }
    const updateStudent = async (sid) => {
        const result = await axios.put(`http://localhost/api/students/${sid}`,{
            sid,
            name,
            surname,
            height,
            weight
        })

        console.log(result.data)
        setSid(result.data.sid)
        setName(result.data.name)
        setSurname(result.data.surname)
        setHeight(result.data.height)
        setWeight(result.data.weight)   
        getStudents()      
    }

    const delStudent = async (sid) => {
        const result = await axios.delete(`http://localhost/api/students/${sid}`)       
        getStudents()
    }

    const printStudents = () => {
        if ( students && students.length )
            return students.map((student,index) => {
                return (
                    <li key={index}>
                        {student.sid} : {student.name} : {student.surname} : {student.height} : {student.weight}
                        <button onClick={() => getStudent(student.sid)}> Get </button>
                        <button onClick={() => delStudent(student.sid)}> Delete </button>
                        <button onClick={() => updateStudent(student.sid)}> Update </button>
                    </li>
                )
            })
        else {
            return (<h2> No Student </h2>)
        }

    }

    return (
        <div>
            Student
            <ul>
                 {printStudents()}
            </ul>
            <h2>Get Student</h2>
            Get: {sid} : {name} : {surname} : {height} : {weight}

            <h2>Add Student</h2>
            Sid: 
            <input 
                placeholder="Student id"
                type="text"
                name="sid"
                value={sid}
                onChange={ (e)=> setSid(e.target.value) }
                /> <br/>
            Name: 
            <input 
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                onChange={ (e)=> setName(e.target.value) }
                /> <br/>
             Surname: 
            <input 
                placeholder="Surname"
                type="text"
                name="surname"
                value={surname}
                onChange={ (e)=> setSurname(e.target.value) }
                /> <br/>
             Height: 
            <input 
                placeholder="Height"
                type="number"
                name="height"
                value={height}
                onChange={ (e)=> setHeight(e.target.value) }
                /> <br/>
            Weight:
            <input                 
                type="number"
                name="weight"
                placeholder="Weight"
                value={weight}
                onChange={ (e)=> setWeight(e.target.value) }
                /><br/>
            <button onClick={addStudent}>Add </button>
      </div>
    )
}