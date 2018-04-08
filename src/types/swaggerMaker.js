// @flow
import { type molotovConfig } from 'molotov/lib/types/molotov';

import { type semveristConfig } from './semveristConfig';

export type semveristJsonSchema = {};

export type configNames = ("Sgs");

export type sgsConfig = {
  swaggerVersion: string,
  apiType: string,
  sgsType: string,
  mergeConfig: {
    sgs: boolean
  }
}

export type userSgsConfig = {
  swaggerVersion?: string,
  apiType?: string,
  sgsType?: string,
  mergeConfig?: {
    sgs?: boolean
  }
}

export type semverishNumberOrObject = ({[string]: semverishNumberOrObject} | {}); // eslint-disable-line max-len

export type semverish = {
  [string]: {
    [string]: semverishNumberOrObject
  }
}

export type userConfigTypes = (userSgsConfig);
export type configTypes = (sgsConfig);

export type schemePunkScheme = {
  source: {
    target?: string,
    plugin?: string,
  },
  transform: {
    target?: string,
    plugin?: string,
  },
  destination: {
    target?: string,
    plugin?: string,
  },
  holdovers?: {
    src: {}
  },
  callPath?: string
}

export type swaggerMainData = {
  apiName: string,
  apiVersion: string,
  apiDescription?: string,
  termsOfService?: string,
  contact?: {
    name?: string,
    url?: string,
    email?: string,
  },
  license?: {
    name?: string,
    url?: string,
  },
  apiHost?: string,
  apiBasePath?: string,
  schemes?: {
    items?: Array<string>,
    process: () => Array<string>,
  },
  consumes?: Array<{
    items?: {
      type?: string,
      comma?: boolean
    }
  }>,
  produces?: Array<{
    items?: {
      type?: string,
      comma?: boolean
    }
  }>,
  definitions: {
    process: () => {},
    items?: {}
  },
  parameters: {
    process: () => {},
    items?: {},
  },
  responses: {
    process: () => {},
    items?: {},
  },
  securityDefinitions: {
    process: () => {},
    items?: {}
  },
  security: {
    process: () => {},
    items?: {}
  },
  tags?: {
    process: () => {},
    items?: Array<{
      name: string,
      description?: string,
      url?: string
    }>
  },
  externalDocs?: {
    description?: string,
    url?: string
  }
}

export type semverishNumberOrMain = ({[string]: semverishNumberOrMain} | swaggerMainData); // eslint-disable-line max-len

export type semverishSrc = {
  [string]: {
    [string]: semverishNumberOrMain
  }
}

export type mainTeamplate = {
  title: string,
  description?: string,
  version: string,
  termsOfService?: string,
  contact?: string,
  license?: string,
  host?: string,
  basePath?: string,
  schemes?: string,
  consumes?: string,
  produces?: string,
  definitions?: string,
  parameters?: string,
  responses?: string,
  securityDefinitions?: string,
  security?: string,
  tags?: string,
  externalsDocs?: string,
  destinationTemplate: string
}

export type swaggerMakerOptions = {
  data: {
    semveristConfig: semveristConfig,
    semveristMolotovOptions: molotovConfig
  },
  schemes: {
    schemes: {
      [string]: Array<Array<schemePunkScheme>>
    },
    semveristConfig: semveristConfig,
    semveristMolotovOptions: molotovConfig,
    schemePunkMolotovOptions: molotovConfig,
    templateOverrides: {}
  }
}
