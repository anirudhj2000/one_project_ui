export function googleLogin(accessToken) {
    axios
      .post(`http://127.0.0.1:8000/api-auth/convert-token`, {
        token: accessToken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "929419990822-d26udirumcm1kaq86t4gdnjk6slv9p1a.apps.googleusercontent.com",
        client_secret: "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",
      })
      .then((res) => {
       // Save somewhere these access and refresh tokens
        console.log(res.data);
      });
   }