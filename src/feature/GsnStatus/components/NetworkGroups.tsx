import { useAppSelector } from '../../../hooks'
import { INetwork } from '../networkListSlice'
import { Box, Typography, GroupChip } from '../../../components/atoms'
import { Dispatch, SetStateAction } from 'react'
import { useTheme } from '@mui/material'
import optimismIcon from '../../../assets/icons/networks/optimism.svg'
import ethereumIcon from '../../../assets/icons/networks/ethereum.svg'
import avalancheIcon from '../../../assets/icons/networks/avalanche.svg'
import polygonIcon from '../../../assets/icons/networks/polygon.svg'
import binanceIcon from '../../../assets/icons/networks/binance.svg'
import arbitrumIcon from '../../../assets/icons/networks/arbitrum.svg'

interface NetGroup {
  [key: string]: INetwork[]
}

interface NetworkLinksNewProps {
  setSelectedGroup: Dispatch<SetStateAction<string>>
  selectedGroup?: string
}

const icons = [
  { key: 'Ethereum', icon: ethereumIcon },
  { key: 'Optimism', icon: optimismIcon },
  { key: 'Arbitrum', icon: arbitrumIcon },
  { key: 'Other' },
  { key: 'Avalanche', icon: avalancheIcon },
  { key: 'Binance', icon: binanceIcon },
  { key: 'Polygon', icon: polygonIcon }
]

export default function NetworkLinksNew({ setSelectedGroup, selectedGroup }: NetworkLinksNewProps) {
  const theme = useTheme()
  const networks = useAppSelector((state) => state.networkList.networks)
  const networkArray = Object.values(networks)
  const netGroups = networkArray
    .map((n) => n.group)
    .reduce(
      (set: NetGroup, g: string) => ({
        ...set,
        [g]: networkArray.filter((net) => net.group === g && net.errorMsg === '')
      }),
      {}
    )

  return (
    <Box display='flex' gap={3}>
      {Object.keys(netGroups)
        .filter((g) => netGroups[g].length > 0)
        .map((group) => {
          // const icon = icons[group as keyof typeof icons]
          const icon = icons.find((icon) => icon.key === group)?.icon
          return (
            <Box key={group}>
              <GroupChip
                icon={icon ? <img src={icon} alt='test' /> : <></>}
                label={
                  <Typography
                    variant='h6'
                    color={selectedGroup === group ? theme.palette.primary.mainCTA : theme.palette.primary.mainBrightWhite}
                  >
                    {group}
                  </Typography>
                }
                onClick={() => {
                  if (selectedGroup === group) {
                    setSelectedGroup('')
                    return
                  }

                  setSelectedGroup(group)
                  document?.getElementsByClassName?.(group)[0]?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}
                active={selectedGroup === group}
              />
            </Box>
          )
        })}
    </Box>
  )
}
