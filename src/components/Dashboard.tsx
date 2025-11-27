import { useState, useEffect } from 'react';
import { supabase, Project } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Folder, ExternalLink, Trash2, LogOut } from 'lucide-react';

type DashboardProps = {
  onNewProject: () => void;
  onOpenProject: (projectId: string) => void;
};

export default function Dashboard({ onNewProject, onOpenProject }: DashboardProps) {
  const { user, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={onNewProject}
          className="mb-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center gap-3 transition transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-6 h-6" />
          Create New Website
        </button>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <Folder className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No projects yet</h2>
            <p className="text-gray-600 mb-6">Start building your first website</p>
            <button
              onClick={onNewProject}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 relative overflow-hidden">
                  <iframe
                    srcDoc={`
                      <html>
                        <head><style>${project.css_content}</style></head>
                        <body>${project.html_content}</body>
                      </html>
                    `}
                    className="w-full h-full border-none pointer-events-none transform scale-50 origin-top-left"
                    style={{ width: '200%', height: '200%' }}
                    title={project.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <button
                      onClick={() => onOpenProject(project.id)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Updated {formatDate(project.updated_at)}
                  </p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onOpenProject(project.id)}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Edit Project
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
