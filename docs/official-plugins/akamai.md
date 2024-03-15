---
sidebar_position: 1
---

# Akamai

Automatically build a graph of your Akamai resources.


## Introduction

Akamai is a content delivery network (CDN) and cloud services provider. 
The Akamai Nodestream plugin allows you to interact with Akamai's APIs to automatically build a graph of your Akamai resources.

## Maturity 

This plugin is currently in **BETA** and is not yet recommended for production use.

## Pre-requisites

To use Akamai with Nodestream, you'll need to have an Akamai account and the necessary permissions to access the Akamai APIs.
You need to create an API client in the Akamai Control Center and obtain the client credentials.

## Features

The Akamai plugin currently supports ingesting and graphing the following resources:
- [x] App Sec Coverage
- [x] Cloudlets
- [x] Cp Codes
- [x] Certificate Provisioning System (CPS)
- [x] Edge Workers
- [x] Edge Host Names (EHN)
- [x] Global Traffic Management (GTM)
- [x] IAM Clients
- [x] IAM Users
- [x] Image and Video Manager (IVM)
- [x] Netstorage Accounts
- [x] Netstorage Groups
- [x] Property Manager
- [x] Redirect Rules
- [x] SiteShield
- [x] Web Application Firewall (WAF)

## Installation

To install the Akamai plugin, run the following command:

```bash
pip install nodestream-plugin-akamai
```

## Configuration

To use the Akamai plugin, you'll need to add the following configuration to your `nodestream.yml` file:

```yaml
plugins:
  - name: akamai
    config:
      base_url: !env AKAMAI_BASE_URL
      client_token: !env AKAMAI_CLIENT_TOKEN
      client_secret: !env AKAMAI_CLIENT_SECRET
      access_token: !env AKAMAI_ACCESS_TOKEN
```
