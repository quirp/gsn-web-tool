import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { useContractRead } from 'wagmi'

import type { RootState, AppDispatch } from './store'

import relayHubAbi from './contracts/relayHub.json'

export const useStakeManagerAddress = (relayHubAddress: string) => useContractRead({
  addressOrName: relayHubAddress,
  contractInterface: relayHubAbi,
  functionName: 'getStakeManager',
  onError (err) { console.warn(err) }
})

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
