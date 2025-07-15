import express from 'express';
import { getCaseAssignments, getCaseAssignment, createCaseAssignment, updateCaseAssignment, deleteCaseAssignment } from '../controllers/CaseAssignmentController.js';


const router = express.Router();

// Define routes for case assignments
router.get('/', getCaseAssignments); // Get all case assignments
router.get('/:id', getCaseAssignment); // Get a specific case assignment by ID
router.post('/', createCaseAssignment); // Create a new case assignment
router.put('/:id', updateCaseAssignment); // Update a specific case assignment by ID
router.delete('/:id', deleteCaseAssignment); // Delete a specific case

//Forma 2
/*
router.route('/').get(getCaseAssignments).post(createCaseAssignment);
router.route('/:id').get(getCaseAssignment).put(updateCaseAssignment).delete(deleteCaseAssignment);
*/

export default router;
