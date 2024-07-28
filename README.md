# Karma Files README

## Overview

Karma Files provides a streamlined API for uploading and managing files, supporting single, multiple, and large file uploads. It ensures secure authentication using JWT tokens and returns CDN URLs for the uploaded files. This guide covers the API endpoints, React component integration, and database design for Karma Files.

## Demo

![Demo](https://github.com/NangunooriAbhinav/karma-files/blob/main/demo.JPG?raw=true)

## Endpoints

### 1. User Registration

- **Endpoint**: `/user/create`
- **Method**: POST
- **Parameters**:
  - `username`
  - `password`
  - `scopes` (Array)
- **Returns**: JWT token
  - **Body**: `userId`, `api-token`

### 2. Get API Token

- **Endpoint**: `/user/`
- **Method**: GET
- **Headers**:
  - `Authorization: Bearer <JWT>`
- **Returns**: `api_token`

### 3. Single File Upload

- **Endpoint**: `/upload/single`
- **Method**: POST
- **Headers**:
  - `Authorization: Bearer <JWT>`
- **Parameters**:
  - `filename`
  - `file`
  - `description`
- **Returns**: File CDN URL

### 4. Multiple File Upload

- **Endpoint**: `/upload/multiple`
- **Method**: POST
- **Headers**:
  - `Authorization: Bearer <JWT>`
- **Parameters**:
  - `filename[]` (Array)
  - `files[]` (Array)
  - `description`
- **Returns**: Array of file CDN URLs

## React Component Integration

To use Karma Files in a React component:

1. **Authenticate and obtain token**:

   ```javascript
   const token = authMe(username, password);
   ```

2. **Single File Upload**:
   ```javascript
   const options = { token };
   <SingleUpload options={options} />;
   ```

## Major Features

- **Single File Uploads**
- **Multiple File Uploads**
- **Large File Uploads**

## Database Design

### Tables

#### 1. Files Table

- **Columns**:
  - `ID`
  - `UserId`
  - `Timestamp`
  - `Filename`
  - `Description`

#### 2. Users Table

- **Columns**:
  - `ID`
  - `Username`
  - `Password`
  - `api_token`
  - `scopes[]`
  - `Description`

## Architecture

### Components

1. **KF Server**: Handles API requests and file uploads.
2. **KF Library**: Manages file storage and CDN links.
3. **Client**: User-facing application that integrates with KF Server.

### Workflow

1. **Public Link**: KF Library provides public links for uploaded files.
2. **Auth**: Authentication via Karma Auth.

---
