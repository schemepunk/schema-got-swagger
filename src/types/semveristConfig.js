// @flow

export type semveristConfig = {
  callPath: string,
  semveristBehaviors: {
    inheritence: ('semverImplied' | null | 'lazySemverist'),
    lazySemverist: {
      preReleaseForwards: boolean,
      attributes: boolean
    },
    default: boolean,
    defaultName: string,
    groups: boolean,
    mergeStrategy: ('merge'),
    preReleasePattern: RegExp,
  },
  groups: {
    [string]: {
      members: Array<string>
    }
  },
  prereleaseOrdering: {
    [string]: {
      [string]: {
        [string]: Array<string>
      }
    }
  },
  directoryFileIgnorePattern: string,
  converterType: ('config' | 'default' | 'directory'),
  semverishObjectLocation: 'string',
  composer: {
    composerType: ('default' | 'directory'),
    destination: 'string',
    priority: 'default'
  }
}
