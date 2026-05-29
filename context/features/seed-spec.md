# Seed Data Specification

## Overview

Add the following collections and items to the existing seed script (`prisma/seed.ts`).
Update the user as well.

## Requirements

### User

- **Email:** danielaEM@example.com
- **Name:** Demo User
- **Password:** IsNotEasy67 (hash with bcryptjs, 12 rounds)
- **isPro:** false
- **emailVerified:** current date


### Collections & Items

#### React Patterns

_Description: Reusable React patterns and hooks_

3 snippets (TypeScript):

- Custom hooks (useDebounce, useLocalStorage, etc.)
- Component patterns (Context providers, compound components)
- Utility functions

#### AI Workflows

_Description: AI prompts and workflow automations_

3 prompts:

- Code review prompts
- Documentation generation
- Refactoring assistance

#### DevOps

_Description: Infrastructure and deployment resources_

- 1 snippet (Docker, CI/CD config)
- 1 command (deployment scripts)
- 2 links (documentation URLs - use real URLs)

#### Terminal Commands

_Description: Useful shell commands for everyday development_

4 commands:

- Git operations
- Docker commands
- Process management
- Package manager utilities

#### Design Resources

_Description: UI/UX resources and references_

4 links (use real URLs):

- CSS/Tailwind references
- Component libraries
- Design systems
- Icon libraries
