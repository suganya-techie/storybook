import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  withKnobs,
  withKnobsOptions,
  text,
  number,
  boolean,
  color,
  select,
  array,
  date,
  button,
  object,
  files,
} from '@storybook/addon-knobs';

class AsyncItemLoader extends React.Component {
  constructor() {
    super();
    this.state = { items: [] };
  }

  handleLoadItems() {
    this.setState({
      isLoading: true,
      items: [],
    });
    setTimeout(() => this.setState({ items: ['pencil', 'pen', 'eraser'], isLoading: false }), 1500);
  }

  render() {
    // this existing example seems like a react anti-pattern?
    // perhaps for testing purposes only?
    button('Load the items', () => this.handleLoadItems());

    const { isLoading, items } = this.state;

    if (isLoading) {
      return <p>Loading data</p>;
    } else if (!items.length) {
      return <p>No items loaded</p>;
    }
    return <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>;
  }
}

storiesOf('Addons|Knobs.withKnobs', module)
  .addDecorator(withKnobs)
  .add('tweaks static values', () => {
    const name = text('Name', 'Storyteller');
    const age = number('Age', 70, { range: true, min: 0, max: 90, step: 5 });
    const fruits = {
      Apple: 'apple',
      Banana: 'banana',
      Cherry: 'cherry',
    };
    const fruit = select('Fruit', fruits, 'apple');
    const dollars = number('Dollars', 12.5, { min: 0, max: 100, step: 0.01 });
    const years = number('Years in NY', 9);

    const backgroundColor = color('background', '#ffff00');
    const items = array('Items', ['Laptop', 'Book', 'Whiskey']);
    const otherStyles = object('Styles', {
      border: '3px solid #ff00ff',
      padding: '10px',
    });
    const nice = boolean('Nice', true);
    const images = files('Happy Picture', 'image/*', [
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiARwMCyEWcOFPAAAAP0lEQVQoz8WQMQoAIAwDL/7/z3GwghSp4KDZyiUpBMCYUgd8rehtH16/l3XewgU2KAzapjXBbNFaPS6lDMlKB6OiDv3iAH1OAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAxLTI4VDEyOjExOjMzLTA3OjAwlAHQBgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMS0yOFQxMjoxMTozMy0wNzowMOVcaLoAAAAASUVORK5CYII=',
    ]);

    // NOTE: the default value must not change - e.g., do not do date('Label', new Date()) or date('Label')
    const defaultBirthday = new Date('Jan 20 2017 GMT+0');
    const birthday = date('Birthday', defaultBirthday);

    const intro = `My name is ${name}, I'm ${age} years old, and my favorite fruit is ${fruit}.`;
    const style = { backgroundColor, ...otherStyles };
    const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    return (
      <div style={style}>
        <p>{intro}</p>
        <p>My birthday is: {new Date(birthday).toLocaleDateString('en-US', dateOptions)}</p>
        <p>I live in NY for {years} years.</p>
        <p>My wallet contains: ${dollars.toFixed(2)}</p>
        <p>In my backpack, I have:</p>
        <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
        <p>{salutation}</p>
        <p>
          When I am happy I look like this: <img src={images[0]} alt="happy" />
        </p>
        <hr />
        <p>PS. My shirt pocket contains: </p>
      </div>
    );
  })
  .add('tweaks static values organized in groups', () => {
    const GROUP_IDS = {
      DISPLAY: 'DISPLAY',
      GENERAL: 'GENERAL',
      FAVORITES: 'FAVORITES',
    };

    const fruits = {
      Apple: 'apple',
      Banana: 'banana',
      Cherry: 'cherry',
    };

    // NOTE: the default value must not change - e.g., do not do date('Label', new Date()) or date('Label')
    const defaultBirthday = new Date('Jan 20 2017 GMT+0');

    // General
    const name = text('Name', 'Storyteller', GROUP_IDS.GENERAL);
    const age = number('Age', 70, { range: true, min: 0, max: 90, step: 5 }, GROUP_IDS.GENERAL);
    const birthday = date('Birthday', defaultBirthday, GROUP_IDS.GENERAL);
    const dollars = number(
      'Account Balance',
      12.5,
      { min: 0, max: 100, step: 0.01 },
      GROUP_IDS.GENERAL
    );
    const years = number('Years in NY', 9, {}, GROUP_IDS.GENERAL);

    // Favorites
    const nice = boolean('Nice', true, GROUP_IDS.FAVORITES);
    const fruit = select('Fruit', fruits, 'apple', GROUP_IDS.FAVORITES);
    const items = array('Items', ['Laptop', 'Book', 'Whiskey'], ',', GROUP_IDS.FAVORITES);

    // Display
    const backgroundColor = color('Color', '#ffff00', GROUP_IDS.DISPLAY);
    const otherStyles = object(
      'Styles',
      { border: '3px solid #ff00ff', padding: '10px' },
      GROUP_IDS.DISPLAY
    );

    const style = { backgroundColor, ...otherStyles };

    const salutation = nice ? 'Nice to meet you!' : 'Leave me alone!';
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };

    return (
      <div style={style}>
        <h1>General Information</h1>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Birthday: {new Date(birthday).toLocaleDateString('en-US', dateOptions)}</p>
        <p>Account Balance: {dollars}</p>
        <p>Years in NY: {years}</p>
        <hr />
        <h1>Favorites</h1>
        <p>Catchphrase: {salutation}</p>
        <p>Fruit: {fruit}</p>
        <p>Items:</p>
        <ul>{items.map(item => <li key={`${item}`}>{item}</li>)}</ul>
      </div>
    );
  })
  .add('dynamic knobs', () => {
    const showOptional = select('Show optional', ['yes', 'no'], 'yes');
    return (
      <div>
        <div>{text('compulsary', 'I must be here')}</div>
        {showOptional === 'yes' ? <div>{text('optional', 'I can disapear')}</div> : null}
      </div>
    );
  })
  .add('triggers actions via button', () => (
    <div>
      <p>Hit the knob load button and it should trigger an async load after a short delay</p>
      <AsyncItemLoader />
    </div>
  ))
  .add('XSS safety', () => (
    <div
      dangerouslySetInnerHTML={{
        __html: text('Rendered string', '<img src="x" onerror="alert(\'XSS Attack\')" >'),
      }}
    />
  ));

storiesOf('Addons|Knobs.withKnobsOptions', module)
  .addDecorator(
    withKnobsOptions({
      escapeHTML: false,
    })
  )
  .add('displays HTML code', () => <div>{text('Rendered string', '<h1>Hello</h1>')}</div>);
