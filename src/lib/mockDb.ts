import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src', 'data', 'mock_db_state.json');

function readDb() {
  try {
    if (!fs.existsSync(dbPath)) {
      return { news: [], events: [], speeches: [], districts: [], users: [], comments: [], newsletter: [] };
    }
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock DB:', error);
    return { news: [], events: [], speeches: [], districts: [], users: [], comments: [], newsletter: [] };
  }
}

type DbRecord = Record<string, unknown>;

function writeDb(data: DbRecord) {
  try {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing mock DB:', error);
    return false;
  }
}

export const mockDb = {
  // NEWS CRUD
  getNews: (): DbRecord[] => {
    return readDb().news || [];
  },
  getNewsById: (id: string): DbRecord | undefined => {
    return (readDb().news || []).find((n: DbRecord) => n.id === id);
  },
  createNews: (newsItem: DbRecord): DbRecord => {
    const db = readDb();
    const newItem: DbRecord = {
      id: `news-${Date.now()}`,
      views: 0,
      date: new Date().toISOString(),
      status: newsItem.status || 'draft',
      ...newsItem,
    };
    db.news = [newItem, ...(db.news || [])];
    writeDb(db);
    return newItem;
  },
  updateNews: (id: string, updatedFields: DbRecord): DbRecord | null => {
    const db = readDb();
    const idx = (db.news || []).findIndex((n: DbRecord) => n.id === id);
    if (idx === -1) return null;
    db.news[idx] = { ...(db.news[idx] as DbRecord), ...updatedFields };
    writeDb(db);
    return db.news[idx] as DbRecord;
  },
  deleteNews: (id: string): boolean => {
    const db = readDb();
    const filtered = (db.news || []).filter((n: DbRecord) => n.id !== id);
    db.news = filtered;
    // Also delete associated comments
    db.comments = (db.comments || []).filter((c: DbRecord) => c.newsId !== id);
    writeDb(db);
    return true;
  },
  incrementNewsViews: (id: string): number => {
    const db = readDb();
    const idx = (db.news || []).findIndex((n: DbRecord) => n.id === id);
    if (idx !== -1) {
      const currentViews = (db.news[idx].views as number) || 0;
      db.news[idx].views = currentViews + 1;
      writeDb(db);
      return db.news[idx].views as number;
    }
    return 0;
  },

  // EVENTS CRUD
  getEvents: (): DbRecord[] => {
    return readDb().events || [];
  },
  createEvent: (eventItem: DbRecord): DbRecord => {
    const db = readDb();
    const newItem: DbRecord = {
      id: `event-${Date.now()}`,
      status: 'upcoming',
      ...eventItem,
    };
    db.events = [newItem, ...(db.events || [])];
    writeDb(db);
    return newItem;
  },
  deleteEvent: (id: string): boolean => {
    const db = readDb();
    db.events = (db.events || []).filter((e: DbRecord) => e.id !== id);
    writeDb(db);
    return true;
  },

  // SPEECHES CRUD
  getSpeeches: (): DbRecord[] => {
    return readDb().speeches || [];
  },
  createSpeech: (speechItem: DbRecord): DbRecord => {
    const db = readDb();
    const newItem: DbRecord = {
      id: `speech-${Date.now()}`,
      date: new Date().toISOString(),
      ...speechItem,
    };
    db.speeches = [newItem, ...(db.speeches || [])];
    writeDb(db);
    return newItem;
  },
  deleteSpeech: (id: string): boolean => {
    const db = readDb();
    db.speeches = (db.speeches || []).filter((s: DbRecord) => s.id !== id);
    writeDb(db);
    return true;
  },

  // DISTRICTS
  getDistricts: (): DbRecord[] => {
    return readDb().districts || [];
  },

  // USERS
  getUsers: (): DbRecord[] => {
    return readDb().users || [];
  },
  updateUserRole: (id: string, role: string): DbRecord | null => {
    const db = readDb();
    const idx = (db.users || []).findIndex((u: DbRecord) => u.id === id);
    if (idx === -1) return null;
    (db.users[idx] as DbRecord).role = role;
    writeDb(db);
    return db.users[idx] as DbRecord;
  },

  // COMMENTS CRUD
  getComments: (): DbRecord[] => {
    return readDb().comments || [];
  },
  createComment: (commentItem: DbRecord): DbRecord => {
    const db = readDb();
    const newItem: DbRecord = {
      id: `comment-${Date.now()}`,
      date: new Date().toISOString(),
      approved: false,
      ...commentItem,
    };
    db.comments = [newItem, ...(db.comments || [])];
    writeDb(db);
    return newItem;
  },
  approveComment: (id: string): DbRecord | null => {
    const db = readDb();
    const idx = (db.comments || []).findIndex((c: DbRecord) => c.id === id);
    if (idx === -1) return null;
    (db.comments[idx] as DbRecord).approved = true;
    writeDb(db);
    return db.comments[idx] as DbRecord;
  },
  deleteComment: (id: string): boolean => {
    const db = readDb();
    db.comments = (db.comments || []).filter((c: DbRecord) => c.id !== id);
    writeDb(db);
    return true;
  },

  // NEWSLETTER
  getNewsletterSubscribers: (): DbRecord[] => {
    return readDb().newsletter || [];
  },
  subscribeNewsletter: (email: string): DbRecord => {
    const db = readDb();
    const exists = (db.newsletter || []).some((n: DbRecord) => (n.email as string).toLowerCase() === email.toLowerCase());
    if (exists) return { email, status: 'already_subscribed' };
    const newItem: DbRecord = {
      id: `sub-${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString(),
    };
    db.newsletter = [newItem, ...(db.newsletter || [])];
    writeDb(db);
    return newItem;
  }
};
