package com.clebersondev.notes.payloads;

public class JwtAuthResponse<T> extends ApiResponseWithData  {
    private String accessToken;
    private String tokenType = "Bearer";

    public JwtAuthResponse(
            Boolean success,
            String message,
            String accessToken,
            T data
    ) {
        super(success, message, data);
        this.accessToken = accessToken;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
