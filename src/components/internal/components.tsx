'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { Check, ChevronDown, Copy, Search, Menu, X, RotateCcw } from 'lucide-react';
import { cn } from './utils';
import { useTheme, ThemeToggle } from './theme';

// --- Accordion Section ---

interface SectionItem {
  id: string;
  num: number;
  title: string;
  completed: boolean;
  children: React.ReactNode;
  onComplete: (id: string, done: boolean) => void;
}

export function SectionAccordion({ items, activeSection }: { items: SectionItem[]; activeSection: string }) {
  const { theme } = useTheme();
  const [openItems, setOpenItems] = useState<string[]>([]);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeSection && !openItems.includes(activeSection)) {
      setOpenItems(prev => [...prev, activeSection]);
      setTimeout(() => {
        refs.current[activeSection]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [activeSection, openItems]);

  return (
    <AccordionPrimitive.Root type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-3">
      {items.map((item) => (
        <AccordionPrimitive.Item
          key={item.id}
          value={item.id}
          ref={(el) => { refs.current[item.id] = el; }}
          className={cn(
            'rounded-xl border overflow-hidden transition-colors',
            theme === 'dark'
              ? item.completed ? 'border-emerald-500/20' : 'border-white/10'
              : item.completed ? 'border-emerald-500/30' : 'border-gray-200'
          )}
        >
          <AccordionPrimitive.Trigger className={cn(
            'w-full flex items-center justify-between px-5 py-4 transition-colors text-left group',
            theme === 'dark'
              ? 'bg-white/[0.03] hover:bg-white/[0.06]'
              : 'bg-gray-50/50 hover:bg-gray-50'
          )}>
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono shrink-0 transition-colors',
                item.completed
                  ? 'bg-emerald-500/20 text-emerald-500'
                  : theme === 'dark' ? 'bg-white/5 text-white/40' : 'bg-gray-100 text-gray-400'
              )}>
                {item.completed ? <Check className="w-3.5 h-3.5" /> : item.num}
              </div>
              <span className={cn(
                'font-semibold text-[15px]',
                item.completed
                  ? theme === 'dark' ? 'text-white/50' : 'text-gray-400'
                  : theme === 'dark' ? 'text-white' : 'text-gray-900'
              )}>
                {item.title}
              </span>
            </div>
            <ChevronDown className={cn(
              'w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180',
              theme === 'dark' ? 'text-white/30' : 'text-gray-400'
            )} />
          </AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content className={cn(
            'overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
            theme === 'dark' ? 'border-t border-white/5' : 'border-t border-gray-100'
          )}>
            <div className="px-5 py-5">
              {item.children}
              <ReadCheck id={item.id} checked={item.completed} onChange={item.onComplete} />
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}

// --- Read Checkbox ---

function ReadCheck({ id, checked, onChange }: { id: string; checked: boolean; onChange: (id: string, checked: boolean) => void }) {
  const { theme } = useTheme();
  return (
    <label className={cn(
      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all w-full mt-5 cursor-pointer select-none',
      checked
        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-500'
        : theme === 'dark'
          ? 'bg-white/[0.02] border border-white/10 text-white/40 hover:bg-white/[0.05] hover:text-white/60'
          : 'bg-gray-50 border border-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-500'
    )}>
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(val) => onChange(id, !!val)}
        className={cn(
          'w-[18px] h-[18px] rounded border-2 flex items-center justify-center shrink-0 transition-colors',
          checked ? 'bg-emerald-500 border-emerald-500' : theme === 'dark' ? 'border-white/25' : 'border-gray-300'
        )}
      >
        <CheckboxPrimitive.Indicator>
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span>{checked ? 'Marked as read' : 'Mark as read & understood'}</span>
    </label>
  );
}

// --- Progress Bar ---

export function ProgressBar({ completed, total }: { completed: number; total: number }) {
  const { theme } = useTheme();
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className={cn('font-mono', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>{completed}/{total}</span>
        <span className={cn('font-semibold', pct === 100 ? 'text-emerald-500' : theme === 'dark' ? 'text-white/50' : 'text-gray-500')}>{pct}%</span>
      </div>
      <ProgressPrimitive.Root className={cn('h-1.5 rounded-full overflow-hidden', theme === 'dark' ? 'bg-white/10' : 'bg-gray-200')}>
        <ProgressPrimitive.Indicator
          className={cn('h-full rounded-full transition-all duration-500 ease-out', pct === 100 ? 'bg-emerald-500' : 'bg-blue-500')}
          style={{ width: `${pct}%` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

// --- Copy Button ---

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className={cn(
        'ml-2 px-2 py-0.5 text-xs rounded transition-colors shrink-0 flex items-center gap-1',
        theme === 'dark'
          ? 'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700'
      )}
    >
      <Copy className="w-3 h-3" />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

// --- Template Block ---

export function Template({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <div className={cn(
      'relative group rounded-lg p-4 my-3 border',
      theme === 'dark'
        ? 'bg-[#1a2332] border-white/10'
        : 'bg-emerald-50 border-emerald-200/50'
    )}>
      <pre className={cn(
        'text-sm whitespace-pre-wrap font-mono leading-relaxed',
        theme === 'dark' ? 'text-emerald-300/90' : 'text-emerald-700'
      )}>{children}</pre>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={children} />
      </div>
    </div>
  );
}

// --- Rule Item ---

export function Rule({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <li className={cn('flex items-start gap-2 text-[15px] leading-relaxed', theme === 'dark' ? 'text-white/80' : 'text-gray-700')}>
      <span className="text-red-400 mt-0.5 shrink-0 text-sm">--</span>
      <span>{children}</span>
    </li>
  );
}

// --- Good / Bad ---

export function Good({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <div className="flex items-start gap-2 my-2">
      <span className="text-emerald-500 text-xs font-bold mt-1 shrink-0">GOOD</span>
      <span className={cn('text-sm italic', theme === 'dark' ? 'text-white/70' : 'text-gray-600')}>&quot;{children}&quot;</span>
    </div>
  );
}

export function Bad({ children, reason }: { children: string; reason: string }) {
  const { theme } = useTheme();
  return (
    <div className="flex items-start gap-2 my-2">
      <span className="text-red-400 text-xs font-bold mt-1 shrink-0">BAD</span>
      <span className={cn('text-sm italic', theme === 'dark' ? 'text-white/50' : 'text-gray-400')}>
        &quot;{children}&quot; <span className={cn('not-italic', theme === 'dark' ? 'text-white/30' : 'text-gray-300')}>({reason})</span>
      </span>
    </div>
  );
}

// --- FAQ ---

export function FAQ({ q, a }: { q: string; a: string }) {
  const { theme } = useTheme();
  return (
    <div className="my-3">
      <p className={cn('text-sm font-medium', theme === 'dark' ? 'text-white/60' : 'text-gray-500')}>&quot;{q}&quot;</p>
      <p className={cn('text-sm mt-1', theme === 'dark' ? 'text-white/80' : 'text-gray-700')}>{a}</p>
    </div>
  );
}

// --- Checklist ---

export function Checklist({ items }: { items: string[] }) {
  const { theme } = useTheme();
  return (
    <ul className="space-y-1.5 my-3">
      {items.map((item, i) => (
        <li key={i} className={cn('flex items-start gap-2 text-sm', theme === 'dark' ? 'text-white/70' : 'text-gray-600')}>
          <span className={theme === 'dark' ? 'text-white/30' : 'text-gray-300'}>[ ]</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// --- Callout ---

export function Callout({ variant, title, children }: { variant: 'info' | 'warning' | 'danger' | 'success'; title?: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  const styles = {
    info: theme === 'dark' ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700',
    warning: theme === 'dark' ? 'bg-amber-500/10 border-amber-500/20 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-700',
    danger: theme === 'dark' ? 'bg-red-500/10 border-red-500/20 text-red-300' : 'bg-red-50 border-red-200 text-red-700',
    success: theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700',
  };
  return (
    <div className={cn('rounded-lg border p-4', styles[variant])}>
      {title && <p className="text-xs font-semibold mb-1 uppercase tracking-wide">{title}</p>}
      <div className="text-sm opacity-80">{children}</div>
    </div>
  );
}

// --- Section Heading ---

export function SectionHeading({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return <h4 className={cn('font-semibold text-sm', theme === 'dark' ? 'text-white' : 'text-gray-900')}>{children}</h4>;
}

// --- Body Text ---

export function P({ children, className }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();
  return <p className={cn('text-sm', theme === 'dark' ? 'text-white/60' : 'text-gray-500', className)}>{children}</p>;
}

export function Pb({ children, className }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();
  return <p className={cn('text-sm', theme === 'dark' ? 'text-white/70' : 'text-gray-600', className)}>{children}</p>;
}

// --- List Item ---

export function Li({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <li className={cn('flex items-start gap-2 text-sm', theme === 'dark' ? 'text-white/60' : 'text-gray-500')}>
      <span className={cn('mt-0.5', theme === 'dark' ? 'text-white/30' : 'text-gray-300')}>-</span>
      <span>{children}</span>
    </li>
  );
}

// --- Info Box ---

export function InfoBox({ children, className }: { children: React.ReactNode; className?: string }) {
  const { theme } = useTheme();
  return (
    <div className={cn('rounded-lg p-3 text-sm space-y-1', theme === 'dark' ? 'bg-white/5 text-white/60' : 'bg-gray-50 text-gray-600 border border-gray-100', className)}>
      {children}
    </div>
  );
}

// --- Badge ---

export function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'success' | 'warning' | 'danger' }) {
  const { theme } = useTheme();
  const styles = {
    default: theme === 'dark' ? 'bg-white/10 text-white/70' : 'bg-gray-100 text-gray-600',
    success: 'bg-emerald-500/15 text-emerald-500',
    warning: theme === 'dark' ? 'bg-amber-500/15 text-amber-400' : 'bg-amber-100 text-amber-700',
    danger: theme === 'dark' ? 'bg-red-500/15 text-red-400' : 'bg-red-100 text-red-700',
  };
  return (
    <span className={cn('px-2 py-0.5 rounded-md text-xs font-medium', styles[variant])}>{children}</span>
  );
}

// --- Sidebar Layout ---

interface TOCItem {
  id: string;
  num: number;
  title: string;
}

export function InternalLayout({
  title,
  subtitle,
  toc,
  progress,
  completedCount,
  search,
  onSearch,
  onJumpTo,
  onResetProgress,
  children,
}: {
  title: string;
  subtitle: string;
  toc: TOCItem[];
  progress: Record<string, boolean>;
  completedCount: number;
  search: string;
  onSearch: (val: string) => void;
  onJumpTo: (id: string) => void;
  onResetProgress: () => void;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredTOC = search.trim()
    ? toc.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
    : toc;

  return (
    <div className={cn('min-h-screen transition-colors', theme === 'dark' ? 'bg-[#0d1520] text-white' : 'bg-white text-gray-900')}>
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={cn(
          'lg:hidden fixed bottom-6 right-6 z-50 w-12 h-12 backdrop-blur-sm border rounded-full flex items-center justify-center',
          theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-gray-200 shadow-lg'
        )}
      >
        {sidebarOpen
          ? <X className={cn('w-5 h-5', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
          : <Menu className={cn('w-5 h-5', theme === 'dark' ? 'text-white' : 'text-gray-700')} />
        }
      </button>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed top-0 left-0 h-full w-64 border-r z-50 overflow-y-auto transition-transform lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        theme === 'dark' ? 'bg-[#0a1018] border-white/10' : 'bg-gray-50 border-gray-200'
      )}>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className={cn('text-xs font-mono uppercase tracking-wider', theme === 'dark' ? 'text-white/40' : 'text-gray-400')}>{subtitle}</h2>
            <ThemeToggle />
          </div>

          <div className="mb-5">
            <ProgressBar completed={completedCount} total={toc.length} />
          </div>

          <div className="mb-4 relative">
            <Search className={cn('absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5', theme === 'dark' ? 'text-white/30' : 'text-gray-400')} />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search..."
              className={cn(
                'w-full pl-9 pr-3 py-2 rounded-lg text-sm focus:outline-none transition-colors',
                theme === 'dark'
                  ? 'bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/20'
                  : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-gray-300'
              )}
            />
          </div>

          <nav className="space-y-0.5">
            {filteredTOC.map((item) => (
              <button
                key={item.id}
                onClick={() => { onJumpTo(item.id); setSidebarOpen(false); }}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                  progress[item.id]
                    ? 'text-emerald-500/60 hover:text-emerald-500 hover:bg-emerald-500/5'
                    : theme === 'dark'
                      ? 'text-white/60 hover:text-white hover:bg-white/5'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                <span className="shrink-0 w-5 flex justify-center">
                  {progress[item.id]
                    ? <Check className="w-3.5 h-3.5 text-emerald-500/60" />
                    : <span className={cn('font-mono text-xs', theme === 'dark' ? 'text-white/25' : 'text-gray-300')}>{item.num}</span>
                  }
                </span>
                <span className={progress[item.id] ? 'line-through decoration-emerald-500/30' : ''}>{item.title}</span>
              </button>
            ))}
          </nav>

          {completedCount > 0 && (
            <button
              onClick={onResetProgress}
              className={cn(
                'mt-6 w-full flex items-center justify-center gap-1.5 text-xs py-2 transition-colors',
                theme === 'dark' ? 'text-white/20 hover:text-white/40' : 'text-gray-300 hover:text-gray-400'
              )}
            >
              <RotateCcw className="w-3 h-3" />
              Reset progress
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="lg:ml-64 px-4 sm:px-8 py-10 max-w-3xl mx-auto">
        {children}
      </main>
    </div>
  );
}
