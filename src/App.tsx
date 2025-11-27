import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import TemplateGallery from './components/TemplateGallery';
import AIBuilder from './components/AIBuilder';
import PreviewEditor from './components/PreviewEditor';
import { Template } from './lib/supabase';
import { seedTemplates } from './lib/seedTemplates';

type View = 'dashboard' | 'gallery' | 'ai-builder' | 'editor';

function AppContent() {
  const { user, loading } = useAuth();
  const [view, setView] = useState<View>('dashboard');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [generatedCss, setGeneratedCss] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      seedTemplates();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setView('editor');
  };

  const handleAIGenerate = (html: string, css: string) => {
    setGeneratedHtml(html);
    setGeneratedCss(css);
    setView('editor');
  };

  const handleNewProject = () => {
    setSelectedTemplate(null);
    setGeneratedHtml('');
    setGeneratedCss('');
    setEditingProjectId(null);
    setView('gallery');
  };

  const handleOpenProject = (projectId: string) => {
    setEditingProjectId(projectId);
    setSelectedTemplate(null);
    setGeneratedHtml('');
    setGeneratedCss('');
    setView('editor');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setSelectedTemplate(null);
    setGeneratedHtml('');
    setGeneratedCss('');
    setEditingProjectId(null);
  };

  return (
    <>
      {view === 'dashboard' && (
        <Dashboard
          onNewProject={handleNewProject}
          onOpenProject={handleOpenProject}
        />
      )}

      {view === 'gallery' && (
        <TemplateGallery
          onSelectTemplate={handleSelectTemplate}
          onCreateWithAI={() => setView('ai-builder')}
        />
      )}

      {view === 'ai-builder' && (
        <AIBuilder
          onGenerate={handleAIGenerate}
          onBack={() => setView('gallery')}
        />
      )}

      {view === 'editor' && (
        <PreviewEditor
          initialTemplate={selectedTemplate || undefined}
          initialHtml={generatedHtml}
          initialCss={generatedCss}
          projectId={editingProjectId || undefined}
          onBack={handleBackToDashboard}
        />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
