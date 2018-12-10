import * as React from 'react';
import {
  Machine as XstateMachine, 
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
