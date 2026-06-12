import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={theme === 'dark' ? '切换为浅色模式' : '切换为深色模式'}
      className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-accent hover:text-primary"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.75} />
      )}
    </Button>
  );
}
