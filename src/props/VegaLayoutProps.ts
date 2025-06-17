export interface VegaLayoutProps {
  containerPadding?: string
  containerBackground?: string
  contentBackground?: string
  contentBorderRadius?: string
  contentPadding?: string
  headerHeight?: string
  headerBorder?: string
  headerBorderRadius?: string
  headerBackground?: string
  headerPadding?: string
  asideLeftWidth?: string
  asideLeftBorder?: string
  asideLeftBackground?: string
  asideRightWidth?: string
  asideRightBorder?: string
  asideRightBackground?: string
  headerFirst?: boolean
  headerShadow?: string
  scrollbarColor?: string
}

export const VegaLayoutDefaults = {
  containerBackground: 'none',
  containerPadding: '0',
  contentBackground: 'none',
  contentBorderRadius: '0',
  contentPadding: '0',
  headerHeight: '80px',
  headerBorder: 'none',
  headerBorderRadius: '0',
  headerBackground: 'none',
  headerPadding: '2rem',
  asideLeftWidth: 'initial',
  asideLeftBorder: 'none',
  asideLeftBackground: 'none',
  asideRightWidth: 'initial',
  asideRightBorder: 'none',
  asideRightBackground: 'none',
  headerFirst: false,
  headerShadow: 'none',
  scrollbarColor: 'var(--vega-border-color)',
}