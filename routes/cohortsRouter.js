const express = require("express");
const knex = require("knex");
const knexConfig = require('../knexfile');
const router = express.Router();

const db = knex(knexConfig.development);

const errors = {
    '19':'A record with that name already exists.',
    'default_error':"There was an error."
}

// POST to /api/cohorts
router.post('/', async (req, res) => {
    try {
        const [id] = await db('cohorts').insert(req.body);
        res.status(201).json(id);
    } catch (error) {
        const errorMsg = errors[error.errno] || errors[default_error];
        res.status(500).json(errorMsg);
    }
})

// GET to /api/cohorts
router.get('/', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch (error) {
        const errorMsg = errors[error.errno] || errors[default_error];
        res.status(500).json(errorMsg);
    }
})

// GET to /api/cohorts/:id
router.get('/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts').where({id: req.params.id});
        if (cohort.length > 0) {
            const [reqCohort] = cohort;
            res.status(200).json(reqCohort);
        } else {
            res.status(404).json({error: `A cohort with the ID of ${req.params.id} does not exist.`});
        }
    } catch (error) {
        const errorMsg = errors[error.errno] || errors[default_error];
        res.status(500).json(errorMsg);
    }
})

// GET to /api/cohorts/:id/students
router.get('/:id/students', async (req, res) => {
    try {
        const students = await db('students').where({cohort_id: req.params.id})
        if (students.length > 0) {
            const [reqStudents] = students;
            res.status(200).json(reqStudents);
        } else {
            res.status(404).json({error: `The cohort with the ID of ${req.params.id} does not have any students.`})
        }
    } catch (error) {
        const errorMsg = errors[error.errno] || errors[default_error];
        res.status(500).json(errorMsg);
    }
})

// PUT to /api/cohorts/:id
router.put('/:id', async (req, res) => {
    try {
        const num = await db('cohorts').where({id: req.params.id}).update(req.body);

        if (num > 0) {
            const [cohort] = await db('cohorts').where({id: req.params.id});
            res.status(200).json(cohort)
        } else {
            res.status(404).json({error: `A cohort with the ID of ${req.params.id} does not exist.`});
        }
    } catch (error) {
        const errorMsg = errors[error.errno] || errors[default_error];
        res.status(500).json(errorMsg);
    }
})

// DELETE to /api/cohorts/:id
router.delete('/:id', async (req, res) => {
    try {
        const cohort = await db('cohorts').where({id: req.params.id}).del();
        if (cohort > 0) {
            res.status(204).send("The record was successfully deleted.");
        } else {
            res.status(404).json({error: `The cohort with the ID of ${req.params.id} does not exist.`})
        }
    } catch (error) {
        const errorMsg = errors[error.errno] || errors[default_error];
        res.status(500).json(errorMsg);
    }
})


module.exports = router;