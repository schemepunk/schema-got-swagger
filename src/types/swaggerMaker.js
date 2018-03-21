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

export type swaggerSource = {}

export type pathItemsSource = {}

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
