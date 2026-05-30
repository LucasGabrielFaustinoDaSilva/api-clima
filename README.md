# Weather Data Pipeline Dashboard

Projeto acadêmico da disciplina Sistemas Inteligentes.

## Stack

- n8n
- MySQL
- Flask
- React
- Docker
- OpenWeather API

## Como rodar

### 1. Subir infraestrutura

docker compose up -d

### 2. Backend

cd backend
pip install -r requirements.txt
python app.py

### 3. Frontend

cd frontend
npm install
npm run dev

### 4. n8n

http://localhost:5678

## Fluxo

API → n8n → MySQL → Flask → React Dashboard