// @flow
import { type molotovConfig } from 'molotov/lib/types/molotov';

import { type semveristConfig } from './semveristConfig';

export type semveristJsonSchema = {};

export type configNames = (
  "Sgs" |
  "SwaggerSrcSemverist" |
  "SwaggerMainTemplates" |
  "SwaggerSrcTemplatesSemverist" |
  "SwaggerSrcSchemes");

export type sgsDataType = ('swaggerSrc' | 'paths');

export type configNameSpace = ('data' | 'templates' | 'schemes');

export type sgsConfig = {
  swaggerVersion: string,
  apiType: string,
  sgsType: string,
  mergeConfig: {
    sgs: boolean
  },
  mainSwaggerSchemeProcessName: string,
  sgsSemver: semveristConfig,
  realizationsSource: ('swaggerSrc' | 'paths')
}

export type userSgsConfig = {
  swaggerVersion?: string,
  apiType?: string,
  sgsType?: string,
  mergeConfig?: {
    sgs?: boolean
  },
  sgsSemver?: semveristConfig,
  realizationsSource?: ('swaggerSrc' | 'paths')
}

export type semverishNumberOrObject = ({[string]: semverishNumberOrObject} | {}); // eslint-disable-line max-len

export type semverish = {
  [string]: {
    [string]: semverishNumberOrObject
  }
}

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

export type userConfigTypes = (userSgsConfig | semveristConfig);
export type configTypes = (sgsConfig | semveristConfig | schemePunkScheme);

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

export type mainTemplate = {
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

export type semverishNumberOrTemplate = ({[string]: semverishNumberOrTemplate} | mainTemplate); // eslint-disable-line max-len

export type templateSemverish = {
  [string]: {
    [string]: semverishNumberOrTemplate
  }
}

export type molotovConfigDefaults = {
  overrides: {},
  cocktailClasses: []
};

export type swaggerMakerDefaults = {
  data: {
    semveristConfig: {},
    semveristMolotovOptions: molotovConfigDefaults
  },
  schemes: {
    schemes: {},
    semveristConfig: {},
    semveristMolotovOptions: molotovConfigDefaults,
    schemePunkMolotovOptions: molotovConfigDefaults,
    templateOverrides: {};
  }
}

export type mainSwaggerMakerOptions = {
  data: {
    semveristConfig: semveristConfig,
    semveristMolotovOptions?: molotovConfig,
    targetName: string,
    desiredRealizations: Array<string>,
  },
  schemes: {
    schemes: {
      [string]: Array<Array<schemePunkScheme>>
    },
    semveristConfig: semveristConfig,
    semveristMolotovOptions: molotovConfig,
    schemePunkMolotovOptions?: molotovConfig,
    targetName: string,
  },
  templates: {
    semveristConfig: semveristConfig,
    templates: (mainTemplate | templateSemverish);
    semveristMolotovOptions?: molotovConfig,
    targetName: string,
  }
}

export type pathSwaggerMakerOptions = {
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
  },
  templates: {
    semveristConfig: semveristConfig,
    templates: (mainTemplate | templateSemverish);
    semveristMolotovOptions: molotovConfig
  }
}

export type pathsData = {
  definitions?: {
    items: {}
  },
  paths: Array<{
    pathItem: string,
    '$ref'?: string,
    last?: boolean,
    parameters?: {
      items: {}
    },
    operations: Array<{
      operationId: string,
      operationName: string,
      tags?: {
        items: {}
      },
      comma?: boolean,
      deprecated?: string,
      description?: string,
      externalDocs?: {
        description: string,
        url: string
      },
      summary?: string,
      produces?: {
        items: Array<string>
      },
      consumes?: {
        items: Array<string>
      },
      responses: {
        items: {
          [string]: {}
        }
      },
      parameters?: {
        items: Array<{}>
      },
      security?: {
        items: Array<string>
      }
    }>
  }>
}

