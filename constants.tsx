import React from 'react';
import { AIAssistAction } from './types';
import { CodeIcon } from './components/icons/CodeIcon';
import { ExplainIcon } from './components/icons/ExplainIcon';
import { RefactorIcon } from './components/icons/RefactorIcon';
import { BugIcon } from './components/icons/BugIcon';
import { TestIcon } from './components/icons/TestIcon';

export const AI_ACTIONS: { [key in AIAssistAction]: { label: string; icon: React.ReactNode; description: string; requiresCode: boolean; requiresPrompt: boolean; } } = {
  [AIAssistAction.GENERATE]: {
    label: 'Generate Code',
    icon: <CodeIcon />,
    description: 'Generate Python code from a natural language prompt.',
    requiresCode: false,
    requiresPrompt: true,
  },
  [AIAssistAction.EXPLAIN]: {
    label: 'Explain Code',
    icon: <ExplainIcon />,
    description: 'Get a natural language explanation of the selected code.',
    requiresCode: true,
    requiresPrompt: false,
  },
  [AIAssistAction.REFACTOR]: {
    label: 'Refactor Code',
    icon: <RefactorIcon />,
    description: 'Suggest improvements to make the code more efficient and readable.',
    requiresCode: true,
    requiresPrompt: false,
  },
  [AIAssistAction.DEBUG]: {
    label: 'Find Bugs',
    icon: <BugIcon />,
    description: 'Identify potential bugs in the code and suggest fixes.',
    requiresCode: true,
    requiresPrompt: false,
  },
  [AIAssistAction.TEST]: {
    label: 'Generate Tests',
    icon: <TestIcon />,
    description: 'Create unit tests for the selected function or class.',
    requiresCode: true,
    requiresPrompt: false,
  },
};

export const DEFAULT_PYTHON_CODE = `# Catalyst Blueprint: A Full-Stack Project

![Architecture du projet](https://i.imgur.com/uR1k33n.png)

## À Propos de ce Projet

**Catalyst Blueprint** est une application web full-stack moderne et une architecture de référence conçue pour catalyser le développement de services robustes et scalables. Il démontre comment intégrer harmonieusement un backend Python, un frontend TypeScript et une base de données PostgreSQL, le tout orchestré par Docker.

### Stack Technique

*   **Backend**: Python 3.11 avec **FastAPI**
*   **Frontend**: TypeScript avec **React** (Vite)
*   **Base de Données**: **PostgreSQL**
*   **ORM**: **SQLAlchemy** avec migrations Alembic
*   **Tests**: **Pytest**
*   **Conteneurisation**: **Docker** & **Docker Compose**

## Démarrage Rapide

1.  **Clonez le projet**
2.  **Créez les fichiers d'environnement**
3.  **Lancez l'application** :
    \`\`\`bash
    docker-compose up --build
    \`\`\`
4.  **Appliquez les migrations** :
    \`\`\`bash
    docker-compose exec backend alembic upgrade head
    \`\`\`

L'application est maintenant accessible :
-   **Frontend**: \`http://localhost:5173\`
-   **API Backend**: \`http://localhost:8000/docs\`
`;
