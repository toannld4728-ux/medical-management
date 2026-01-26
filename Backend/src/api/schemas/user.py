from marshmallow import Schema, fields


class UserResponseSchema(Schema):
    id = fields.Int()
    email = fields.Email()
    role_id = fields.Int()
