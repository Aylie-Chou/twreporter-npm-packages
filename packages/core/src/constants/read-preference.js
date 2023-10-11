export const READ_PREFERENCE = {
  international: 'international',
  crossStraits: 'cross_straits',
  humanRight: 'human_right',
  society: 'society',
  environment: 'environment',
  education: 'education',
  politics: 'politics',
  economy: 'economy',
  culture: 'culture',
  art: 'art',
  life: 'life',
  health: 'health',
  sport: 'sport',
  all: 'all',
}

export const READ_PREFERENCE_ZH_TW = {
  [READ_PREFERENCE.international]: '國際',
  [READ_PREFERENCE.crossStraits]: '兩岸',
  [READ_PREFERENCE.humanRight]: '人權',
  [READ_PREFERENCE.society]: '社會',
  [READ_PREFERENCE.environment]: '環境',
  [READ_PREFERENCE.education]: '教育',
  [READ_PREFERENCE.politics]: '政治',
  [READ_PREFERENCE.economy]: '經濟',
  [READ_PREFERENCE.culture]: '文化',
  [READ_PREFERENCE.art]: '藝術',
  [READ_PREFERENCE.life]: '生活',
  [READ_PREFERENCE.health]: '醫療',
  [READ_PREFERENCE.sport]: '體育',
  [READ_PREFERENCE.all]: '全部',
}

export const READ_PREFERENCE_ORDER = [
  READ_PREFERENCE.international,
  READ_PREFERENCE.economy,
  READ_PREFERENCE.art,
  READ_PREFERENCE.crossStraits,
  READ_PREFERENCE.culture,
  READ_PREFERENCE.life,
  READ_PREFERENCE.humanRight,
  READ_PREFERENCE.education,
  READ_PREFERENCE.health,
  READ_PREFERENCE.society,
  READ_PREFERENCE.politics,
  READ_PREFERENCE.sport,
  READ_PREFERENCE.environment,
]