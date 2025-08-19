import React from 'react';

const CodeBlock: React.FC<{ children: React.ReactNode; lang?: string }> = ({ children, lang }) => (
    <pre className="bg-slate-900 rounded-md p-3 my-2 text-xs font-mono text-cyan-300 overflow-x-auto">
        {lang && <span className="block text-slate-500 -mt-1 mb-2 text-right">{lang}</span>}
        <code>{children}</code>
    </pre>
);

const RoadmapSection: React.FC<{ title: string; children: React.ReactNode; priority?: 'Haute' | 'Moyenne' }> = ({ title, children, priority }) => (
    <div className="mb-4">
        <h4 className="font-bold text-cyan-400 mt-3 mb-1 flex items-center">
            {title}
            {priority && (
                <span className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded-full ${priority === 'Haute' ? 'bg-red-800 text-red-200' : 'bg-yellow-800 text-yellow-200'}`}>
                    Priorité {priority}
                </span>
            )}
        </h4>
        <div className="text-sm text-slate-400 space-y-2">{children}</div>
    </div>
);

export const Roadmap: React.FC = () => {
  return (
    <div id="roadmap-content" className="mt-3 pl-2 pr-1 space-y-4 text-slate-300 text-sm border-l-2 border-slate-700 ml-2">
        
        <div>
            <h3 className="text-base font-semibold text-slate-100">Étape 3: Fortification de l'Application</h3>
            <p className="italic text-slate-400">"Implémentation des fonctionnalités de sécurité et de robustesse."</p>
            
            <RoadmapSection title="Étape 3.1: Sécurité par Clé d'API" priority="Haute">
                <div className="p-3 bg-red-900/50 border border-red-700 rounded-md text-red-200">
                    <p className="font-bold text-lg">Alerte de Sécurité Immédiate !</p>
                    <p className="mt-1">NE JAMAIS partager de clés secrètes ou d'API keys publiquement. Les clés exposées doivent être révoquées immédiatement. Nous utilisons des variables d'environnement pour une gestion sécurisée.</p>
                </div>
                
                <p className="font-semibold text-slate-300 mt-3">Action 3.1: Gérer la Clé API de manière Sécurisée</p>
                <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Créer un fichier <code className="text-xs bg-slate-700 p-1 rounded">backend/.env</code> pour stocker les secrets.</li>
                    <li>Ajouter <code className="text-xs bg-slate-700 p-1 rounded">.env</code> au <code className="text-xs bg-slate-700 p-1 rounded">.gitignore</code>.</li>
                    <li>Utiliser Pydantic pour lire les variables d'environnement dans <code className="text-xs bg-slate-700 p-1 rounded">app/core/config.py</code>.</li>
                </ul>
                <CodeBlock lang="python">{`# app/core/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    API_KEY: str

    class Config:
        env_file = ".env"

settings = Settings()`}</CodeBlock>

                <p className="font-semibold text-slate-300 mt-3">Action 3.2: Créer le Mécanisme de Sécurité</p>
                <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Créer <code className="text-xs bg-slate-700 p-1 rounded">app/security.py</code> pour centraliser la logique d'authentification.</li>
                    <li>Utiliser <code className="text-xs bg-slate-700 p-1 rounded">APIKeyHeader</code> pour définir l'en-tête attendu (<code className="text-xs bg-slate-700 p-1 rounded">X-API-Key</code>).</li>
                    <li>Créer une dépendance <code className="text-xs bg-slate-700 p-1 rounded">get_api_key</code> qui valide la clé ou lève une erreur 401.</li>
                </ul>
                  <CodeBlock lang="python">{`# app/security.py
from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader
from app.core.config import settings

api_key_header = APIKeyHeader(name="X-API-Key")

def get_api_key(api_key: str = Security(api_key_header)):
    if api_key == settings.API_KEY:
        return api_key
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key",
        )`}</CodeBlock>

                 <p className="font-semibold text-slate-300 mt-3">Action 3.3: Protéger les Routes</p>
                 <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Dans <code className="text-xs bg-slate-700 p-1 rounded">app/routers/items.py</code>, ajouter <code className="text-xs bg-slate-700 p-1 rounded">dependencies=[Depends(get_api_key)]</code> au constructeur de <code className="text-xs bg-slate-700 p-1 rounded">APIRouter</code>.</li>
                 </ul>
                 <CodeBlock lang="python">{`# app/routers/items.py
from app.security import get_api_key

router = APIRouter(
    dependencies=[Depends(get_api_key)]
)`}</CodeBlock>

                 <p className="font-semibold text-slate-300 mt-3">Action 3.4: Vérification</p>
                  <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Utiliser le bouton "Authorize" dans la documentation (<code className="text-xs bg-slate-700 p-1 rounded">/docs</code>) pour tester.</li>
                    <li>Utiliser <code className="text-xs bg-slate-700 p-1 rounded">curl</code> pour tester en ligne de commande.</li>
                 </ul>
                 <CodeBlock lang="bash">{`# Requête avec la bonne clé (doit réussir)
curl -X GET "http://127.0.0.1:8000/api/items/" \\
  -H "X-API-Key: VOTRE_VRAIE_CLE_SECRETE"`}</CodeBlock>
            </RoadmapSection>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-base font-semibold text-slate-100">Étape 4: Moderniser le Frontend (React/TS)</h3>
            <p className="italic text-slate-400">"Connecter le frontend au backend sécurisé avec TanStack Query."</p>
            
            <RoadmapSection title="Action 4.1: Gérer la Clé d'API côté Client">
                <p>La clé est gérée de manière sécurisée via des variables d'environnement, lues par Vite.</p>
                <ul className="list-disc pl-5 text-xs space-y-1">
                    <li>Créer <code className="text-xs bg-slate-700 p-1 rounded">frontend/.env.local</code>.</li>
                    <li>Ajouter la clé avec le préfixe <code className="text-xs bg-slate-700 p-1 rounded">VITE_</code>, par ex: <code className="text-xs bg-slate-700 p-1 rounded">VITE_API_KEY="votre_clé"</code>.</li>
                    <li>Ajouter <code className="text-xs bg-slate-700 p-1 rounded">.env.*</code> au <code className="text-xs bg-slate-700 p-1 rounded">.gitignore</code>.</li>
                </ul>
            </RoadmapSection>

            <RoadmapSection title="Action 4.2 & 4.3: Intégrer TanStack Query">
                 <p>Installation et configuration du provider pour rendre les hooks de query disponibles dans toute l'application.</p>
                 <CodeBlock lang="bash">{`# 1. Installer la dépendance
npm install @tanstack/react-query`}</CodeBlock>
                 <CodeBlock lang="tsx">{`// 2. Configurer le provider (dans src/main.tsx ou index.tsx)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)`}</CodeBlock>
            </RoadmapSection>

            <RoadmapSection title="Action 4.4: Refactorisation de App.tsx">
                <p>Le composant principal est entièrement réécrit pour utiliser les hooks <code className="text-xs bg-slate-700 p-1 rounded">useQuery</code> pour la lecture et <code className="text-xs bg-slate-700 p-1 rounded">useMutation</code> pour l'écriture. Le code complet est visible dans l'éditeur principal.</p>
                <CodeBlock lang="tsx">{`// Extrait de App.tsx
// ...
const { data: items, isLoading } = useQuery({
  queryKey: ['items'],
  queryFn: fetchItems,
});

const mutation = useMutation({
  mutationFn: createItem,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['items'] });
  },
});
// ...`}</CodeBlock>
            </RoadmapSection>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-base font-semibold text-slate-100">Étape 5: Conteneuriser avec Docker</h3>
            <p className="italic text-slate-400">"Créer un environnement de développement portable et reproductible."</p>
            <RoadmapSection title="Action 5.1: Préparer le Backend">
              <p>Générer <code className="text-xs bg-slate-700 p-1 rounded">requirements.txt</code> et créer le <code className="text-xs bg-slate-700 p-1 rounded">Dockerfile</code> du backend.</p>
              <CodeBlock lang="bash">{`pip freeze > requirements.txt`}</CodeBlock>
              <CodeBlock lang="dockerfile">{`# backend/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`}</CodeBlock>
            </RoadmapSection>
            <RoadmapSection title="Action 5.2: Préparer le Frontend">
              <p>Créer un <code className="text-xs bg-slate-700 p-1 rounded">Dockerfile</code> multi-stage et une configuration <code className="text-xs bg-slate-700 p-1 rounded">Nginx</code>.</p>
              <CodeBlock lang="dockerfile">{`# frontend/Dockerfile
# Étape 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2: Production
FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`}</CodeBlock>
            </RoadmapSection>
            <RoadmapSection title="Action 5.3: Orchestrer avec Docker Compose">
              <p>Créer un <code className="text-xs bg-slate-700 p-1 rounded">docker-compose.yml</code> à la racine du projet pour lancer les deux services.</p>
               <CodeBlock lang="yaml">{`# docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports: ["8000:8000"]
    volumes: [./backend:/app]
    env_file: [./backend/.env]
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
  frontend:
    build: ./frontend
    ports: ["5173:80"]
    depends_on: [backend]`}</CodeBlock>
            </RoadmapSection>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-base font-semibold text-slate-100">Étape 6: Migration vers PostgreSQL</h3>
            <p className="italic text-slate-400">"Passer à une base de données de production."</p>
            <RoadmapSection title="Action 6.1-6.3: Adapter le Code et la Configuration">
                <p>Installer <code className="text-xs bg-slate-700 p-1 rounded">psycopg2-binary</code>, et rendre la configuration de la base de données flexible en utilisant des variables d'environnement lues par Pydantic.</p>
                <CodeBlock lang="python">{`# app/core/config.py
class Settings(BaseSettings):
    API_KEY: str
    DATABASE_URL: str # <-- Ajout

# backend/.env
DATABASE_URL="postgresql://myuser:mypassword@db:5432/mydatabase"`}</CodeBlock>
            </RoadmapSection>
             <RoadmapSection title="Action 6.4: Mettre à jour Docker Compose">
                <p>Ajouter un service <code className="text-xs bg-slate-700 p-1 rounded">db</code> pour PostgreSQL et un volume pour la persistance des données.</p>
                <CodeBlock lang="yaml">{`# ... (services backend/frontend)
  db:
    image: postgres:15-alpine
    volumes:
      - postgres_data:/var/lib/postgresql/data/
    env_file:
      - ./backend/.env
    ports:
      - "5432:5432"

volumes:
  postgres_data:`}</CodeBlock>
            </RoadmapSection>
            <RoadmapSection title="Action 6.5: Lancer et Migrer">
                <p>Appliquer les migrations Alembic sur la nouvelle base de données PostgreSQL.</p>
                <CodeBlock lang="bash">{`# Lancer les conteneurs en arrière-plan
docker-compose up --build -d

# Exécuter les migrations à l'intérieur du conteneur backend
docker-compose exec backend alembic upgrade head`}</CodeBlock>
            </RoadmapSection>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-base font-semibold text-slate-100">Étape 7: Tests Automatisés</h3>
            <p className="italic text-slate-400">"Construire un filet de sécurité avec Pytest."</p>
             <RoadmapSection title="Action 7.2: Créer la Configuration de Test">
                <p>Utiliser <code className="text-xs bg-slate-700 p-1 rounded">tests/conftest.py</code> pour surcharger la dépendance <code className="text-xs bg-slate-700 p-1 rounded">get_db</code> et utiliser une base de données SQLite en mémoire pour des tests rapides et isolés.</p>
                 <CodeBlock lang="python">{`# tests/conftest.py
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
# ...
@pytest.fixture
def client(db_session):
    def override_get_db():
        yield db_session
    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()`}</CodeBlock>
            </RoadmapSection>
            <RoadmapSection title="Action 7.3: Écrire les Tests">
                <p>Créer des tests qui valident les endpoints de l'API en utilisant le <code className="text-xs bg-slate-700 p-1 rounded">TestClient</code> de FastAPI.</p>
                <CodeBlock lang="python">{`# tests/test_items_api.py
def test_create_and_read_item(client: TestClient):
    headers = {"X-API-Key": "VOTRE_CLE_API_SECRETE"}
    # 1. Vérifier que la liste est vide
    response = client.get("/api/items/", headers=headers)
    assert response.status_code == 200
    assert response.json() == []
    
    # 2. Créer un nouvel item
    item_data = {"name": "Test Item", "framework": "Pytest"}
    response = client.post("/api/items/", json=item_data, headers=headers)
    assert response.status_code == 200
    
    # 3. Vérifier que la liste contient l'item
    response = client.get("/api/items/", headers=headers)
    assert len(response.json()) == 1`}</CodeBlock>
            </RoadmapSection>
             <RoadmapSection title="Action 7.4: Exécuter les Tests">
                <p>Lancer les tests localement ou, de préférence, à l'intérieur du conteneur Docker pour garantir la cohérence de l'environnement.</p>
                 <CodeBlock lang="bash">{`# Lancer les tests dans le conteneur
docker-compose exec backend pytest`}</CodeBlock>
            </RoadmapSection>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-base font-semibold text-slate-100">Étape 8 & 9: Finalisation et Publication</h3>
            <p className="italic text-slate-400">"Signer, documenter et partager le projet."</p>
            <RoadmapSection title="Action 8.1: Ajouter une Licence (MIT)">
                <p>Créer un fichier <code className="text-xs bg-slate-700 p-1 rounded">LICENSE</code> à la racine du projet pour définir les droits d'utilisation.</p>
                <CodeBlock lang="text">{`MIT License

Copyright (c) 2025 mohamed dridi

Permission is hereby granted, free of charge, to any person obtaining a copy...
(Texte complet de la licence MIT)`}
                </CodeBlock>
            </RoadmapSection>
            <RoadmapSection title="Action 8.2: Créer le Fichier README.md">
                <p>Créer un fichier <code className="text-xs bg-slate-700 p-1 rounded">README.md</code> de haute qualité pour être le visage de votre projet.</p>
                 <CodeBlock lang="markdown">{`# Catalyst Blueprint: A Full-Stack Project
... (contenu finalisé visible dans l'éditeur)`}
                </CodeBlock>
            </RoadmapSection>
             <RoadmapSection title="Action 9: Transférer le Projet sur GitHub">
                <p>Initialiser un dépôt Git local, le connecter à un nouveau dépôt distant sur GitHub et pousser le code.</p>
                 <CodeBlock lang="bash">{`# Ajouter les derniers changements
git add README.md LICENSE
git commit -m "Finalize project with official name, license and signature"

# Connecter et pousser vers GitHub
git remote add origin https://github.com/USER/REPO.git
git push -u origin main`}
                </CodeBlock>
            </RoadmapSection>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-base font-semibold text-slate-100">Étape 10: Sécurisation Avancée - Proxy Backend</h3>
            <p className="italic text-slate-400">"La touche finale d'un professionnel : ne jamais exposer une clé d'API côté client."</p>
            <RoadmapSection title="Le Problème : Clé d'API Exposée">
                <p>Même si notre clé est dans un fichier <code className="text-xs bg-slate-700 p-1 rounded">.env.local</code>, elle est tout de même incluse dans le code JavaScript final envoyé au navigateur. Un utilisateur technique peut la trouver. C'est inacceptable pour une application en production.</p>
            </RoadmapSection>
            <RoadmapSection title="La Solution : Un Serveur Intermédiaire (Proxy)">
                <p>Le frontend n'appellera plus jamais l'API de Google directement. À la place :</p>
                <ol className="list-decimal pl-5 text-xs space-y-1">
                    <li>Le <strong>Frontend</strong> fait un appel à notre propre <strong>Backend</strong> (ex: <code className="text-xs bg-slate-700 p-1 rounded">POST /api/ai-assist</code>), sans clé d'API.</li>
                    <li>Le <strong>Backend</strong> reçoit la requête, ajoute la clé d'API secrète (qu'il est le seul à connaître), et appelle l'API de Google.</li>
                    <li>Le <strong>Backend</strong> reçoit la réponse de Google et la renvoie au <strong>Frontend</strong>.</li>
                </ol>
                <p className="mt-2 font-semibold text-slate-300">Résultat : La clé d'API ne quitte jamais notre serveur. Elle est 100% sécurisée.</p>
            </RoadmapSection>
            <RoadmapSection title="Exemple d'Implémentation">
                <p>La logique de l'appel à l'API Gemini est déplacée du frontend vers le backend.</p>
                <CodeBlock lang="typescript">{`// Frontend (React) - App.tsx
// Le frontend appelle maintenant notre propre backend.
const response = await fetch("/api/ai-assist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action, code, prompt }),
});
const result = await response.text();`}</CodeBlock>
                <CodeBlock lang="python">{`# Backend (FastAPI) - Un nouvel endpoint
from app.security import get_api_key
# ... import du service gemini

@router.post("/ai-assist")
async def ai_assist_proxy(request: AIRequest, api_key: str = Depends(get_api_key)):
    # Notre backend appelle l'API de Google en utilisant la clé
    # qui est stockée de manière sécurisée sur le serveur.
    response_text = await call_gemini_service(
        action=request.action,
        code=request.code,
        prompt=request.prompt
    )
    return PlainTextResponse(content=response_text)`}</CodeBlock>
            </RoadmapSection>
        </div>

    </div>
  );
};