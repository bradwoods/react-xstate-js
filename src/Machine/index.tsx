import * as React from 'react';
import {
  Machine as XstateMachine,
} from 'xstate';
import {
  Machine as XstateMachineType, StateInterface,
} from 'xstate/lib/types'
import {
  IEvent, IState, IProps,
} from '../types'

class Machine extends React.Component<IProps, IState> {

  private machine: XstateMachineType = XstateMachine(this.props.config)

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

    // actions can be an array of strings: ['myAction1', 'myAction2'] or [{ type: 'myAction1' }, { type: 'myAction2' }]

    return stateNode.actions.reduce(
      (acc, action) => {

        if (typeof action === 'string') {
          return {
            ...acc,
            // takes in the event data & the send function incase the action dispatchs more events.
            ...actionMap[action](event, send),
          }
        } else if (typeof action === 'object') {
          return {
            ...acc,
            ...actionMap[action.type](event, send),
          }
        }

        return { ...acc }
      },
      {},
    );
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
