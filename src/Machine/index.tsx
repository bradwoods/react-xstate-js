import * as React from 'react';
import {
  Machine as XstateMachine, State
} from 'xstate';
import { 
  interpret
} from 'xstate/lib/interpreter';
import {
  IState, IProps,
} from '../types'

class Machine extends React.Component<IProps, IState> {

  private machine = XstateMachine(this.props.config, this.props.options || {}, undefined)

  service = interpret(this.machine)

  readonly state: IState = {
    machineStateNode: this.machine.initialState,
  }

  componentDidMount() {
    const { savedState } = this.props

    this.service = interpret(this.machine)
      .onTransition(nextState => {
        this.setState({ machineStateNode: nextState });
      });

    if (savedState) {
      const restoredState = State.create(savedState)
      this.service.start(restoredState)
    }
    else this.service.start();
  }

  componentWillUnmount() {
    this.service.stop()
  }

  render() {
    const {
      props: { children },
      state: {
        machineStateNode, 
      },
      service
    } = this;

    return children({
      service,
      state: machineStateNode,
    });
  }
}

export default Machine;
