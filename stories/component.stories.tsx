import React from 'react';

import { storiesOf } from '@storybook/react';

import { ViewportEmitter } from '../src/components';

storiesOf('Viewport Emitter', module).add(
  'Quick Example',
  () => <ViewportEmitter />
);