import { MachineConfig, MachineOptions, StateSchema, EventObject } from 'xstate/lib/types'
import { Interpreter } from 'xstate/lib/interpreter'
import { State } from 'xstate'

export interface IReturnProps<
  TContext = any,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = any
> {
  state: State<TContext, TEvent>
  service: Interpreter<TContext, TStateSchema, TEvent>
}

export interface IProps<
  TContext = any,
  TStateSchema extends StateSchema = any,
  TEvent extends EventObject = any
> {
  config: MachineConfig<TContext, TStateSchema, TEvent>
  options?: MachineOptions<TContext, TEvent>
  savedState?: State<TContext, TEvent>
  savedContext?: TContext
  children: (args: IReturnProps) => JSX.Element | null
}

export interface IState<TContext = any, TEvent extends EventObject = any> {
  machineStateNode: State<TContext, TEvent>
}

export { MachineConfig, State, Interpreter, MachineOptions }
