// @flow

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

export type swaggerSource = {};
export type pathItemSource = {};

export type userSgsConfig = {
  swaggerVersion?: string,
  apiType?: string,
  sgsType?: string,
  mergeConfig?: {
    sgs?: boolean
  }
}

export type userConfigTypes = (userSgsConfig);
export type configTypes = (sgsConfig);
