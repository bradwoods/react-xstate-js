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

## Example 1 - TypeScript
```tsx
import React from 'react';
import { 
  MachineConfig, Machine, State, Interpreter
} from 'react-xstate-js'

interface MyStateSchema {
  states: {
    step1: {}
    step2: {}
    step3: {}
  }
}

type MyEvent = { type: 'NEXT' } 
  | { type: 'PREVIOUS' }

const myMachineConfig: MachineConfig<{}, MyStateSchema, MyEvent> = {
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
}

const MyComponent: React.SFC = () => (
  <Machine config={myMachineConfig}>
    {({ service, state }: { service: Interpreter<{}, MyStateSchema, MyEvent>, state: State<{}, MyEvent> }) => (
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
)
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

## Example 2 - TypeScript
```tsx
import React from 'react';
import {
  MachineConfig, MachineOptions, Machine, State, Interpreter
} from 'react-xstate-js'

interface MyStateSchema {
  states: {
    step1: {}
    step2: {}
    step3: {}
  }
}

type MyEvent = { type: 'NEXT' }
  | { type: 'PREVIOUS' }

const myMachineConfig: MachineConfig<{}, MyStateSchema, MyEvent> = {
  key: 'example1',
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
}

const myMachineOptions: MachineOptions<{}, MyEvent> = {
  actions: {
    myAction: () => {
      console.log('myAction fired');
    },
  },
};

const MyComponent: React.SFC = () => (
  <Machine 
    config={myMachineConfig}
    options={myMachineOptions}
  >
    {({ service, state }: { service: Interpreter<{}, MyStateSchema, MyEvent>, state: State<{}, MyEvent> }) => (
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
)
```

## Example 3 - context
```jsx
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
    myAction: assign({ foo: () => 'bar' }),
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

## Example 3 - TypeScript
```tsx
import React from 'react';
import {
  MachineConfig, MachineOptions, Machine, State, Interpreter, assign
} from 'react-xstate-js'

interface MyContext {
  foo: string
}

interface MyStateSchema {
  states: {
    step1: {}
    step2: {}
    step3: {}
  }
}

type MyEvent = { type: 'NEXT' }
  | { type: 'PREVIOUS' }

const myMachineConfig: MachineConfig<MyContext, MyStateSchema, MyEvent> = {
  key: 'example1',
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
}

const myMachineOptions: MachineOptions<MyContext, MyEvent> = {
  actions: {
    myAction: assign({ foo: () => 'bar' }),
  },
};

const MyComponent: React.SFC = () => (
  <Machine
    config={myMachineConfig}
    options={myMachineOptions}
  >
    {({ service, state }: { service: Interpreter<MyContext, MyStateSchema, MyEvent>, state: State<MyContext, MyEvent> }) => (
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
)
```

# API
## \<Machine \/\>
A [React](https://reactjs.org/) interpreter for [xstate](https://github.com/davidkpiano/xstate).
```jsx
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
```jsx
<Machine {...} >
  {({ service }) => (
    ...
  )}
</Machine>
```

#### state: xstate [state](https://xstate.js.org/api/classes/state.html).
```jsx
<Machine {...} >
  {({ state }) => (
    ...
  )}
</Machine>
```
