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
A playground with the following examples can be found [here](https://github.com/bradwoods/react-xstate-js-playground).

## Example 1 - reading & changing state
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const machineConfig = {
  key: 'example1',
  strict: true,
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
  <Machine config={machineConfig}>
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

const machineConfig = {
  key: 'example2',
  strict: true,
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

const machineOptions = {
  actions: {
    myAction: () => {
      console.log('myAction fired');
    },
  },
};

const MyComponent = () => (
  <Machine
    config={machineConfig}
    options={machineOptions}
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

const machineConfig = {
  key: 'example3',
  strict: true,
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

const machineOptions = {
  actions: {
    myAction: assign({ foo: ctx => 'bar' }),
  },
};

const MyComponent = () => (
  <Machine
    config={machineConfig}
    options={machineOptions}
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
#### config: xstate [machine config](https://xstate.js.org/docs/api/interfaces/machineconfig.html).
```js
const machineConfig = {
  key: 'example1',
  strict: true,
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

#### options: xstate [machine options](https://xstate.js.org/docs/api/interfaces/machineoptions.html).
```js
const machineOptions = {
  actions: {
    myAction: () => {
      console.log('myAction fired');
    },
  },
};
```

### Return
#### service: xstate [interpreter](https://xstate.js.org/docs/guides/interpretation/).
```js
<Machine {...} >
  {({ service }) => (
    ...
  )}
</Machine>
```

#### state: xstate [state](https://xstate.js.org/docs/api/classes/state.html).
```js
<Machine {...} >
  {({ state }) => (
    ...
  )}
</Machine>
```