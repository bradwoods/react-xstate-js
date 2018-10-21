# react-xstate-js
A React wrapper for [xstate](https://github.com/davidkpiano/xstate).

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

// a xstate machine config (http://davidkpiano.github.io/xstate/docs/#/api/config)
const config = {
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
  <Machine config={config}>
    {({ transition, state }) => (
    <>
      <button
        type="button"
        onClick={() => transition({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => transition({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {state}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 2 - triggering an action
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const config = {
  key: 'example2',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      onEntry: 'myAction',
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

// an object that maps actions defined in the config to functions you want those actions to trigger (http://davidkpiano.github.io/xstate/docs/#/api/actions)
const actionMap = {
  myAction: () => {
    console.log('myAction fired');
  },
};

const MyComponent = () => (
  <Machine
    config={config}
    actionMap={actionMap}
  >
    {({ transition, state }) => (
    <>
      <button
        type="button"
        onClick={() => transition({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => transition({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {state}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 3 - an action triggering a transition
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const config = {
  key: 'example3',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      onEntry: 'myAction',
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

const actionMap = {
  // actions receive an event & transition parameter (incase the action's function needs to read event data or fire a transition)
  myAction: (event, transition) => {
    console.log('myAction fired');
    setTimeout(
      () => transition({ type: 'NEXT' }),
      500,
    );
  },
};

const MyComponent = () => (
  <Machine
    config={config}
    actionMap={actionMap}
  >
    {({ transition, state }) => (
    <>
      <button
        type="button"
        onClick={() => transition({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => transition({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {state}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 4 - storing data
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const actionMap = {
  // anything returned from the actionMap will be stored in the data property (this is useful for scenarios where an action triggers a function that fetches data)
  myAction: () => {
    console.log('myAction fired');
    return { foo: 'bar' };
  },
};

const config = {
  key: 'example4',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      onEntry: 'myAction',
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
  <Machine
    config={config}
    actionMap={actionMap}
  >
    // data contains anything returned from the actionMap
    {({ transition, state, data }) => (
    <>
      <button
        type="button"
        onClick={() => transition({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => transition({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {state}
      </p>
      <p>
        data:
        {' '}
        {JSON.stringify(data)}
      </p>
    </>
    )}
  </Machine>
);
```

# API
## \<Machine \/\>
A [React](https://reactjs.org/) renderProp style wrapper around [xstate](https://github.com/davidkpiano/xstate).
```js
<Machine
  config={...}
  actionMap={...}
>
  {({ transition, state, data }) => (
    ...
  )}
</Machine>
```

### Props
#### config: object
A xstate [machine config](http://davidkpiano.github.io/xstate/docs/#/api/config).
```js
const config = {
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

#### actionMap: object
An object that maps [actions](http://davidkpiano.github.io/xstate/docs/#/api/actions) defined in the config to functions you want those actions to trigger:
- key: string
- value: function
Functions receive an event & transition parameter (incase the action's function needs to read event data or fire a transition). Anything returned from an action's function will be stored in the `<Machine />`'s data object (see below).
```js
const actionMap = {
  myAction: (event, transition) => {
    console.log('myAction fired');
  },
};
```

### Return
#### transition: function
Call this function passing in an object with the following properties:
- type: [event](http://davidkpiano.github.io/xstate/docs/#/api/config?id=transition-configuration)
- any other properties/ values that may be required of the actionMap functions (example: email & password for a sign-in function).

```js
transition({ type: 'NEXT' })
```

#### state: string | object
The current state.

#### data: object
Provides access to anything returned from the actionMap's functions.