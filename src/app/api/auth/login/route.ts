import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

const demoUsers = [
  {
    email: 'karthik@youngdemocrats.org',
    aliasEmail: 'admin@youngdemocrats.org',
    password: 'admin123',
    name: 'Karthik R',
    role: 'admin'
  },
  {
    email: 'superadmin@youngdemocrats.org',
    aliasEmail: 'superadmin@youngdemocrats.org',
    password: 'admin123',
    name: 'Super Admin',
    role: 'admin'
  },
  {
    email: 'anitha@youngdemocrats.org',
    aliasEmail: 'editor@youngdemocrats.org',
    password: 'editor123',
    name: 'Anitha V',
    role: 'editor'
  },
  {
    email: 'reporter@youngdemocrats.org',
    aliasEmail: 'reporter@youngdemocrats.org',
    password: 'reporter123',
    name: 'Ramesh Reporter',
    role: 'editor'
  },
  {
    email: 'coordinator@youngdemocrats.org',
    aliasEmail: 'coordinator@youngdemocrats.org',
    password: 'district123',
    name: 'Priya Coordinator',
    role: 'editor'
  },
  {
    email: 'selvam@gmail.com',
    aliasEmail: 'user@youngdemocrats.org',
    password: 'user123',
    name: 'Selvam K',
    role: 'user'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check against demo accounts or mockDb
    const match = demoUsers.find(
      (u) =>
        (u.email.toLowerCase() === cleanEmail || u.aliasEmail.toLowerCase() === cleanEmail) &&
        (password === u.password || password === 'demo123' || password === 'admin123')
    );

    if (match) {
      return NextResponse.json({
        success: true,
        user: {
          name: match.name,
          email: match.email,
          role: match.role,
        },
        token: `mock-jwt-token-${Date.now()}`
      });
    }

    // Check if user exists in mockDb users list
    const usersInDb = mockDb.getUsers();
    const dbMatch = usersInDb.find(
      (u) => typeof u.email === 'string' && u.email.toLowerCase() === cleanEmail
    );

    if (dbMatch && (password === 'demo123' || password === `${dbMatch.role as string}123`)) {
      return NextResponse.json({
        success: true,
        user: {
          name: dbMatch.name as string,
          email: dbMatch.email as string,
          role: dbMatch.role as string,
        },
        token: `mock-jwt-token-${Date.now()}`
      });
    }

    return NextResponse.json(
      { error: 'Invalid email or password. Use demo credentials (e.g. admin@youngdemocrats.org / admin123).' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 500 }
    );
  }
}
