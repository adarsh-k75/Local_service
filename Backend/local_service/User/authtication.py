from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)

        if header is not None:
            raw_token = self.get_raw_token(header)
        else:
            raw_token = request.COOKIES.get("access_token")

        # ✅ FIX: Return None instead of raising an error for Guest users
        if raw_token is None:
            return None 

        try:
            validated_token = self.get_validated_token(raw_token)
            user = self.get_user(validated_token)
        except (InvalidToken, AuthenticationFailed):
            # For public pages, you might still want to return None here 
            # so an expired cookie doesn't block a public view.
            return None 

        return (user, validated_token)