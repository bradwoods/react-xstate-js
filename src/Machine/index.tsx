import * as React from 'react';
import {
  Machine as XstateMachine,
} from 'xstate';
import {
  // Machine as XstateMachineType,
  StateInterface,
} from 'xstate/lib/types'
import {
  IEvent, IState, IProps,
} from '../types'

class Machine extends React.Component<IProps, IState> {

  // as of xstate v4, XstateMachine requires 3 arguments, however documentation states 2 arguments should be optional, using type: any as workaround
  // private machine: XstateMachineType = XstateMachine(this.props.config)
  private machine: any = XstateMachine(this.props.config)

  readonly state: IState = {
    machineStateNode: this.machine.initialState,
    data: this.props.defaultData || {},
  }

  componentDidMount() {
    const {
      machine, triggerActionsCalcData
    } = this;
    const stateNode = machine.initialState

    this.setState((state: IState) => ({
      data: {
        ...state.data,
        ...triggerActionsCalcData(stateNode, undefined)
      }
    }))
  }

  private send = (event: IEvent) => {
    const {
      state: {
        machineStateNode: currentStateNode, data,
      },
      triggerActionsCalcData,
    } = this;
    const fullState = {
      machine: currentStateNode,
      ...data,
    }
    const nextStateNode = this.machine.transition(currentStateNode, event, fullState);
    const newData = triggerActionsCalcData(nextStateNode, event);

    this.setState((state: IState) => ({
      machineStateNode: nextStateNode,
      data: {
        ...state.data,
        ...newData,
      },
    }));
  }

  // event is optional as the initialState may have actions (and there is no event required to get to initial state)
  private triggerActionsCalcData = (stateNode: StateInterface, event?: IEvent) => {
    const {
      props: { actionMap },
      send,
    } = this;

    if (!actionMap) return {};

    return stateNode.actions.reduce(
      (acc, action) => ({
        ...acc,
        ...actionMap[action.type](event, send),
      }),
      {},
    )
  }

  render() {
    const {
      props: { children },
      state: {
        machineStateNode, data
      },
      send,
    } = this;

    return children({
      send,
      state: machineStateNode.value,
      data,
    });
  }
}

export default Machine;
