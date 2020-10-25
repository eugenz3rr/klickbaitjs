# KlickbaitJS - Documentn not ready

In short. KlickbaitJS was created to create a module based frontent CMS for AndroidApps (Created on top of cordova).
This CMS is currently under heavy development. So it'll most likely experience no backwards compatible versions.
Oriented on the module structure of Drupal.

This CMS is build using:

- Typescript - JS - ES6
- Vue
- VueJS

Current tasks:

- [ ] Document the shit out of this repo.
    - [ ] Add inline comments.
    - [ ] Add documentation of how to use the CMS and how to extend it.
- [ ] Create more content and form elements.
- [ ] Move regions into core from vue app (content, form). 
- [ ] Create a simple way of injecting css into the page.
- [ ] Add Vue i18n for translation.


- [ ] Create events on render elements.


## Table of Contents (Optional)

- [Installation](#installation)
- [Modules](#modules)
  - [Info](#info)
  - [Components](#components)
    - [Elements](#elements)
    - [Containers](#containers)
    - [Regions](#regions)
  - [Routing](#routing)
- [Features](#features)
- [Contributing](#contributing)

## Installation

First of all install the latest (stable) nodeJS [Here](https://nodejs.org/en/).

Run those scripts in the root directory. To install all dependencies.
```
npm run init
```

## Modules

Modules are what extends this CMS.

> How are modules defined?
- You define modules by creating a simple folder with a simple name, which will be used as an id for your module.

> Where do I place it?
- `[ROOT]/modules/[YOURMODULE]`

### Info

Here the basic information about the module is placed and defined so the user downloading / installing knows about what's inside.

````json5
{
  // The name of the module. Be creative :D.
  "name": "Klickbait - Mymodule",

  // The description should reflect what the module contains.
  "description": "This module is supposed to be an example module.",
  
  // Define a group to which the module belongs to. Could be a bundle of modules which are extending functionality.
  "group": "klickbait",

  // Currently I have two module types in mind.
  // module - For extending functionality.
  // theme  - For extending theming functionality.
  "type": "module",

  // Version of the module for version control.
  "version": "1.0.0",

  // Define dependencies which could be downloaded or build upon.
  "dependencies": []
}
````

> Where do I place it?
- `[ROOT]/modules/[YOURMODULE]/[YOURMODULE].info.json`

### Components

Components in this CMS are more or less [elements](#elements) which have a specified purpose.

For example, we currently have an element named "paragraph". This element has the purpose to displaying information and therefore simply called "element".

Of course there could be a use case in which you would like to contain an element inside another element for that purpose we have "container-elements" (e.g. Accordion).

The last element in this CMS is called "region". Regions are elements containing other elements. They have the role to deliver special code.
Currently in the core is "content" which handles just the display of elements 
and "form" which handles the loading, building, validating, submitting and saving of a submitted form.

```json5
{
  "regions": {
    "content": {
        "title": "Content",
        "description": "Is used to display data.",
        "path": "",
      }
    }
  }
}
```

> Where do I place it?
- `[ROOT]/modules/[YOURMODULE]/[YOURMODULE].components.json`

## Elements

As Yoda would say: "Defining elements you must, register in the components.json you should."
Before Vue starts Modules will load the elements first as they're all used by container- and region elements.
For consistency, I define the elements first then I build container and regions around them.
Beneath you'll see an example element which is simply an ES6-Function returning a Vue configuration.

````JavaScript

Module => {
  const component = {
    name: "MyCustomElement",
    template: "<div>{{ myvariable}}</div> ",
  }

  return component;
};

````



### Routing

The routing defines pages which should be reachable.
Like for example a login form, or a video chat page.

````json5
{
  "some_id_for_my_page": {

    // Some url.
    "path": "/mypath",

    // Set a path title.
    "title": "Add Tile",

    // Describe what the path contains.
    "description": "Adds a tile to the current board.",

    // Not yet documented.
    "regions": [
      {
        "type": "form",
        "title": "Tile form",
        "description": "Edit / add current tile.",
        "path": "src/regions/form/AddTile.js"
      }
    ]
  }
}
````

> Where do I place it?
- `[ROOT]/modules/[YOURMODULE]/[YOURMODULE].routing.json`
