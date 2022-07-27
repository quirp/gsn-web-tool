import { useContractWrite, useNetwork } from 'wagmi'
import { useAppSelector, useStakeManagerAddress } from '../../../../hooks'
import { useDefaultStateSwitchers } from '../registerRelayHooks'
import StakeManagerAbi from '../../../../contracts/stakeManager.json'

import Button from 'react-bootstrap/Button'

import LoadingButton from '../../../../components/LoadingButton'
import ErrorButton from '../../../../components/ErrorButton'
import React from 'react'

interface AuthorizeButtonProps {
  setListen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AuthorizeButton ({ setListen }: AuthorizeButtonProps) {
  const relay = useAppSelector((state) => state.relay.relay)
  const { relayHubAddress, relayManagerAddress } = relay
  const defaultStateSwitchers = useDefaultStateSwitchers()
  const { chain } = useNetwork()

  const {
    data: stakeManagerAddressData
  } = useStakeManagerAddress(relayHubAddress)

  const stakeManagerAddress = stakeManagerAddressData as unknown as string

  const { error: authorizeTxError, isError, isLoading, isSuccess, write: authorizeHub } = useContractWrite(
    {
      addressOrName: stakeManagerAddress,
      contractInterface: StakeManagerAbi,
      functionName: 'authorizeHubByOwner',
      args: [relayManagerAddress, relayHubAddress],
      onSuccess (data) {
        let infoMsg
        if (chain?.blockExplorers !== undefined) {
          infoMsg = (
            <span>
              Relay is being funded:<br />
              <a href={chain.blockExplorers.default.url + '/' + data.hash}>Block Explorer</a>
            </span>
          )
        } else {
          infoMsg = (
            <span>
              Relay is being funded.<br /><b>{data.hash}</b>
            </span>
          )
        }
        setListen(true)
      },
      ...defaultStateSwitchers
    }
  )

  const text = <span>Authorize Hub</span>

  if (isError) return <ErrorButton message={authorizeTxError?.message}>{text}</ErrorButton>
  if (isLoading) return <LoadingButton />

  if (isSuccess) return <span>Authorized. Wait before relay is ready</span>

  return (
    <Button onClick={() => authorizeHub()}>Authorize Hub</Button>
  )
}
