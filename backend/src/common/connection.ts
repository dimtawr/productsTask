import { Knex } from 'knex';
import { convertResponse, convertIdentifierName } from './converterCase';

const knex: Knex = require('knex')({
  client: 'postgres',
  connection: async () => {
    return {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_port,
      database: process.env.DB_DATABASE,
      timezone: process.env.TIMEZONE,
    };
  },

  postProcessResponse: (result: string, queryContext: any) => {
    if (Array.isArray(result)) {
      return result.map((row) => convertResponse(row));
    } else {
      return convertResponse(result);
    }
  },

  wrapIdentifier: (value: string, origImpl: any, queryContext: any) =>
    origImpl(convertIdentifierName(value)),
});

export default knex;
