package com.clebersondev.notes.payloads;

public class ApiResponseWithData<T> extends ApiResponse {
    private T data;
    public ApiResponseWithData(Boolean success, String message, T data) {
        super(success, message);
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
