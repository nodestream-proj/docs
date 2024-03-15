---
sidebar_position: 4
---
# Pedantic

Add a nag to your project for consistency.

## Introduction

The Pedantic plugin allows you to add an audit to your project to ensure that naming conventions are followed.

## Maturity

This plugin is currently is **STABLE** and should be fine for production use.

## Pre-requisites

There are no pre-requisites to use the Pedantic plugin aside from having a project to use it with.

## Features

The Pedantic plugin currently supports the following features:

- [x] Check that node types are defined using CamelCase.
- [x] Check that node types are singular (e.g. User not Users).
- [x] Check that relationship types are defined using UPPER_SNAKE_CASE
- [x] Check that property names are defined using lower_snake_case
- [x] Check that pipeline names are defined using lower-case-with-dashes

## Installation

To install the Pedantic plugin, run the following command:

```bash
pip install nodestream-plugin-pedantic
```

## Configuration

The Pedantic plugin does not require any configuration.

## Usage

To use the Pedantic plugin, run `nodestream audit pedantic` in the root of your project.

```bash
$ nodestream audit pedantic
```

When you have violations, the Pedantic plugin will output the violations to the console.

```plaintext
Pipeline load_org_chart is not lower dash case. Suggestion: load-org-chart
Node type People is not singular. Suggestion: Person
Property lastName is not snake case. Suggestion: last_name
Node type number is not camel case. Suggestion: Number
Relationship type is_friends_with is not upper camel case. Suggestion: IS_FRIENDS_WITH
```
