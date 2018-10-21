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

const statechart = {
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
  <Machine statechart={statechart}>
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

const statechart = {
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

const actionMap = {
  myAction: () => {
    console.log('myAction fired');
  },
};

const MyComponent = () => (
  <Machine
    statechart={statechart}
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

const statechart = {
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
  // actions receive an event and transition parameter (incase they need to read event data or fire a transition)
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
    statechart={statechart}
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
  // anything returned from the actionMap will be stored in the data property (this is useful for scenario where an action triggers an async call that fetches data)
  myAction: () => {
    console.log('myAction fired');
    return { foo: 'bar' };
  },
};

const statechart = {
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
    statechart={statechart}
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
```js
<Machine
  statechart={...}
  actionMap={...}
>
  {({ transition, state, data }) => (

  )}
</Machine>
```
A React renderProp style wrapper around Xstate.

## Props
### statechart: object
A [xstate configuration schema](http://davidkpiano.github.io/xstate/docs/#/api/config).

### actionMap: object
An object with: 
- key: string - corresponding with 1 of the config's actions
- value: function - the function you want to trigger for an action

this needs to be more details, talk about the props it has

## Returns
### transition: function
### state: string | object
### data: object
