import { writable } from 'svelte/store';
import type { Task } from './zod/types';

export const selectedTask = writable<Task>();
