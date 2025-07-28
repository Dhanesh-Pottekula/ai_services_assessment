# AI Flow Backend

FastAPI backend server with PostgreSQL database for AI Flow application.

## Features

- FastAPI server with automatic API documentation
- PostgreSQL database with SQLAlchemy ORM
- Docker containerization for both server and database
- RESTful API endpoints for:
  - Stacks management
  - LLM configuration
  - Knowledge Base configuration

## Prerequisites

- Docker and Docker Compose
- Python 3.11+ (for local development)

## Quick Start

1. **Clone and navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Copy environment file:**
   ```bash
   cp env.example .env
   ```

3. **Start the services with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - API Documentation: http://localhost:8000/docs
   - ReDoc Documentation: http://localhost:8000/redoc
   - Health Check: http://localhost:8000/health

## API Endpoints

### Stacks
- `GET /api/v1/stacks/` - Get all stacks
- `POST /api/v1/stacks/` - Create a new stack
- `GET /api/v1/stacks/{stack_id}` - Get a specific stack
- `PUT /api/v1/stacks/{stack_id}` - Update a stack
- `DELETE /api/v1/stacks/{stack_id}` - Delete a stack

### LLM Configuration
- `GET /api/v1/llm/details` - Get LLM configuration
- `PUT /api/v1/llm/details` - Update LLM configuration
- `POST /api/v1/llm/details` - Create LLM configuration

### Knowledge Base Configuration
- `GET /api/v1/knowledge-base/details` - Get Knowledge Base configuration
- `PUT /api/v1/knowledge-base/details` - Update Knowledge Base configuration
- `POST /api/v1/knowledge-base/details` - Create Knowledge Base configuration

## Development

### Local Development Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   # Edit .env file with your local database settings
   ```

3. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Database Migrations

The application uses SQLAlchemy with automatic table creation. For production, consider using Alembic for migrations.

## Docker Commands

```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up --build --force-recreate
```

## Environment Variables

Copy `env.example` to `.env` and configure:

- `DATABASE_URL`: PostgreSQL connection string
- `POSTGRES_USER`: Database username
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name
- `DEBUG`: Enable debug mode

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── stacks.py
│   │       │   ├── llm.py
│   │       │   └── knowledge_base.py
│   │       └── api.py
│   ├── core/
│   │   └── config.py
│   ├── db/
│   │   ├── database.py
│   │   └── init_db.py
│   ├── models/
│   │   ├── stack.py
│   │   ├── llm.py
│   │   └── knowledge_base.py
│   ├── schemas/
│   │   ├── stack.py
│   │   ├── llm.py
│   │   └── knowledge_base.py
│   └── main.py
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── README.md
```

## Troubleshooting

1. **Database connection issues:**
   - Ensure PostgreSQL container is running: `docker-compose ps`
   - Check database logs: `docker-compose logs db`

2. **Port conflicts:**
   - Change ports in `docker-compose.yml` if 8000 or 5432 are in use

3. **Permission issues:**
   - Ensure Docker has proper permissions to create volumes

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include API documentation
4. Test endpoints before committing 