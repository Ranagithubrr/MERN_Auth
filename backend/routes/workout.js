const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

router.post("/getdata", async (req, res) => {
    const { email } = req.body;
    try {
        const workout = (await Workout.find({email})).reverse(-1);
        res.status(200).json(workout)
    } catch (err) {
        console.log('an error')
        res.status(400).json({msg:'error'});
        console.log(err)
    }

});
// find by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const workout = await Workout.findById(id);
        if (workout) {
            res.status(200).json({ workout })
        } else {
            res.status(400).json({ err: "not found" })
        }
    } catch (error) {
        res.status(200).send("not found")
    }

});
router.post("/", async (req, res) => {
    const { title, reps, load, email } = req.body;
    if (title === "" || reps === "" || load === "" || title === null || reps === null || load === null || title === undefined || reps === undefined || load === undefined) {
        res.status(400).send("please fill all the values")
    } else {
        try {
            const workout = await Workout.create({ title, reps, load, email });
            res.status(200).json(workout);
        } catch (err) {
            console.log('err');
            res.status(400).send("an error")
        }
    }

});
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Workout.findByIdAndDelete(id);
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).send("err")
    }
});
// update
router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Workout.findByIdAndUpdate(id, {
            ...req.body
        });
        res.status(200).json(response)
    }
    catch (err) {
        res.status(400).send("err")
    }
});


module.exports = router;