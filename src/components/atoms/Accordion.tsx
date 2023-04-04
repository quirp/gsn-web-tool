import { styled } from '@mui/material/styles'
import { Accordion as MuiAccordion, AccordionDetails as MuiAccordionDetails, AccordionSummary as MuiAccordionSummary } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Icon } from '../atoms'
import { colors } from '../../theme'

interface IAccordionProps {
  children: NonNullable<ReactNode>
  expanded?: boolean
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void
}

export const AccordionBase = styled(MuiAccordion)<IAccordionProps>(({ theme }) => ({}))

const Accordion: FC<IAccordionProps> = ({ children, expanded, onChange }) => {
  return (
    <AccordionBase expanded={expanded} onChange={onChange}>
      {children}
    </AccordionBase>
  )
}

interface IAccordionSummaryProps {
  children: ReactNode
}

export const AccordionSummaryBase = styled(MuiAccordionSummary)<IAccordionSummaryProps>(({ theme }) => ({
  padding: '15px 20px',
  borderBottom: `1px solid ${colors.grey}`,
  '& .MuiAccordionSummary-content': {
    margin: 0
  }
}))

export const AccordionSummary: FC<IAccordionSummaryProps> = ({ children }) => {
  return <AccordionSummaryBase expandIcon={<Icon.Chevron />}>{children}</AccordionSummaryBase>
}

interface IAccordionDetailsProps {
  children: ReactNode
}

const AccordionDetailsBase = styled(MuiAccordionDetails)<IAccordionDetailsProps>(({ theme }) => ({
  padding: '15px 20px'
}))

export const AccordionDetails: FC<IAccordionDetailsProps> = ({ children }) => {
  return <AccordionDetailsBase>{children}</AccordionDetailsBase>
}

export default Accordion
