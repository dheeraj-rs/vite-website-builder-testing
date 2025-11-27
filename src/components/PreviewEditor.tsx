import { useState, useEffect } from 'react';
import { Eye, Code, Save, Upload, ArrowLeft } from 'lucide-react';
import { supabase, Template, Project } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type PreviewEditorProps = {
  initialTemplate?: Template;
  initialHtml?: string;
  initialCss?: string;
  projectId?: string;
  onBack: () => void;
};

export default function PreviewEditor({
  initialTemplate,
  initialHtml = '',
  initialCss = '',
  projectId,
  onBack
}: PreviewEditorProps) {
  const { user } = useAuth();
  const [html, setHtml] = useState(initialHtml || initialTemplate?.html_content || '');
  const [css, setCss] = useState(initialCss || initialTemplate?.css_content || '');
  const [mode, setMode] = useState<'preview' | 'code'>('preview');
  const [projectName, setProjectName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    if (!projectId) return;

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setCurrentProject(data);
        setHtml(data.html_content);
        setCss(data.css_content);
        setProjectName(data.name);
      }
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };

  const saveProject = async () => {
    if (!user || !projectName.trim()) return;

    setSaving(true);
    try {
      if (currentProject) {
        const { error } = await supabase
          .from('projects')
          .update({
            name: projectName,
            html_content: html,
            css_content: css,
            updated_at: new Date().toISOString()
          })
          .eq('id', currentProject.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert({
            user_id: user.id,
            name: projectName,
            template_id: initialTemplate?.id || null,
            html_content: html,
            css_content: css,
            js_content: ''
          })
          .select()
          .single();

        if (error) throw error;
        setCurrentProject(data);
      }

      setShowSaveDialog(false);
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const deployToVercel = async () => {
    if (!currentProject && !projectName) {
      alert('Please save your project first');
      return;
    }

    setDeploying(true);
    try {
      let projectToDeploy = currentProject;

      if (!projectToDeploy) {
        await saveProject();
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user?.id)
          .eq('name', projectName)
          .maybeSingle();
        projectToDeploy = data;
      }

      if (!projectToDeploy) {
        throw new Error('Project not found');
      }

      const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectName || 'My Website'}</title>
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;

      await supabase.from('deployments').insert({
        project_id: projectToDemo.id,
        status: 'pending',
        vercel_url: `https://example-${Date.now()}.vercel.app`
      });

      alert('Deployment initiated! Your website will be live shortly.\n\nNote: Full Vercel integration requires API setup. This is a demo version.');
    } catch (error) {
      console.error('Error deploying:', error);
      alert('Failed to deploy project');
    } finally {
      setDeploying(false);
    }
  };

  const previewContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {currentProject?.name || projectName || 'New Project'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('preview')}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
                  mode === 'preview'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setMode('code')}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${
                  mode === 'code'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4" />
                Code
              </button>
            </div>

            <button
              onClick={() => setShowSaveDialog(true)}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>

            <button
              onClick={deployToVercel}
              disabled={deploying}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {deploying ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        {mode === 'preview' ? (
          <iframe
            srcDoc={previewContent}
            className="w-full h-full border-none bg-white"
            title="Preview"
          />
        ) : (
          <div className="h-full grid grid-cols-2 gap-4 p-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">
                HTML
              </div>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 font-semibold text-sm text-gray-700">
                CSS
              </div>
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none"
                spellCheck={false}
              />
            </div>
          </div>
        )}
      </div>

      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Save Project</h2>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveProject}
                disabled={saving || !projectName.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
