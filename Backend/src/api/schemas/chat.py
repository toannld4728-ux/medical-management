from marshmallow import Schema, fields


class MedicalRecordSchema(Schema):
    patient_id = fields.Int(required=True)
    doctor_id = fields.Int(required=True)
    notes = fields.String(required=True)
