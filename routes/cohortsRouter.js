const express = require("express");
const knex = require("knex");
const knexConfig = require('../knexfile');
const router = express.Router();

const db = knex(knexConfig.development);

// POST to /api/cohorts
router.post('/', async (req, res) => {
    try {

    } catch (error) {
        
    }
})

// GET to /api/cohorts
router.get('/', async (req, res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    } catch (error) {
        res.status(500).json(error);
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
        res.status(500).json(error);
    }
})

// GET to /api/cohorts/:id/students
router.get('/:id/students', async (req, res) => {
    try {

    } catch (error) {
        
    }
})

// PUT to /api/cohorts/:id
router.put('/:id', async (req, res) => {
    try {

    } catch (error) {
        
    }
})

// DELETE to /api/cohorts/:id
router.delete('/:id', async (req, res) => {
    try {

    } catch (error) {
        
    }
})


module.exports = router;