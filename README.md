# URL Visitor Tool

A Node.js tool that automates visiting multiple URLs across different environments using Playwright.

## Features

- Visit multiple URLs automatically
- Support for different environments (staging, production, etc.)
- Basic auth support
- Configurable via JSON
- Built with Playwright and TypeScript

## Prerequisites

- Node.js (v22 or higher)
- npm

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npx install playwright
npm install
```

## Configuration

Create a `config.json` file in the root directory with the following structure:

```json:config.json
{
  "sites": [
    {
      "name": "My Site",
      "paths": [
        "/",
        "/about",
        "/contact"
      ],
      "environments": {
        "staging": {
          "url": "https://staging.example.com",
          "username": "user",
          "password": "pass"
        },
        "production": {
          "url": "https://example.com",
          "username": "user",
          "password": "pass"
        }
      }
    }
  ]
}
```

## Usage

Run the visitor tool by specifying the environment:

`npm run start`

## Environment Configuration

Each environment in the config can have:
- `url`: Base URL for the environment
- `username`: Basic auth username (optional)
- `password`: Basic auth password (optional)

## Error Handling

The tool will:
- Log successful page loads
- Catch and report any errors during page visits
- Continue execution even if individual pages fail

## License

MIT
