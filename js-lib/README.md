This repository shows how a TypeScript project can consume any web component, including any web component from the [Elix](https://component.kitchen/Elix) library.


# Quick start

Enter the following in a terminal window:

```
git clone git@github.com:elix/typescript-example.git
cd typescript-example
npm install
npm run build
npx http-server
```

Then open [http://localhost:8080](http://localhost:8080) to view the sample page.


# Using web components in TypeScript

Web components like the ones in the Elix library are defined as JavaScript classes that you can manipulate as markup in HTML or directly in your JavaScript/TypeScript code.


## Instantiating web components in markup

Load the source file for the desired Elix component as a module. You can bundle it into your application using a bundler like webpack, or load it directly as shown here:

```html
<html>
  <head>
    <script type="module" src="node_modules/elix/src/DateComboBox.js"></script>
  </head>
  <body>
    <elix-date-combo-box date="1 Jan 2020"></elix-date-combo-box>
  </body>
</html>
```

Once the component module is loaded, you can then instantiate the component with its tag name. The tag name for the [DateComboBox](https://component.kitchen/elix/DateComboBox) component is `elix-date-combo-box`. If desired, you can then set properties on the component as attributes, such as `date="1 Jan 2020"`.


## Instantiating web components in TypeScript

Each Elix component module exposes a default export that you can `import` into your TypeScript application. You can then instantiate the component with `new`, set properties or invoke methods on it, and add it to the DOM like a regular HTML element:

```typescript
// Import the Elix components we want to use.
import DateComboBox from 'elix/src/DateComboBox.js';

// Instantiate an Elix component.
const dateComboBox = new DateComboBox();

// TypeScript knows that a DateComboBox's `date` property is strongly typed as a
// JavaScript Date.
dateComboBox.date = new Date('1 Jan 2021');

// We can add the components to the page like any other HTML elements.
// We can also put components in the page via markup; see index.html.
document.body.appendChild(dateComboBox);
```

As noted above, Elix provides TypeScript type declarations so that you can perform type-checking on your code that works with any Elix component.
