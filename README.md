# Melipayamak SOAP SMS 

A simple Node.js client for sending SMS using **Melipayamak SOAP API**.  
Supports sending to **single** or **multiple numbers**, automatically handles regulatory compliance.

---

## Features

- Send SMS to a single number (`SendSimpleSMS2`)  
- Send SMS to multiple numbers (`SendSimpleSMS`)  
- Auto-appends `لغو11` for multiple recipients  
- Environment variables for secure credentials (`.env`)  
- Ready to use with Node.js  

---
## Installation

Clone the repository:

```bash
git clone https://github.com/ZahraAbbakhsh99/MeliPayamak.git
```
Install dependencies:

```bash
npm install
```

## Setup
Copy .env.example to .env:

```bash
cp .env.example .env
```
Open .env and fill in your Payamak credentials

## Run 
Run index.js
```bash
node index.js
```
