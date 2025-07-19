# Hedra Realtime Avatar

Get up and running with Hedra Realtime Avatars in minutes. This tool creates a complete customizable application with both frontend and backend components for building interactive avatar experiences.

## Prerequisites

Before you begin, you'll need to set up API keys for the following services. Let's create a `.env` file to store all of environment variables.
 ```sh
  touch .env
  ```

### 1. Livekit Project Setup

1. Create a [Livekit](https://livekit.io/) account
2. Create a project through your [Livekit dashboard](https://cloud.livekit.io/projects)
3. Navigate to Settings → API Keys and copy your project credentials
4. Save them into the `.env` file you created earlier:
```env
   LIVEKIT_URL=wss://<project_name>.livekit.cloud
   LIVEKIT_API_KEY=<livekit_api_key>
   LIVEKIT_API_SECRET=<livekit_api_secret>
```


### 2. Hedra API Access

1. Create a [Hedra](https://www.hedra.com/) account
2. [Subscribe to a paid plan](https://www.hedra.com/plans) to gain API access
3. Navigate to your [API profile page](https://www.hedra.com/api-profile) to generate an API key
4. Copy and paste it into the same `.env` file:
```env
   HEDRA_API_KEY=<your_hedra_api_key>
```

### 3. OpenAI API Access

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

### 4. System Requirements

- **Node.js**: Install Node.js (recommended via Homebrew: `brew install node`)
- **pnpm**: Install pnpm package manager:
  ```sh
  # Homebrew
  brew install pnpm
  # or
  npm install -g pnpm
  ```
- **Python**: Version >3.10 required for backend dependencies
  > **Important**: If you change your Python version after creating a virtual environment, delete the `venv` directory and recreate it with the correct Python version.

## Installation

1. **Create your application** (replace `<app-name>` with your desired name). If you get any errors or missing dependencies look at steps 2 and 3 below:

   ```sh
   npm install
   npx create-hedra-avatar <app-name>
   ```

2. **You might need to set up Python virtual environment**:

   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**:

   If you encounter missing Python dependencies, install them with pip:
   ```sh
   # Example
   pip install dotenv
   ```

## Configuration

1. **After successfully creating your application navigate to your application directory**
   ```sh
   cd <app-name>
   ```

1. **Create `.env.local` in the frontend directory**:

   ```env
   LIVEKIT_URL="wss://<project_name>.livekit.cloud"
   LIVEKIT_API_KEY="<livekit_api_key>"
   LIVEKIT_API_SECRET="<livekit_api_secret>"
   HEDRA_API_KEY="<hedra_api_key>"
   OPENAI_API_KEY="<openai_api_key>"
   ```

2. **Create `.env.local` in the backend directory** with the same content:

   ```env
   LIVEKIT_URL="wss://<project_name>.livekit.cloud"
   LIVEKIT_API_KEY="<livekit_api_key>"
   LIVEKIT_API_SECRET="<livekit_api_secret>"
   HEDRA_API_KEY="<hedra_api_key>"
   OPENAI_API_KEY="<openai_api_key>"
   ```

   > **Tip**: Use the `.env` you created earlier to copy into both directories:
   ```sh
   cp ~/<path-to-file>/.env ./frontend/.env.local
   cp ~/<path-to-file>/.env ./backend/.env.local
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

- **Missing dependencies**: Install any missing packages with `npm install` or `pip install <package-name>`
- **API key errors**: Double-check that all API keys are correctly set in both `.env.local` files
- **Virtual environment issues**: If you encounter Python-related errors, try recreating your virtual environment
