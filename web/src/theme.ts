import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  primaryColor: 'brand',
  fontFamily: 'Poppins',
  defaultRadius: 'md',
  defaultGradient: { from: '#073B2C', to: '#197459' },
  // defaultGradient: { from: '#009D56', to: '#2DCC84' },
  colors: {
    background: ['#F7FAFC', '#181A1E', '#197459'],
    accents: ['#00593F', '#003e35', '#001f59', '#075900', '#053e00'],
    brand: [
      '#AEDDC8',
      '#6BCFA2',
      '#2DCC84',
      '#14B26A',
      '#009D56',
      '#0C693F',
      '#0F462E',
      '#103021',
      '#0E2118',
      '#0C1712',
    ],
    brand1: [
      '#9EC6BA',
      '#68B39D',
      '#429E83',
      '#2B876C',
      '#197459',
      '#0B654B',
      '#00593F',
      '#073B2C',
      '#09281F',
      '#091B16',
    ],
    brand2: [
      '#e7faf3',
      '#c9e9df',
      '#a8d9ca',
      '#86cab6',
      '#65bba1',
      '#4ca188',
      '#3b7d6a',
      '#29594b',
      '#16362d',
      '#00130e',
    ],
    brandBlue: [
      '#9EACC6',
      '#6882B3',
      '#42629E',
      '#2B4B87',
      '#193974',
      '#0B2A65',
      '#001F59',
      '#07193B',
      '#091428',
      '#090F1B',
    ],
  },
};