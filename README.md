# react-xstate-js
A React interpreter for [xstate](https://github.com/davidkpiano/xstate).

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
    {({ send, state }) => (
    <>
      <button
        type="button"
        onClick={() => send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state)}
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
      onEntry: [
        { type: 'myAction' },
      ],
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
    {({ send, state }) => (
    <>
      <button
        type="button"
        onClick={() => send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state)}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 3 - an action's function changing the state
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
      onEntry: [
        { type: 'myAction' },
      ],
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
  // actions receive an event & send parameter (incase the action's function needs to read event data or change the state)
  myAction: (event, send) => {
    console.log('myAction fired');
    setTimeout(
      () => send({ type: 'NEXT' }),
      500,
    );
  },
};

const MyComponent = () => (
  <Machine
    config={config}
    actionMap={actionMap}
  >
    {({ send, state }) => (
    <>
      <button
        type="button"
        onClick={() => send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state)}
      </p>
    </>
    )}
  </Machine>
);
```

## Example 4 - an action's function returning data
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
      onEntry: [
        { type: 'myAction' },
      ],
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
    {({ send, state, data }) => (
    <>
      <button
        type="button"
        onClick={() => send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state)}
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

## Example 5 - using the defaultData prop
```js
import React from 'react';
import { Machine } from 'react-xstate-js';

const defaultData = {
  foo: 'myDefaultValue',
};

const actionMap = {
  myAction: () => {
    console.log('myAction fired');
    return { foo: 'bar' };
  },
};

const config = {
  key: 'example5',
  initial: 'step1',
  states: {
    step1: {
      on: {
        NEXT: 'step2',
      },
    },
    step2: {
      onEntry: [
        { type: 'myAction' },
      ],
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
    defaultData={defaultData}
  >
    {({ send, state, data }) => (
    <>
      <button
        type="button"
        onClick={() => send({ type: 'PREVIOUS' })}
      >
        previous
      </button>
      <button
        type="button"
        onClick={() => send({ type: 'NEXT' })}
      >
        next
      </button>
      <p>
        state:
        {' '}
        {JSON.stringify(state)}
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
A [React](https://reactjs.org/) interpreter for [xstate](https://github.com/davidkpiano/xstate).
```js
<Machine
  config={...}
  actionMap={...}
  defaultData={...}
>
  {({ send, state, data }) => (
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
Functions receive an event & send parameter (incase the action's function needs to read event data or change the state). Anything returned from an action's function will be stored in the `<Machine />`'s data object (see below).
```js
const actionMap = {
  myAction: (event, send) => {
    console.log('myAction fired');
  },
};
```

#### defaultData: object
The default value of data (useful for setting the initial values of input elements) 
```js
const defaultData = {
  foo: 'defaultValue'
};
```

### Return
#### send: function
Call this function passing in an object with the following properties:
- type: [event](http://davidkpiano.github.io/xstate/docs/#/api/config?id=transition-configuration)
- any other properties/ values that may be required of the actionMap functions (example: email & password for a sign-in function).

```js
send({ type: 'NEXT' })
```

#### state: string | object
The current state.

#### data: object
Provides access to anything returned from the actionMap's functions.
