export interface Commit {
  id: number;
  authorName: string;
  needsPushing?: boolean;
  needsPulling?: boolean;
  timestamp: Date;
  title: string;
  body?: string;
}
export const commitsMocks = [
  {
    id: 1,
    authorName: 'Anne Norris',
    needsPushing: true,
    needsPulling: false,
    timestamp: new Date(2020, 1, 12, 12, 12),
    title: 'fix(ivy): error in AOT when pipe inherits...',
    body: '… that uses DI (#35468) When a pipe inherits...',
  },
  {
    id: 2,
    authorName: 'Johnny Norris',
    needsPushing: true,
    needsPulling: false,
    timestamp: new Date(2020, 1, 12, 12, 12),
    title: 'Commit title. Short, ideally.',
  },
  {
    id: 3,
    authorName: 'Amy Thomas',
    needsPushing: false,
    needsPulling: false,
    timestamp: new Date(2020, 1, 12, 12, 12),
    title: 'Commit title. Short, ideally.',
    body: 'Commit description. Can be whatever size you...',
  },
  {
    id: 4,
    authorName: 'Keith Bennett',
    needsPushing: false,
    needsPulling: false,
    timestamp: new Date(2020, 1, 12, 12, 12),
    title: 'Commit title. Short, ideally.',
    body: 'Commit description. Can be whatever size you...',
  },
  {
    id: 5,
    authorName: 'Lilith Brown',
    needsPushing: false,
    needsPulling: false,
    timestamp: new Date(2020, 1, 12, 12, 12),
    title: 'Commit title. Short, ideally.',
    body: 'Commit description. Can be whatever size you...',
  },
] as Commit[];
