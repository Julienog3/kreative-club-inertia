import { defineTextStyles } from '@pandacss/dev'

export const textStyles = defineTextStyles({
  title: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily: 'Lexend Mega',
      fontWeight: '700',
      fontSize: '2.5rem',
      lineHeight: '2.75rem',
      letterSpacing: '-.5rem',
      textDecoration: 'None',
      textTransform: 'None',
    },
  },
  subtitle: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily: 'Lexend Mega',
      fontWeight: '700',
      fontSize: '1.75rem',
      lineHeight: '2.75rem',
      letterSpacing: '-.4rem',
      textDecoration: 'None',
      textTransform: 'None',
    },
  },
  body: {
    description: 'The body text style - used in paragraphs',
    value: {
      fontFamily: 'Lexend',
      fontWeight: '400',
      fontSize: '16px',
      letterSpacing: '0',
      textDecoration: 'None',
      textTransform: 'None',
    },
  },
})
