import { CaseAssignmentModel } from '../models/CaseAssignmentModel.js';

export const getCaseAssignments = async (req, res) => {
    try {
        const caseAssignments = await CaseAssignmentModel.find();
        res.status(200).json(caseAssignments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving case assignments', error });
    }
}

export const getCaseAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const caseAssignment = await CaseAssignmentModel.findById(id);
        if (!caseAssignment) {
            return res.status(404).json({ message: `Case assignment with ID: ${id} not found` });
        }
        res.status(200).json(caseAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving case assignment', error });
    }
}

export const createCaseAssignment = async (req, res) => {
    try {
        const newCaseAssignment = await CaseAssignmentModel.create(req.body);
        res.status(201).json(newCaseAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating case assignment', error });
    }
}

export const updateCaseAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCaseAssignment = await CaseAssignmentModel.findByIdAndUpdate({_id: id}, req.body, { new: true });
        if (!updatedCaseAssignment) {
            return res.status(404).json({ message: 'Case assignment not found' });
        }
        res.status(200).json(updatedCaseAssignment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating case assignment', error });
    }
}

export const deleteCaseAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCaseAssignment = await CaseAssignmentModel.findByIdAndDelete(id);
        if (!deletedCaseAssignment) {
            return res.status(404).json({ message: `Case assignment with ID: ${id} not found` });
        }
        res.status(200).json({ message: 'Case assignment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting case assignment', error });
    }
}
