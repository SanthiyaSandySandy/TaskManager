const router = require("express").Router()
const User = require('../models/user');
const bcrypt = require("bcryptjs")
const List = require('../models/list');

//add Task

router.post('/addTask', async (req, res) => {
    console.log(req.body)
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (existingUser) {
            const list = new List({ title, body, user: existingUser });
            await list.save().then(() => res.status(200).json({ list }));
            existingUser.list.push();
            existingUser.save()
        }
    } catch (error) {
        console.log(error)
    }
})

// update Task

router.put('/updateTask/:id', async (req, res) => {
    console.log(req.body)
    try {
        const { title, body } = req.body;
            const list = await List.findByIdAndUpdate(req.params.id, { title, body });
            list.save().then(() => res.status(200).json({ message: "Task updated" }))
    } catch (error) {
        res.status(200).json({ message: "Unable to Update" })
    }
})

//delete task
router.delete('/deleteTask/:id', async (req, res) => {
    console.log(req.body)
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id,
            { $pull: { list: req.params.id } }
        );
        console.log(existingUser)
        if (existingUser) {
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "Task Deleted" }));
        } else {
            res.status(200).json({ message: "Not found" })  
        }
    } catch (error) {
        console.log(error)
    }
})

//get task by ID
router.get("/getTask/:id", async (req, res) => {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: 1 });
    if (list.length != 0) {
        res.status(200).json({ list })
    } else {
        res.status(200).json({ message: "No Task Available" })
    }
})

//get task
router.get("/getTask", async (req, res) => {
    const list = await List();
    if (list.length != 0) {
        res.status(200).json({ list })
    } else {
        res.status(400).json({ message: "no list added" })
    }
})


//Sign Up

router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { email, username, password, confirmPassword } = req.body;
        if (password == confirmPassword) {
            const hashpassword = bcrypt.hashSync(password)
            const user = new User({ email, username, password: hashpassword });
            await user.save().then(() => res.status(200).json({message:"User Added Successfully"}))
        } else {
            res.status(400).json({ message: "Password and Confirm Password dosen't match" })
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({ message: "User already exists" })
    }
})

//Sign-In

router.post("/login", async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(200).json({ message: "User not found, Please Sign-Up First" })
            return  
        }
        const passwordCorrect = bcrypt.compareSync(req.body.password, user.password);
     if (!passwordCorrect) {
            res.status(200).json({ message: "Incorrect password" })
        } else {
            const { password, ...others } = user._doc;
            res.status(200).json({ others })
        }

    } catch (error) {
        console.log(error)
        res.status(200).json({ message: "User already exists" })
    }
})

module.exports = router
