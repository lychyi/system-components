import React from 'react';

import { storiesOf } from '@storybook/react';

import { MediaMatcher } from '../src/components';

storiesOf('Media Matcher', module).add(
  'Default Example',
  () =>  
  <MediaMatcher>
    {
      ({width, height, matched}) => {
        return (
          <>
            <h3>Resize me!</h3>
            <p><strong>{width}px x {height}px</strong></p>
            {Object.keys(MediaMatcher.defaultProps.media).map((mkey) => {
              return <p>{matched.includes(mkey) ? '✅' : '❌'} {mkey}: {MediaMatcher.defaultProps.media[mkey]}</p>
            })}
          </>
        )
      }
    }
  </MediaMatcher>
).add(
  'Custom Example',
  () =>
  <>
    <h3>Dynamically render based on custom media queries</h3>
    <MediaMatcher media={{showThing: '(min-width: 900px)'}}>
      {
        ({matched}) => (
          matched.includes('showThing') ? <p>Show that thing!</p> : <p>Hide that thing...</p>
        )
      }
    </MediaMatcher>
  </>
)