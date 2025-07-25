//Case assignment model = Modelo de asignación de casos
import mongoose from 'mongoose';

//Creamos un schema(esquema)
const caseAssignmentSchema = new mongoose.Schema({
    court: {
        type: String,
        required: [true, 'Court is required']
    },
    caseNumber: {
        type: String,
        required: [true, 'Case number is required']
    },
    numberPeopleCustody: {
        type: String,
        required: [true, 'Number of people in custody is required']
    },
    crimeCategory: {
        type: String,
        required: [true, 'Crime category is required']
    },
    RemarksField: {
        type: String
    },
    assignedAt: {
        type: Date,
        default: Date.now
    }
});

//Creamos un modelo a partir del schema
export const CaseAssignmentModel = mongoose.model('CaseAssignment', caseAssignmentSchema);