import { camelCase, snakeCase } from 'lodash';

const convertResponse = (response: any) =>
  Object.entries(response)
    .map(([key, value]) => [camelCase(key), value])
    //@ts-ignore
    .reduce((acc, [k, v]) => ((acc[k] = v), acc), {});

const convertIdentifierName = (id: string) => snakeCase(id);

export { convertResponse, convertIdentifierName };
