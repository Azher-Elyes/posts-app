import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + N: New Post
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        navigate('/add');
        toast.info('📝 Create new post', { autoClose: 2000 });
      }
      // Ctrl/Cmd + H: Home
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        navigate('/');
        toast.info('🏠 Back to home', { autoClose: 2000 });
      }
      // ?: Show shortcuts
      if (e.key === '?') {
        e.preventDefault();
        toast.info('⌨️ Shortcuts: Ctrl+N (New), Ctrl+H (Home)', {
          position: "bottom-center",
          autoClose: 3000
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);
};