const SITE_URL = 'https://abdelwahed.github.io';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: env.GITHUB_CLIENT_ID,
        scope: 'repo user',
        redirect_uri: `${url.origin}/callback`,
      });
      return Response.redirect(`https://github.com/login/oauth/authorize?${params}`, 302);
    }
    
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      
      if (!code) {
        return new Response('Missing code', { status: 400 });
      }
      
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      
      const tokenData = await tokenRes.json();
      
      if (tokenData.error) {
        return new Response(`Error: ${tokenData.error_description}`, { status: 400 });
      }
      
      const token = tokenData.access_token;
      
      // Redirect back to admin with token as fragment
      return Response.redirect(`${SITE_URL}/admin/#access_token=${token}&token_type=bearer`, 302);
    }
    
    return new Response('OAuth Proxy Ready', { status: 200 });
  },
};
