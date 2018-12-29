# react-xstate-js
A React interpreter for [xstate](https://github.com/davidkpiano/xstate) that uses renderProps.

# Installation
```bash
yarn add react-xstate-js
```
or
```bash
npm i react-xstate-js -S
```

# Using
## Example 1 - reading & changing state
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const myMachineConfig = {
  key: 'example1',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      on: {
        PREVIOUS: 'step1',
        NEXT: 'step3',
      },
    },
    step3: {
      on: {
        PREVIOUS: 'step2',
      },
    },
  },
};

const MyComponent = () => (
  <Machine config={myMachineConfig}>
    {({ service, state }) => (
    <>
      <button
        type="button"
        onClick={() => service.send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => service.send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state.value)}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 2 - options (with actions)
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const myMachineConfig = {
  key: 'example2',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      onEntry: ['myAction'],
      on: {
        PREVIOUS: 'step1',
        NEXT: 'step3',
      },
    },
    step3: {
      on: {
        PREVIOUS: 'step2',
      },
    },
  },
};

const myMachineOptions = {
  actions: {
    myAction: () => {
      console.log('myAction fired');
    },
  },
};

const MyComponent = () => (
  <Machine
    config={myMachineConfig}
    options={myMachineOptions}
  >
    {({ service, state }) => (
    <>
      <button
        type="button"
        onClick={() => service.send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => service.send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state.value)}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 3 - context
```js
import React from 'react';
import { Machine } from 'react-xstate-js';
import { actions } from 'xstate';

const { assign } = actions;

const myMachineConfig = {
  key: 'example3',
  context: {
    foo: '',
  },
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      onEntry: ['myAction'],
      on: {
        PREVIOUS: 'step1',
        NEXT: 'step3',
      },
    },
    step3: {
      on: {
        PREVIOUS: 'step2',
      },
    },
  },
};

const myMachineOptions = {
  actions: {
    myAction: assign({ foo: ctx => 'bar' }),
  },
};

const MyComponent = () => (
  <Machine
    config={myMachineConfig}
    options={myMachineOptions}
  >
    {({ service, state }) => (
    <>
      <button
        type="button"
        onClick={() => service.send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => service.send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state.value)}
      </p>
      <p>
        context:
        {' '}
        {JSON.stringify(state.context)}
      </p>
    </>
    )}
  </Machine>
);
```

# API
## \<Machine \/\>
A [React](https://reactjs.org/) interpreter for [xstate](https://github.com/davidkpiano/xstate).
```js
<Machine
  config={...}
  options={...}
>
  {({ service, state }) => (
    ...
  )}
</Machine>
```

### Props
#### config: xstate [machine config](https://xstate.js.org/api/interfaces/machineconfig.html).
```js
const mmyMachineConfig = {
  key: 'example1',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      on: {
        PREVIOUS: 'step1',
        NEXT: 'step3',
      },
    },
    step3: {
      on: {
        PREVIOUS: 'step2',
      },
    },
  },
};
```

#### options: xstate [machine options](https://xstate.js.org/api/interfaces/machineoptions.html).
```js
const myMachineOptions = {
  actions: {
    myAction: () => {
      console.log('myAction fired');
    },
  },
};
```

### Return
#### service: xstate [interpreter](https://xstate.js.org/docs/guides/interpretation.html).
```js
<Machine {...} >
  {({ service }) => (
    ...
  )}
</Machine>
```

#### state: xstate [state](https://xstate.js.org/api/classes/state.html).
```js
<Machine {...} >
  {({ state }) => (
    ...
  )}
</Machine>
```
