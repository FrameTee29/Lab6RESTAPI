let express = require('express')
let app = express()
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
app.use(cors());

// all of our routes will be prefixed with /api
app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let students = [
    {
        sid: "6035512080",
        name: 'Teeraphat',
        surname:'Sittinantakul' ,
        height: 168,
        weight : 64,
    },
    
];

router.route('/students')
    .get((req, res) => res.json(students))
    
    .post((req,res)=>{
        let student = {}
            student.id = students[students.length-1].id+1
            student.sid = req.body.sid
            student.name = req.body.name
            student.surname = req.body.surname
            student.height = req.body.height
            student.weight = req.body.weight
            students.push(student)            
            res.json( {message: 'Student created!'} )
    })

router.route('/students/:student_id')
    .get((req,res) => {
        let sid = req.params.student_id
        let index = students.findIndex( student => (student.sid == +sid) )
        res.json(students[index])
    })

    .put((req,res) => {                               // Update a bear
        let sid = req.params.student_id
        let index = students.findIndex( student => (student.sid == +sid) )
        students[index].sid = req.body.sid;
        students[index].name = req.body.name;
        students[index].surname = req.body.surname;     
        students[index].height = req.body.height;
        students[index].weight = req.body.weight;      
        res.json({ message: 'Student updated!' + req.params.student_id});
    })

    .delete((req,res) => {                   // Delete a bear
        let sid = req.params.student_id
        let index = students.findIndex( student => student.sid == +sid  )
        students.splice(index,1) 
        res.json({ message: 'Student deleted: ' + req.params.student_id});
    })
 


app.use("*", (req, res) => res.status(404).send('404 Not found'));

app.listen(80, () => { console.log('server is running') })