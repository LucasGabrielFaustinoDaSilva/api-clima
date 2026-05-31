# 🌤️ Weather Data Pipeline Dashboard

Projeto acadêmiano desenvolvido para a disciplina **Sistemas Inteligentes** (Engenharia de Computação).  
Implementa um pipeline ETL automatizado que coleta dados climáticos da API OpenWeather, processa via n8n, persiste em MySQL e apresenta os dados em um dashboard moderno (React + Tailwind).

---

## 🧱 Stack tecnológica

| Camada          | Tecnologias                                                      |
|----------------|------------------------------------------------------------------|
| Automação       | n8n (workflow visual)                                            |
| Banco de dados  | MySQL 8                                                          |
| Backend API     | Python, Flask, Flask-CORS, mysql-connector-python                |
| Frontend        | React, Vite, TailwindCSS, Lucide React, Axios                    |
| Infraestrutura  | Docker, Docker Compose, Debian/Ubuntu, Git                       |
| API externa     | [OpenWeatherMap](https://openweathermap.org/)                    |

---

## 📐 Fluxo de dados
OpenWeatherMap API
│
▼
n8n Workflow
(HTTP Request → Edit Fields → MySQL)
│
▼
MySQL (weather_data)
│
▼
Flask API (REST)
│
▼
React Dashboard

text

---

## 📦 Pré‑requisitos

- Docker e Docker Compose
- Python 3.10+ e pip
- Node.js 18+ e npm
- Git

---

## 🚀 Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/LucasGabrielFaustinoDaSilva/api-clima.git
cd api-clima
2. Subir os contêineres (MySQL + n8n)
bash
docker compose up -d
Isso iniciará:

MySQL na porta 3306 (usuário weather, senha weather123, database weatherdb)

n8n na porta 5678 (interface web)

3. Configurar a chave da OpenWeatherMap
Crie uma conta gratuita em OpenWeatherMap.

No dashboard, gere uma API key.

No workflow do n8n, substitua SUA_API_KEY pela sua chave real.

4. Subir o backend Flask
bash
cd backend
python3 -m venv venv
source venv/bin/activate   # Linux/Mac
# ou .\venv\Scripts\activate (Windows)
pip install -r requirements.txt
python app.py
O backend estará disponível em http://localhost:3000.

5. Subir o frontend React
bash
cd frontend
npm install
npm run dev
O dashboard abrirá em http://localhost:5173.

6. Configurar o workflow no n8n
Acesse http://localhost:5678 (ou http://<IP_DA_VM>:5678 se estiver em outra máquina).

Crie um novo workflow com os seguintes nós:

Manual Trigger (início)
HTTP Request (GET)
https://api.openweathermap.org/data/2.5/weather?q=Barra%20Bonita&appid=SUA_API_KEY&units=metric&lang=pt_br
Edit Fields (Set) – mapeie os campos conforme a tabela weather_data (city, temperature, humidity, wind_speed, sunrise, etc.)
MySQL – configure com:
Host: mysql_weather
Database: weatherdb
User: weather
Password: weather123
Operation: Insert rows in a table
Table: weather_data
Mapeamento automático ou manual.
Salve e execute o workflow. Os dados serão persistidos no banco.

7. Visualizar os dados
Abra o dashboard: http://localhost:5173
Ele mostrará o último registro coletado, com informações atualizadas automaticamente a cada minuto.

🗂️ Estrutura de pastas
text
api-clima/
├── backend/
│   ├── app.py                # API Flask
│   ├── requirements.txt      # Dependências Python
│   └── .env                  # Configurações (não versionado)
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Componente principal
│   │   ├── api.js            # Cliente Axios
│   │   ├── main.jsx
│   │   └── index.css         # Tailwind
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── mysql/
│   └── init.sql              # Criação da tabela weather_data
├── n8n/                      # Volume para dados do n8n
├── docker-compose.yml        # Orquestração MySQL e n8n
└── README.md
⚙️ Variáveis de ambiente (backend)
Crie um arquivo .env dentro da pasta backend:

ini
DB_HOST=localhost
DB_USER=weather
DB_PASSWORD=weather123
DB_NAME=weatherdb
DB_PORT=3306
⚠️ Se o backend for executado dentro de um container, altere DB_HOST para o nome do container (mysql_weather). No setup padrão, o backend roda fora do Docker, portanto localhost está correto.

🧪 Testando a API manualmente
bash
curl http://localhost:3000/weather
Resposta esperada (último registro):

json
[
  {
    "id": 1,
    "city": "Barra Bonita",
    "temperature": 22.5,
    "humidity": 65,
    ...
  }
]
🐛 Principais problemas enfrentados e soluções
Espaço em disco no Docker → mover /var/lib/containerd para /home.

n8n não acessível via IP (cookie secure) → adicionar N8N_SECURE_COOKIE: "false" no docker-compose.yml.

Flask não enxergava mysql_weather → usar localhost no .env do backend.

Colunas faltando na tabela → atualizar init.sql com todos os campos (temp_min, sunrise, etc.) e recriar o volume.

Frontend exibindo dados repetidos → backend modificado para retornar apenas o registro mais recente (ORDER BY id DESC LIMIT 1).

📄 Licença
Este projeto é de uso acadêmico, sem fins comerciais.

Desenvolvido por Lucas Gabriel Faustino da Silva e Lucas Charrone Catozo
Disciplina Sistemas Inteligentes – Faculdade Gran Tietê
Maio/Junho de 2026