import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './actions/auth.action';

const publicRoutes = ['/', '/login', '/register'];

export async function middleware(request: NextRequest) {
    const user = await getCurrentUser();
    const pathName = request.nextUrl.pathname;


    const isPublicRoute = publicRoutes.includes(pathName);


    if (pathName.startsWith('/_next') || pathName.startsWith('/static')) {
        return NextResponse.next();  
    }

   
    if (!user && !isPublicRoute) {
        console.log("Redirecting to /login");
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}


export const config = {
  matcher: ['/:path*'],  
};
