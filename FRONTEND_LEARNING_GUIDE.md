# Frontend Fundamentals Learning Guide

This guide uses your JEREMIAH33:3 codebase as a learning tool. Work through each phase systematically.

---

## 📚 Phase 1: React Core Concepts

### 1. Components and Props
**File to Study:** `components/Timer.tsx` (lines 13-19)

**Key Concepts:**
- TypeScript interfaces define prop shapes
- Destructuring props in function signature
- Optional props with `?` and default values
- Function props (callbacks) for parent-child communication

**Practice Questions:**
- Why use `initialMinutes = 25` instead of `initialMinutes?: number`?
- What happens if a parent component doesn't pass `onComplete`?

**Code Example:**
```typescript
interface TimerProps {
  onComplete: (durationMinutes: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  initialMinutes?: number;
}
```

---

### 2. State Management with `useState`
**File to Study:** `components/Timer.tsx` (lines 20-24)

**Key Concepts:**
- `useState` returns `[value, setter]` array
- State is local to component
- Multiple pieces of state for different concerns
- Initial values can be computed

**Practice Questions:**
- Why not use one state object like `useState({ secondsLeft: 0, isRunning: false })`?
- When should you combine related state vs keep separate?

**Code Example:**
```typescript
const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
const [isRunning, setIsRunning] = useState(false);
const [isComplete, setIsComplete] = useState(false);
```

---

### 3. Side Effects with `useEffect`
**File to Study:** `components/Timer.tsx` (lines 78-132)

**Key Concepts:**
- Runs after render
- Dependencies array controls when it runs
- Cleanup function prevents memory leaks
- Early returns for conditional logic

**Practice Questions:**
- What happens if you remove `onComplete` from dependency array?
- Why do we need `clearInterval` in the cleanup?

**Code Example:**
```typescript
useEffect(() => {
  if (!isRunning) {
    startTimeRef.current = null;
    return; // Cleanup/early return
  }

  const interval = setInterval(() => {
    // Timer logic
  }, 100);

  return () => clearInterval(interval); // Cleanup
}, [isRunning, onComplete]);
```

---

### 4. Refs with `useRef`
**File to Study:** `components/Timer.tsx` (lines 26-27, 86-89)

**Key Concepts:**
- Refs persist across renders without causing re-renders
- Use for values that don't need to trigger UI updates
- Access via `.current` property
- Useful for timers, DOM refs, avoiding stale closures

**Practice Questions:**
- Why use `useRef` for `startTimeRef` instead of `useState`?
- What's the difference between refs and state?

**Code Example:**
```typescript
const startTimeRef = useRef<number | null>(null);
const durationRef = useRef(initialMinutes * 60);
```

---

## 📚 Phase 2: Next.js App Router Patterns

### 5. Client vs Server Components
**Files to Compare:**
- `app/actions/auth.ts` (line 1) - `'use server'`
- `components/Timer.tsx` (line 1) - `"use client"`
- `app/(public)/page.tsx` (line 1) - `'use client'`

**Key Concepts:**
- `'use client'` = runs in browser (interactive, hooks, state)
- `'use server'` = runs on server (database, secure operations)
- Default is Server Component (no directive needed)
- Client components can call server actions

**Practice Questions:**
- Why is `EmailLoginForm.tsx` a client component?
- When should you use server vs client components?

---

### 6. Server Actions
**File to Study:** `app/actions/auth.ts` and `components/auth/EmailLoginForm.tsx`

**Key Concepts:**
- Async functions marked with `'use server'`
- Called from client components like regular functions
- Secure (runs on server, credentials never exposed)
- Return values are serialized

**Practice Questions:**
- Why not use a regular API route instead?
- What can't be returned from server actions?

**Code Example:**
```typescript
// Server Action
export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient()
  // ... server-side logic
  return { error: null, success: true }
}

// Used in Client Component
const result = await signInWithEmail(email, password)
```

---

## 📚 Phase 3: Custom Hooks

### 7. Building Reusable Hooks
**File to Study:** `hooks/useAuth.ts`

**Key Concepts:**
- Encapsulate logic for reuse
- Return values used by components
- Follow `use*` naming convention
- Handle cleanup properly

**Practice Questions:**
- Why return `{ user, loading }` as object instead of array?
- What happens if you forget to unsubscribe?

**Code Example:**
```typescript
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Setup and cleanup
    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}
```

---

## 📚 Phase 4: Form Handling

### 8. Controlled Inputs
**File to Study:** `components/auth/EmailLoginForm.tsx` (lines 13-14, 43-49)

**Key Concepts:**
- Controlled = React controls input value
- `value` prop binds to state
- `onChange` updates state
- State is single source of truth

**Practice Questions:**
- What's the difference between controlled and uncontrolled inputs?
- Why use controlled inputs?

