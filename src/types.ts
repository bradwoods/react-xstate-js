import {
  MachineConfig, ParallelMachineConfig, StateInterface,
} from 'xstate/lib/types'

export interface IEvent {
  type: string,
  [key: string]: any
}

export interface IData {
  [key: string]: any
}

export type Send = (event: IEvent) => void

export interface IActionMap {
  [key: string]: (event?: IEvent, send?: Send) => IData | void
}

export interface IReturnProps {
  state: any
  send: Send
  data: IData
}

export interface IProps {
  config: MachineConfig | ParallelMachineConfig
  actionMap?: IActionMap
  children: (args: IReturnProps) => JSX.Element
}

export interface IState {
  data: IData
  machineStateNode: StateInterface
}
