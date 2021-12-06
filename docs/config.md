# Repository Configuration

![Sidebar Construtor](assets/sidebar.png)

Every selected repository should contain the following files:

1) folder `docs` at the root of the project
2) file `docs/README.md` with the documentation of the home page
3) file `docs/scribo.json` described in the following section

You can find a good example at your [tutorial repository](https://github.com/scribo-dev/gitreadme-public-docs/tree/master/docs).

## Scribo.json

Every Documentation has a `scribo.json` file where you can configure many options. One of them is how the sidebar will be presented. This json has a property called `sidebar`, that is an array of items with the following properties:

| Property | Type   | Description                       |
| -------- | ------ | --------------------------------- |
| type     | string | only supports the value: category |
| label    | string | Title of the section              |
| items    | array  | Menu items                        |

Each item has a label and an url

| Property | Type   | Description         |
| -------- | ------ | ------------------- |
| label    | string | Title of the menu   |
| href     | string | URL to the document |

Example of `scribo.json`:

```json
{
  "specificationUrl": "scribo-api/openapi.json",
  "sidebar": [
    {
      "type": "category",
      "label": "Documentation",
      "items": [
        {
          "label": "Commands",
          "href": "api-commands"
        }
      ]
    }
  ]
}
```