**Code Example:**
```typescript
const [email, setEmail] = useState('')

<Input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

### 9. Form Submission
**File to Study:** `components/auth/EmailLoginForm.tsx` (lines 19-39)

**Key Concepts:**
- `e.preventDefault()` stops page refresh
- Async/await for server calls
- Error handling with try/catch
- Loading states for UX
- `finally` always runs

**Practice Questions:**
- What happens if you forget `e.preventDefault()`?
- Why use `finally` for `setLoading(false)`?

**Code Example:**
```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  setLoading(true)
  
  try {
    const result = await signInWithEmail(email, password)
    if (result.error) {
      setError(result.error)
    } else {
      router.push('/dashboard')
    }
  } catch (err) {
    setError('An unexpected error occurred.')
  } finally {
    setLoading(false)
  }
}
```

---

## 📚 Phase 5: Advanced Patterns

### 10. Conditional Rendering
**Files to Study:**
- `components/Timer.tsx` (lines 239-273)
- `app/(public)/page.tsx` (line 76)

**Key Concepts:**
- Ternary: `condition ? true : false`
- Logical AND: `condition && <Component />`
- Null/undefined renders nothing

**Practice Questions:**
- What's the difference between `{x && <Component />}` and `{x ? <Component /> : null}`?
- When should you use each pattern?

**Code Example:**
```typescript
{isEditing ? (
  <input ... />
) : (
  <div>{formatTime(secondsLeft)}</div>
)}

{sessionCompleted && <ShootingStars />}
```

---

### 11. Event Handlers
**File to Study:** `components/Timer.tsx` (lines 189-212)

**Key Concepts:**
- Extract handlers for clarity and reuse
- Inline: `onClick={() => doSomething()}`
- Named: `onClick={handleClick}`

**Practice Questions:**
- When should you use inline vs named handlers?
- What's the difference between `onClick={handleClick}` and `onClick={handleClick()}`?

---

## 🎯 Practice Exercises

### Exercise 1: State Management
In `Timer.tsx`, there are 5 `useState` calls. Could you combine any? Why or why not?

### Exercise 2: useEffect Dependencies
In `Timer.tsx` line 76, the effect has dependencies `[secondsLeft, isEditing, isRunning, isComplete]`. What happens if you remove `isRunning`?

### Exercise 3: Component Structure
Why is `Timer` a separate component instead of being in `page.tsx`?

### Exercise 4: Type Safety
In `Timer.tsx` line 5, `onComplete: (durationMinutes: number) => void`. What happens if the parent doesn't pass this prop?

---

## ⚠️ Common Mistakes to Watch For

### 1. Missing Dependencies in useEffect
```typescript
// ❌ Wrong - missing 'user' dependency
useEffect(() => {
  if (user) doSomething()
}, [])

// ✅ Correct
useEffect(() => {
  if (user) doSomething()
}, [user])
```

### 2. Not Cleaning Up Subscriptions
```typescript
// ❌ Wrong - memory leak
useEffect(() => {
  const sub = subscribe()
}, [])

// ✅ Correct
useEffect(() => {
  const sub = subscribe()
  return () => sub.unsubscribe()
}, [])
```

### 3. Mutating State Directly
```typescript
// ❌ Wrong
const [items, setItems] = useState([1, 2, 3])
items.push(4)

// ✅ Correct
setItems([...items, 4])
```

### 4. Forgetting to Prevent Default in Forms
```typescript
// ❌ Wrong - page refreshes
const handleSubmit = (e) => {
  // submit logic
}

// ✅ Correct
const handleSubmit = (e) => {
  e.preventDefault()
  // submit logic
}
```

### 5. Stale Closures in useEffect
```typescript
// ❌ Wrong - uses stale 'count' value
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count) // Always logs initial value
  }, 1000)
  return () => clearInterval(timer)
}, [])

// ✅ Correct - includes dependency
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count) // Always current value
  }, 1000)
  return () => clearInterval(timer)
}, [count])
```

---

## 📋 Learning Checklist

- [ ] Phase 1: React Core Concepts
  - [ ] Components and Props
  - [ ] State Management with useState
  - [ ] Side Effects with useEffect
  - [ ] Refs with useRef
- [ ] Phase 2: Next.js App Router Patterns
  - [ ] Client vs Server Components
  - [ ] Server Actions
- [ ] Phase 3: Custom Hooks
  - [ ] Building Reusable Hooks
- [ ] Phase 4: Form Handling
  - [ ] Controlled Inputs
  - [ ] Form Submission
- [ ] Phase 5: Advanced Patterns
  - [ ] Conditional Rendering
  - [ ] Event Handlers

---

## 🚀 Next Topics (After Completing Phases 1-5)

1. **Framer Motion Animations** - Study `app/(public)/about/page.tsx`
2. **Protected Routes & Auth Flow** - Study `app/(protected)/layout.tsx`
3. **Dashboard Components & Data Fetching** - Study `app/(protected)/dashboard/page.tsx`
4. **Tailwind CSS Patterns** - Study styling throughout codebase
5. **TypeScript Types & Interfaces** - Study `types/` directory

---

## 📝 Notes Section

Use this space to write your own notes as you learn:

---

*Last Updated: Start with Phase 1, Section 1: Components and Props*
