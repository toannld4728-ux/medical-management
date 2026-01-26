from marshmallow import Schema, fields


class TodoRequestSchema(Schema):
    title = fields.Str(required=True)
    description = fields.Str(required=False)
    completed = fields.Bool(required=False)


class TodoResponseSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    description = fields.Str()
    completed = fields.Bool()
