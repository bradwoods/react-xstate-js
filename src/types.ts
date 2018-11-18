import { MachineConfig, MachineOptions, ServiceConfig } from 'xstate/lib/types'
import { Interpreter } from 'xstate/lib/interpreter'
import { State } from 'xstate'

export interface IReturnProps {
  state: State<any, any>
  service: Interpreter<any, any, any>
}

export interface IProps {
  config: MachineConfig<any, any, any>
  options?: MachineOptions<any, any>
  children: (args: IReturnProps) => JSX.Element
}

export interface IState {
  machineStateNode: State<any, any>
}
