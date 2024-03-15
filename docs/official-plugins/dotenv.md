---
sidebar_position: 2
---

# Dotenv

Automatically load environment variables from a `.env` file into the pipeline.

## Introduction

The dotenv plugin allows you to automatically load environment variables from a `.env` file into the pipeline.

## Maturity

This plugin is currently in **STABLE** and should be fine for production use.

## Pre-requisites

To use the dotenv plugin, you'll need to have a `.env` file in the root of your project.

## Features

The dotenv plugin currently supports the following features:

- [x] Automatically load environment variables from a `.env` file into the project and pipeline.
- [x] Load environment variables from a custom path.

## Installation

To install the dotenv plugin, run the following command:

```bash
pip install nodestream-plugin-dotenv
```

## Configuration

The dotenv plugin does not require any configuration.
It will automatically load environment variables from a `.env` file in the root of your project.
You can set the path to the `.env` file using the `NODESTREAM_DOTENV_PATH` environment variable.

## Usage

Simply install the plugin and add a `.env` file to the root of your project.
The dotenv plugin will automatically load the environment variables into the pipeline.
They will be available as `!env ENV_VAR_NAME` in your project and pipeline configuration.
