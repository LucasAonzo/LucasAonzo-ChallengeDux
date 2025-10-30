# Challenge Dux - ABM Usuarios

Sistema de gestión de usuarios (CRUD) con Next.js 14 + React 18 + TypeScript + PrimeReact.

---

## 🚀 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con las credenciales proporcionadas

# 3. Ejecutar en desarrollo
npm run dev

# 4. Build producción
npm run build
npm start
```

---

## ⚙️ Variables de Entorno

El proyecto requiere configurar `.env.local` (ver `.env.example` para template).

**Importante:** Estas variables son requeridas y deben ser proporcionadas por el equipo.

---

## 📋 Requisitos Cumplidos

- ✅ ABM completo (Create, Read, Update, Delete)
- ✅ Server-Side Rendering + Suspense
- ✅ Validaciones de formulario
- ✅ Búsqueda por nombre/apellido (debounce)
- ✅ Filtro por estado (ACTIVO/INACTIVO)
- ✅ Paginación (_page, _limit)
- ✅ Ordenamiento por columnas
- ✅ Atomic Design (atoms → molecules → organisms → templates → pages)
- ✅ PrimeReact + PrimeFlex
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier

---

## 🏗️ Decisiones Clave

### 1. Atomic Design
Implementación completa de 5 niveles para máxima reusabilidad y escalabilidad.

### 2. Suspense + SSR
Cumplimiento literal del requisito: "maneja el loading de componentes usando Suspense".

### 3. Env Variables Centralizadas
Única fuente de verdad en `app/lib/env.ts` con validación estricta. Sin credenciales hardcodeadas.

### 4. Optimistic Updates
UI se actualiza inmediatamente, con rollback automático si falla la API.

### 5. Workaround ID Editable
json-server no permite cambiar IDs con PUT. Solución: DELETE + CREATE en orden seguro (CREATE primero).

---

## 📂 Estructura

```
app/
├── components/
│   ├── atoms/          # Componentes básicos
│   ├── molecules/      # Componentes compuestos
│   ├── organisms/      # Secciones complejas
│   └── templates/      # Layouts con lógica
├── lib/
│   ├── env.ts          # Config centralizada
│   └── logger.ts       # Logger dev-only
├── services/
│   └── userService.ts  # API calls
└── page.tsx            # Server Component + Suspense
```

---

## 📝 Comandos

```bash
npm run dev       # Desarrollo
npm run build     # Build producción
npm run lint      # Verificar código
```
