import { MachineConfig, MachineOptions, StateSchema, EventObject } from 'xstate/lib/types'
import { Interpreter } from 'xstate/lib/interpreter'
import { State } from 'xstate'

export interface IReturnProps<
  TContext = any,
  TState extends StateSchema = any,
  TEvent extends EventObject = any
> {
  state: State<TContext, TEvent>
  service: Interpreter<TContext, TState, TEvent>
}

export interface IProps<
  TContext = any,
  TState extends StateSchema = any,
  TEvent extends EventObject = any
> {
  config: MachineConfig<TContext, TState, TEvent>
  options?: MachineOptions<TContext, TEvent>
  children: (args: IReturnProps) => JSX.Element | null
}

export interface IState<TContext = any, TEvent extends EventObject = any> {
  machineStateNode: State<TContext, TEvent>
}
