export function getGoogleUrl(from) {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  
    const options = {
      redirect_uri: "http://127.0.0.1:3000/",
      client_id: "929419990822-4037ffge376pjrnfgtqemdi4u9bdlriq.apps.googleusercontent.com",
      
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      // state: from,
    };
  
    const qs = new URLSearchParams(options);
  
    return `${rootUrl}?${qs.toString()}`;
  }
  