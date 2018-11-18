import * as React from 'react';
import {
  Machine as XstateMachine, 
} from 'xstate';
import { 
  interpret, Interpreter 
} from 'xstate/lib/interpreter';
import {
  StateMachine, 
} from 'xstate/lib/types'
import {
  IState, IProps,
} from '../types'

class Machine extends React.Component<IProps, IState> {

  private machine: StateMachine<any, any, any> = XstateMachine(this.props.config, this.props.options || {}, undefined)

  service: Interpreter<any, any, any> = interpret(this.machine)

  readonly state: IState = {
    machineStateNode: this.machine.initialState,
  }

  componentDidMount() {
    this.service = interpret(this.machine)
      .onTransition(nextState => {
        this.setState({ machineStateNode: nextState });
      });

    this.service.start();
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
