import ajvInstance from './ajvInstance';
import { JSONSchemaType } from 'ajv';
import { ConverseRasa } from '../interfaces/proxy.interface';

const converseRasaSchema: JSONSchemaType<ConverseRasa> = {
  type: 'object',
  properties: {
    id: { type: 'string', nullable: false, minLength: 2 },
    name: { type: 'string', nullable: false, minLength: 2 },
    email: { type: 'string', nullable: false, format: 'email' },
    text: { type: 'string', nullable: false, minLength: 1 },
  },
  required: ['id', 'name', 'email', 'text'],
  additionalProperties: false,
};

export const converseRasaAjvValidate = ajvInstance.compile(converseRasaSchema);
