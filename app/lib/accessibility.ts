/**
 * Accessibility Utilities
 * 
 * This file contains helper functions for improving accessibility across
 * the application, including ARIA attributes, keyboard navigation, and focus management.
 */

// Types
type AriaLabelProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

type AriaDescriptionProps = {
  'aria-describedby'?: string;
  'aria-description'?: string;
};

type AriaRoleProps = {
  role?: string;
};

type AriaLiveProps = {
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
};

type AriaExpandedProps = {
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
};

type AriaSelectedProps = {
  'aria-selected'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
};

/**
 * Generate ARIA label attributes consistently
 * Ensures only one labeling method is used (aria-label OR aria-labelledby)
 */
export function getAriaLabelProps(options: {
  label?: string;
  labelledBy?: string;
}): AriaLabelProps {
  const { label, labelledBy } = options;
  
  if (labelledBy) {
    return { 'aria-labelledby': labelledBy };
  }
  
  if (label) {
    return { 'aria-label': label };
  }
  
  return {};
}

/**
 * Generate ARIA description attributes consistently
 */
export function getAriaDescriptionProps(options: {
  description?: string;
  describedBy?: string;
}): AriaDescriptionProps {
  const { description, describedBy } = options;
  
  if (describedBy) {
    return { 'aria-describedby': describedBy };
  }
  
  if (description) {
    return { 'aria-description': description };
  }
  
  return {};
}

/**
 * Generate ARIA attributes for live regions
 */
export function getLiveRegionProps(options: {
  live?: 'off' | 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}): AriaLiveProps {
  const { live = 'polite', atomic = true, relevant } = options;
  
  const props: AriaLiveProps = {
    'aria-live': live,
    'aria-atomic': atomic,
  };
  
  if (relevant) {
    props['aria-relevant'] = relevant;
  }
  
  return props;
}

/**
 * Generate ARIA attributes for dropdown/disclosure elements
 */
export function getDisclosureProps(options: {
  expanded: boolean;
  controlsId?: string;
}): AriaExpandedProps {
  const { expanded, controlsId } = options;
  
  const props: AriaExpandedProps = {
    'aria-expanded': expanded,
  };
  
  if (controlsId) {
    props['aria-controls'] = controlsId;
  }
  
  return props;
}

/**
 * Generate ARIA attributes for selectable elements
 */
export function getSelectableProps(options: {
  selected: boolean;
  isCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}): AriaSelectedProps {
  const { selected, isCurrent } = options;
  
  const props: AriaSelectedProps = {
    'aria-selected': selected,
  };
  
  if (isCurrent !== undefined) {
    props['aria-current'] = isCurrent;
  }
  
  return props;
}

/**
 * Generate combined ARIA props for an element
 */
export function getAriaProps(options: {
  label?: string;
  labelledBy?: string;
  description?: string;
  describedBy?: string;
  role?: string;
  expanded?: boolean;
  controlsId?: string;
  selected?: boolean;
  isCurrent?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}) {
  const {
    label,
    labelledBy,
    description,
    describedBy,
    role,
    expanded,
    controlsId,
    selected,
    isCurrent,
  } = options;
  
  return {
    ...getAriaLabelProps({ label, labelledBy }),
    ...getAriaDescriptionProps({ description, describedBy }),
    ...(role ? { role } : {}),
    ...(expanded !== undefined
      ? getDisclosureProps({ expanded, controlsId })
      : {}),
    ...(selected !== undefined
      ? getSelectableProps({ selected, isCurrent })
      : {}),
  };
}

/**
 * Focus management for modals and dialogs
 */
export const focusManagement = {
  /**
   * Traps focus within a container
   */
  trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return () => {};
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus the first element
    firstElement.focus();
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } 
      // Tab
      else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    // Add event listener
    document.addEventListener('keydown', handleKeyDown);
    
    // Return cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  },
  
  /**
   * Returns focus to an element
   */
  returnFocus(element: HTMLElement): void {
    setTimeout(() => {
      element.focus();
    }, 0);
  },
};

/**
 * Keyboard event helpers for interactive components
 */
export const keyboardHandlers = {
  /**
   * Calls handler when Space or Enter is pressed
   */
  handleActivation(handler: () => void) {
    return (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    };
  },
  
  /**
   * Handles Arrow Up/Down keyboard navigation for dropdown menus
   */
  handleVerticalNavigation(options: {
    itemsCount: number;
    currentIndex: number;
    onIndexChange: (index: number) => void;
    loop?: boolean;
  }) {
    const { itemsCount, currentIndex, onIndexChange, loop = true } = options;
    
    return (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        let nextIndex = currentIndex;
        
        if (e.key === 'ArrowDown') {
          nextIndex = currentIndex + 1;
          if (nextIndex >= itemsCount) {
            nextIndex = loop ? 0 : itemsCount - 1;
          }
        } else {
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? itemsCount - 1 : 0;
          }
        }
        
        onIndexChange(nextIndex);
      }
    };
  },
  
  /**
   * Handles Arrow Left/Right keyboard navigation for horizontal menus
   */
  handleHorizontalNavigation(options: {
    itemsCount: number;
    currentIndex: number;
    onIndexChange: (index: number) => void;
    loop?: boolean;
  }) {
    const { itemsCount, currentIndex, onIndexChange, loop = true } = options;
    
    return (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        
        let nextIndex = currentIndex;
        
        if (e.key === 'ArrowRight') {
          nextIndex = currentIndex + 1;
          if (nextIndex >= itemsCount) {
            nextIndex = loop ? 0 : itemsCount - 1;
          }
        } else {
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? itemsCount - 1 : 0;
          }
        }
        
        onIndexChange(nextIndex);
      }
    };
  },
};

/**
 * Generates a unique ID for associating ARIA attributes
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
} 