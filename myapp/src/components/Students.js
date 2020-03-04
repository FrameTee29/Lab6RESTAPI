import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../frame.css'

export default () => {

    const [students, setStudents] = useState({})
    const [sid, setSid] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')

    useEffect(() => {
        getStudents()
    }, [])

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
        const result = await axios.put(`http://localhost/api/students/${sid}`, {
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
        if (students && students.length)
            return students.map((student, index) => {
                return (
                    <div>
                        <li key={index}>
                            <div className="fontDetail">
                                {student.sid} : {student.name} : {student.surname} : {student.height} : {student.weight}
                            </div>
                            <div className="fontDetail">
                                <button type="button" class="btn btn-success" onClick={() => getStudent(student.sid)}> Get </button>
                                <button type="button" class="btn btn-warning" onClick={() => delStudent(student.sid)}> Delete </button>
                                <button type="button" class="btn btn-danger" onClick={() => updateStudent(student.sid)}> Update </button>
                            </div>
                        </li>
                    </div>
                )
            })
        else {
            return (<h2> No Student </h2>)
        }

    }

    return (
        <div className="container">
            <div class="alert alert-primary" role="alert">
                <h1> Hello world</h1>
            </div>

            <div class="alert alert-danger" role="alert">
                <h2>Student</h2>
            </div>

            <ul>
                {printStudents()}
            </ul>
            <div class="alert alert-danger" role="alert">
                <h2>Get Student</h2>
            </div>
            <div className="container">
                <h3>Get: </h3>
                <h4>Student ID :{sid} </h4>
                <h4>Name :  {name} </h4> 
                <h4>Surname : {surname} </h4> 
                <h4>Height : {height} </h4> 
                <h4>Weight : {weight}</h4>  
            </div>
            <div class="alert alert-danger" role="alert">
                <h2>Add Student</h2>
            </div>
            <h3>Sid:</h3>
            <input
                placeholder="Student id"
                type="text"
                name="sid"
                value={sid}
                onChange={(e) => setSid(e.target.value)}
            /> <br />
            <h3>Name:</h3>
            <input
                placeholder="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            /> <br />
            <h3>Surname:</h3>
            <input
                placeholder="Surname"
                type="text"
                name="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            /> <br />
            <h3>Height:</h3>
            <input
                placeholder="Height"
                type="number"
                name="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            /> <br />
            <h3>Weight:</h3>
            <input
                type="number"
                name="weight"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            /><br />
            <button type="button" class="btn btn-dark" onClick={addStudent}>Add </button>
        </div>
    )
}