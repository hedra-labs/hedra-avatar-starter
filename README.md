# Hedra Realtime Avatar

Get up and running with Hedra Realtime Avatars in minutes. This tool creates a complete customizable application for building interactive avatar experiences.

The application has three parts:
1. Next.js frontend where users can interact with the avatar
2. Python backend that defines the avatar itself
3. [Livekit](https://livekit.io/) server (hosted in their cloud) that handles communication between users and avatars using WebRTC

We'll go through the setup for each of these components. These instructions assume your working directory is the parent of where you want the application to be created.

## Prerequisites

### API Keys

Before you begin, you'll need to set up API keys for the following services. Let's create a `.env` file to store all of environment variables.
 ```sh
  touch .env
  ```

#### 1. Livekit Project Setup

1. Create a [Livekit](https://livekit.io/) account
2. Create a project through your [Livekit dashboard](https://cloud.livekit.io/projects)
3. Navigate to Settings → API Keys and copy your project credentials
4. Save them into the `.env` file you created earlier:
```env
   LIVEKIT_URL=wss://<project_name>.livekit.cloud
   LIVEKIT_API_KEY=<livekit_api_key>
   LIVEKIT_API_SECRET=<livekit_api_secret>
```


#### 2. Hedra API Access

1. Create a [Hedra](https://www.hedra.com/) account
2. [Subscribe to a paid plan](https://www.hedra.com/plans) to gain API access
3. Navigate to your [API profile page](https://www.hedra.com/api-profile) to generate an API key
4. Copy and paste it into the same `.env` file:
```env
   HEDRA_API_KEY=<your_hedra_api_key>
```

#### 3. OpenAI API Access

1. Go to [OpenAI](https://platform.openai.com/) and follow instructions for generating an API key ([must be linked to a paid account]([url](https://openai.com/index/introducing-the-realtime-api/?utm_source=chatgpt.com)))
2. Paste your key into the same `.env` file:
```env
   OPENAI_API_KEY=<your_openai_api_key>
```


You `.env` file should now have all these values:
```env
   LIVEKIT_URL=wss://<project_name>.livekit.cloud
   LIVEKIT_API_KEY=<livekit_api_key>
   LIVEKIT_API_SECRET=<livekit_api_secret>
   HEDRA_API_KEY=<your_hedra_api_key>
   OPENAI_API_KEY=<your_openai_api_key>
```

### System Requirements

- **Node.js**: Install Node.js
   ```sh
   # Homebrew
   brew install node
   # or download at https://nodejs.org/en/download
   ```

- **pnpm**: Install pnpm package manager for Node:
  ```sh
  # Homebrew
  brew install pnpm
  # or
  npm install -g pnpm
  ```
- **uv**: Install `uv` package manager for Python:
   ```sh
   # Homebrew
   brew install uv
   # or
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```
   > **Note**: Python >3.10 is required for this application. Python versions will be managed automatically by `uv`.

## Installation

1. Create your application with a single command (replace `<app-name>` with your desired name). This will copy the application files to a new directory called `<app-name>` and attempt to install all dependencies.

   ```sh
   npx create-hedra-avatar <app-name>
   ```

2. Copy the environment variables you saved before to the application directories
   ```sh
   cp .env ./<app-name>/frontend/.env.local
   cp .env ./<app-name>/backend/.env.local
   # optionally delete the temporary file
   rm .env
   ```


## Running the Application

1. **Start the agent** (in your first terminal):

   ```sh
   npm run start-agent
   ```

2. **Start the frontend application** (in a new terminal):

   ```sh
   npm run start-app
   ```

Your application should now be running and ready to use!

## Customization

### Changing Avatars

You can customize the avatar by:

1. Adding your image assets to the `backend/assets` directory
2. Updating `backend/agent_worker.py` to point to your desired image file

The system supports direct image file paths, so you can easily swap between different avatar appearances.

## Troubleshooting
- **Missing dependencies**:
If you get the message `Error installing frontend (Node) dependencies` when you run `create-hedra-avatar`, you can re-run Node installation with:
   ```sh
   cd <app-name>/frontend
   pnpm install
   ```

   If you get the message `Error installing backend (Python) dependencies`, you can re-run Python installation with:
   ```sh
   # Using uv
   cd <app-name>/backend
   uv venv --python 3.13
   source /venv/bin/activate
   uv pip install -r requirements.txt

   # Or using raw python tooling
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip3 install -r requirements.txt
   ```

- **API key errors**: Double-check that all API keys are correctly set in both `.env.local` files
- **Virtual environment issues**: If you encounter Python-related errors, try recreating your virtual environment
