import { Component } from 'react';
import PropTypes from 'prop-types';
import { Machine } from 'xstate';

class MachineComponent extends Component {
  constructor(props) {
    super(props);

    const { config } = this.props;
    this.machine = Machine(config);
    this.state = {
      machineStateNode: this.machine.initialState,
      data: {},
    };

    this.send = this.send.bind(this);
    this.triggerActionsCalcData = this.triggerActionsCalcData.bind(this);
  }

  componentDidMount() {
    const { machine } = this;

    this.triggerActionsCalcData(machine.initialState, null);
  }

  send(event) {
    const {
      state: {
        data: currentData,
        machineStateNode: currentStateNode,
      },
      triggerActionsCalcData,
    } = this;

    const nextStateNode = this.machine.transition(currentStateNode, event.type);
    const newData = triggerActionsCalcData(nextStateNode, event);

    this.setState({
      machineStateNode: nextStateNode,
      data: {
        ...currentData,
        ...newData,
      },
    });
  }

  triggerActionsCalcData(stateNode, event) {
    const {
      props: { actionMap },
      send,
    } = this;

    if (!actionMap) return {};

    return stateNode.actions.reduce(
      (acc, actionKey) => ({
        ...acc,
        // takes in the event data & the send function incase the action dispatchs more events.
        ...actionMap[actionKey](event, send),
      }),
      {},
    );
  }

  render() {
    const {
      props: { children },
      state: { machineStateNode, data },
      send,
    } = this;

    return children({
      send,
      state: machineStateNode.value,
      data,
    });
  }
}

MachineComponent.propTypes = {
  // eslint-disable-next-line
  config: PropTypes.object.isRequired,
  // eslint-disable-next-line
  actionMap: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

MachineComponent.defaultProps = {
  actionMap: null,
};

export default MachineComponent;
